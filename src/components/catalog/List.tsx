"use client"
import { DATA } from '@/modules/products/mock/products';
import Image from 'next/image';
import React from 'react';
import {
    Card,
    CardContent,
} from '@/components/ui';
import { useSearchParams } from 'next/navigation';

function List() {

    const params = useSearchParams()
	const id = params.get('id')
	console.log(id)

    const images = DATA[0].images;
    return (
        <div className="flex flex-wrap justify-center gap-3 ">
            {images.map((img, index) => (
                <div key={index}>
                    <Card>
                        <CardContent className='flex p-0'>
                            <Image 
                                src={img.image}
                                alt='gallery'
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
