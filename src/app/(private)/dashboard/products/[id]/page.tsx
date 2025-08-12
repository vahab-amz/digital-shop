import Spinner from '@/components/Spinner';
import ProductDetailView from '@/modules/products/views/ProductDetailView';
import React, { Suspense } from 'react';

async function page({ params }: { params: Promise<{ id: string }> }) {
    const data = await params;
    const { id } = data;

    return (
        <div>
            some other component
            {/* suspens harajai nemishe estefade kard va hatman dakhelesh baraye ye amaliate async, await ra anjam dade bashe betore sade yni hatman bayad dakhelesh await bashe pas yani aga dakhele component ProductDetailView ma baraye component ProductForm mikhastim suspense estefade konim yani be in sorat : 
			<Suspense fallback={<Spinner />}>
			   <ProductForm product={product} />
			</Suspense> 
			be insorate shodani nabod chon dakhele ProductForm hich amaliate await anjam nashode 
			
			be in mafhoom migan Streaming*/}
            <Suspense fallback={<Spinner />}>
                <ProductDetailView id={id} />
            </Suspense>
        </div>
    );
}

export default page;
