'use client';
import { DATA } from '@/modules/products/mock/products';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui';
import { useSearchParams } from 'next/navigation';
import { PrismaType } from '@/lib/prisma';
import { FetchImages } from '@/modules/products/services/image';
import Spinner from '../Spinner';

function List() {
    const params = useSearchParams();
    const productId : string | null = params.get('id');

    const [images, setImages] = useState<PrismaType.Image[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getImages = async () => {
            if (!productId) return; 
            const data = await FetchImages(productId);
            setImages(data?.images);
            setLoading(false);
        };

        getImages();
    }, [productId]);

    // const images = DATA[0].images;
    return (
        <div className="flex flex-wrap justify-center gap-3 ">
            {
                loading && <Spinner />
            }
            {images &&
                images.map((img, index) => (
                    <div key={index}>
                        <Card>
                            <CardContent className="flex p-0">
                                <Image
                                    src={img.image}
                                    alt="gallery"
                                    width={250}
                                    height={300}
                                />
                            </CardContent>
                        </Card>
                    </div>
                ))}
        </div>
    );
}

export default List;
