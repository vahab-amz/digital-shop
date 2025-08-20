'use client';
import React from 'react';
import {
    Button,
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { ProductsWithImages } from '@/app/types';
import { useCart } from '@/hooks/useCart';

function ProductDetail(product: ProductsWithImages) {
    const { addToCartMutiation } = useCart();
    return (
        <Card className="w-[600px] flex-col md:flex-row">
            <div className="w-[90%] mx-auto md:w-[40%] md:mx-0 h-full">
                <CardHeader className="flex flex-col h-full">
                    <CardTitle>
                        <h1 className="text-xl">{product?.name}</h1>
                    </CardTitle>
                    <div className="flex-1 flex justify-center items-center">
                        {product?.images.length > 0 ? (
                            <Image
                                src={
                                    product?.images[0].image ||
                                    '/assets/no-image.jpg'
                                }
                                alt={product?.name}
                                width={300}
                                height={400}
                                quality={50}
                                property="1"
                            />
                        ) : (
                            <div>Ops..., no image availble</div>
                        )}
                    </div>
                </CardHeader>
            </div>
            <div className="flex-1">
                <CardFooter className="space-y-3 h-full flex flex-col items-start justify-between">
                    <div className="flex flex-col items-start">
                        <span className="text-lg font-semibold">
                            price: {product?.price}$
                        </span>
                        <span>quantity: {product?.quantity}</span>
                        <span>
                            Category: <strong>{product?.category}</strong>
                        </span>
                        <p className="mt-4">
                            {product?.description
                                ? product?.description
                                : 'No description available'}
                        </p>
                    </div>
                    <div className="flex flex-col space-y-1 w-full">
                        <Button
                            className="cursor-pointer"
                            onClick={() => {
                                //addToCartMutiation yek function mamoli nistesh ke beshe callesh kard va bayad mutatesh kard baraye hamin bayad behesh ye mutate ezafe kard va sepas raftare functioni dasht bahash
                                addToCartMutiation.mutate(product.id);
                            }}
                        >
                            Add to cart
                            <ShoppingCart color="white" />
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/products">Back to Products</Link>
                        </Button>
                    </div>
                </CardFooter>
            </div>
        </Card>
    );
}

export default ProductDetail;
