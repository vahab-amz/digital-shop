import CatalogList from '@/components/catalog/List';
import { Button } from '@/components/ui';
import Link from 'next/link';
import React from 'react';

function Catalog() {
    return (
        <div className="flex flex-col items-center">
            <CatalogList />
            <Button asChild className="mt-10">
                <Link href="/products">Back to products</Link>
            </Button>
        </div>
    );
}

export default Catalog;
