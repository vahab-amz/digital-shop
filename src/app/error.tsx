'use client';
// error page hatmn byad az noe client bashe
// vaghti in safe miad ke ma ye errori dashte bashim masln ye datai natone fetch kone har ghgatai
// masaln age ye try catch dashte bashim va be ye errori khoridm dakhele catch ye error pass bedim

import React from 'react';
import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';

function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
    // error.tsx e nextJs bema 2 ta parametr vorodie error page be ma mide
    // avali error hast ke mitonim errori ke pass dadimo neshon bedim
    // dovomi yek function ke mitonim safeo reset konim
    const router = useRouter();
    return (
        <div className="flex justify-center flex-col items-center mt-20 ">
            <h2 className="text-2xl text-red-700">{error.message}</h2>
            <div className="flex justify-between mt-6 gap-10">
                <Button variant="secondary" onClick={() => reset()}>
                    Try again
                </Button>
                <Button onClick={() => router.push('/')}>Home</Button>
            </div>
        </div>
    );
}

export default ErrorPage;
