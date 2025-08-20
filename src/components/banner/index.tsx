import * as React from 'react';
import Image from 'next/image';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    Card,
    CardContent,
} from '@/components/ui';

import IMG1 from './images/digi-image-1.jpg';
import IMG2 from './images/digi-image-2.jpg';
import IMG3 from './images/digi-image-3.jpg';
import IMG4 from './images/digi-image-4.jpg';
import IMG5 from './images/digi-image-5.jpg';

function Banner() {
    return (
        <Carousel className="w-[70%] md:w-full mx-auto">
            <CarouselContent>
                {[IMG1, IMG2, IMG3, IMG4, IMG5].map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="">
                            <Card>
                                <CardContent className="relative w-full flex aspect-square items-center justify-center">
                                    <Image
                                        src={image}
                                        alt="banner-image"
                                        fill
                                        className="object-cover"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}

export default Banner;
