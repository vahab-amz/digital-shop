'use client';

// in ye raveshe dg baraye ferestadane dade haye yek form ast ye yeke ke dar react 19 moarefi shode
// in ghesmt code faghat jahate amozesh dare ba upload nemishe

import { Product, ProductCategory } from '@prisma/client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Input,
    Label,
    Textarea,
    Button,
} from '@/components/ui';
import Link from 'next/link';
import UploadImage from './UploadImage';
import { useActionState, useEffect, useState } from 'react';
import { upsertProduct } from '../actions';
import { toast } from 'sonner';

function ProductForm(props: { product: Product | null }) {
    const { product } = props;

    // in hook 2ta dade migire,
    // 1. dar parametre aval action dare
    // 2. dar parametre dovom initialState, state haii ke mikhaim yeki hamon data haye ma ast (ya hamon value haye ma) va state dovom state error
    // khorojie in hook ham ye arayas ke 3ta meghdar dare
    // state 2ta meghdar dare dakhelesh, yeki data va onyeki error
    // action moadele upsertProduct hastesh
    const [state, action, isPending] = useActionState<
        {
            data: Product | null;
            error: Record<string, string> | null;
        },
        FormData
    >(upsertProduct, {
        data: product ?? null,
        error: null,
    });
    
    const { error, data } = state;
    const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmit(true);
        action(formData);
    };

    useEffect(() => {
        if (!isSubmit) return;
        if (error) toast.error('Failed');
        else if (data) toast.success('Success');
    }, [state]);

    return (
        <div className="flex justify-center">
            <form
                className="w-full  md:max-w-[30%] text-white"
                action={handleSubmit}
            >
                <input type="hidden" name="id" value={product?.id || ''} />
                <div className="mb-10">
                    <h1 className="text-5xl ">Product</h1>
                    <h3>
                        {product?.id ? 'Update Product' : 'Create New Product'}
                    </h3>
                </div>
                <div className="mb-3">
                    <Label className="mb-2" htmlFor="name">
                        Product Name
                    </Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={data?.name || ''}
                    />
                    {error?.name && (
                        <span className="text-red-600 ml-2 mt-2">
                            {error?.name}
                        </span>
                    )}
                </div>
                <div className="mb-3">
                    <Label className="mb-2" htmlFor="category">
                        Category
                    </Label>
                    <Select
                        name="category"
                        defaultValue={data?.category || ProductCategory.OTHERS}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {Object.values(ProductCategory).map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="mb-3">
                    <Label className="mb-2" htmlFor="description">
                        Description
                    </Label>
                    <Textarea
                        name="description"
                        id="description"
                        defaultValue={data?.description || ''}
                    />
                </div>
                <div className="mb-3">
                    <Label className="mb-2" htmlFor="price">
                        Price
                    </Label>
                    <Input
                        name="price"
                        type="number"
                        step="0.01"
                        id="price"
                        defaultValue={data?.price || ''}
                    />
                    {error?.price && (
                        <span className="text-red-600 ml-2 mt-2">
                            {error?.price}
                        </span>
                    )}
                </div>
                <div className="mb-3">
                    <Label className="mb-2" htmlFor="quantity">
                        Quantity
                    </Label>
                    <Input
                        type="number"
                        name="quantity"
                        id="quantity"
                        defaultValue={product?.quantity || ''}
                    />
                    {error?.quantity && (
                        <span className="text-red-600 ml-2 mt-2">
                            {error?.quantity}
                        </span>
                    )}
                </div>
                <div className="flex justify-between">
                    <Button className="text-black" variant="outline" asChild>
                        <Link href="/dashboard/products">Back</Link>
                    </Button>
                    <Button type="submit">
                        {isPending
                            ? 'loading...'
                            : product?.id
                              ? 'Update Product'
                              : 'Add Product'}
                    </Button>
                </div>
                {product?.id && (
                    <div>
                        <UploadImage productId={product?.id} />
                    </div>
                )}
            </form>
        </div>
    );
}

export default ProductForm;
