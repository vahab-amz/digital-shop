'use client';

import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import { getProductsAPI } from '../services';
import { ProductsWithImages } from '@/app/types';

function ProductListView() {
    const [products, setProducts] = useState<ProductsWithImages[]>([]);

    const getProductData = async () => {
        const result = await getProductsAPI();
        setProducts(result?.data);
    };

    useEffect(() => {
        getProductData();
    }, []);

    return (
        <div>
            <ProductList product={products} />
        </div>
    );
}

export default ProductListView;
