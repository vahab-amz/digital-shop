'use server';

import { prisma } from '@/lib/prisma';
import { Product, ProductCategory } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod'; //dar inja az zod be onvane validation estefade mikonim

const validationUpsertProduct = (data: Record<string, any>) => {
    const formSchema = z.object({
        name: z.string().min(1, { message: 'name is required' }), //inja ba min goftim ke name hatman bayad yek caracter dashte bashe(ke yani required) va age injori nabod on payame khatai ke vasash neveshtimo neshon mide
        description: z.string(),
        price: z
            .float32({ message: 'price must be float' })
            .min(1, { message: 'price must be at least 1' }),
        quantity: z
            .number({ message: 'quantity must be number' })
            .min(1, { message: 'quantity must be at least 1' })
            .max(1000, { message: 'quantity must be at max 1000' }),
        category: z.enum(Object.values(ProductCategory) as [string]),
    });

    const result = formSchema.safeParse(data); // 3 ta meghdar barmigardone inja: 1-success, 2-data, 3-error
    // khorojie console.log(result.error):
    // Error [ZodError]: [
    //    { "expected": "number", "code": "invalid_type", "path": [ "price" ], "message": "price is required" },
    //    { "expected": "number", "code": "invalid_type", "path": [ "quantity" ], "message": "quantity is required" }
    // ]

    // khorojie console.log(result.error.issues):
    // [
    //   {
    //     expected: 'number',
    //     code: 'invalid_type',
    //     path: [ 'price' ],
    //     message: 'price is required'
    //   },
    //   {
    //     expected: 'number',
    //     code: 'invalid_type',
    //     path: [ 'quantity' ],
    //     message: 'quantity is required'
    //   }
    // ]

    if (!result.success) {
        const errors: Record<string, string> = {};
        result.error?.issues.forEach((err) => {
            errors[String(err.path[0])] = err.message;
        });
        return errors;
    }
    return null;
};

export const upsertProduct = async (
    prevData: { data: Product | null; error: Record<string, string> | null },
    formData: FormData,
) => {
    const id = formData.get('id') as string | null;

    const productData = {
        name: formData.get('name'),
        category: formData.get('category'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price') as string),
        quantity: parseInt(formData.get('quantity') as string),
    } as Product;

    // validation
    const error = validationUpsertProduct(productData);

    if (error) {
        return { data: prevData.data, error };
    }

    try {
        console.log("[POST] درحال ارسال داده به سرور...", productData);
        let result;
        if (id) {
            result = await prisma.product.update({
                where: {
                    id,
                },
                data: productData,
            });
        } else {
            result = await prisma.product.create({
                data: productData,
            });
        }

        revalidatePath('/dashboard/products');
        console.log("[POST] پاسخ دریافت شد:", result);
        return { data: result, error: null };
    } catch (e) {
        console.error("[POST-ERROR] خطا هنگام ارسال:", error);
        return { data: productData, error: { general: 'Upsert failed' } };
    }
};
