import React from 'react';
import CatalogList from '@/components/catalog/List';
import CatalogSelector from '@/components/catalog/Selector';

function page() {
    return (
        <div className="flex flex-col items-center">
            <CatalogList />
            <CatalogSelector />
        </div>
    );
}

export default page;
