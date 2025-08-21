'use client';

import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import { getProductsAPI } from '../services';
import { ProductsWithImages } from '@/app/types';
import Loading from '@/components/Loading';

function ProductListView() {
    const [products, setProducts] = useState<ProductsWithImages[]>([]);
    const [loading, setLoading] = useState(false);

    const getProductData = async () => {
        setLoading(true);
        console.log("before fetch getProductsAPI")
        const result = await getProductsAPI();
        console.log("after fetch getProductsAPI")
        setProducts(result?.data);
        setLoading(false);
    };

    useEffect(() => {
        getProductData();
        console.log("[MOUNT] صفحه بارگذاری شد");
    }, []);

    return (
        <div>{loading ? <Loading /> : <ProductList product={products} />}</div>
    );
}

export default ProductListView;
