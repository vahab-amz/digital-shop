import { ProductsWithImages } from '@/app/types';
import customMetaDataGenerator from '@/lib/metadata';
import ProductDetail from '@/modules/products/components/ProductDetail';
import { getProductById } from '@/modules/products/services';
import React from 'react';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const data = await params;
    const { id } = data;
    const product = (await getProductById(id)) as ProductsWithImages;
    if (!product) {
        return customMetaDataGenerator({
            title: 'not found',
        });
    }
    return customMetaDataGenerator({
        title: product?.name,
        description: product?.description,
        images: product.images,
    });
}

async function page({ params }: { params: Promise<{ id: string }> }) {
    const data = await params;
    const { id } = data;
    const product = (await getProductById(id)) as ProductsWithImages;

    return <ProductDetail {...product} />;
}

export default page;
