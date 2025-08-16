'use server';

import { prisma } from '@/lib/prisma';
import { Product } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// x
export const getProducts = async () => {
    const result = await prisma.product.findMany({
        //I
        include: { images: true },
    });
    return result;
};

// xx
export const getProductsAPI = async () => {
    const result = await fetch('http://localhost:3000/api/product');
    const responde = await result.json();
    return responde;
};

export const getProductById = async (id: string) => {
    // throw new Error("some error from server please try again") // errore dasti baraye didane safe error.tsx
    // await new Promise((resolve) => setTimeout(resolve, 4000)); // delay 4 sanie
    const result = await prisma.product.findUnique({
        where: { id: id }, //injori ham mishe nevesht ==>  where: { id },
        include: { images: true },
    });
    if (!result) return null;
    return result;
};

// I => chon alave bar khode maghadire jadavele product, maghadire jadvale image ham mikham ke ax haro neshon bedim pas vase hamin migim include kon jadavle image
// nokte ==> betore kol mishe az har raveshi fetch kard etelat haro vali in moheme ke bedoni o componenti ke dari azash estefade mikoni client hast ya serveri, ham az x va ham xx mishe esteafde kard vali behtre az xx estefade koni

export const upsertProduct = async (product: Product) => {
    const { id } = product;
    let result;
    if (id) {
        result = await prisma.product.update({
            where: {
                id,
            },
            data: product,
        });
    } else {
        result = await prisma.product.create({
            data: product,
        });
    }

    revalidatePath('/dashboard/products')

    return result;
};

export const deleteProduct = async (id: string) => {
    await prisma.product.delete({ where: { id } });
    redirect('/dashboard/products');
};
