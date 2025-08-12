import React from 'react';
import ProductItem from './ProductItem';
import { ProductsWithImages } from '@/app/types';

function ProductList(props: { product: ProductsWithImages[] }) {
    const { product } = props;
    return (
        <div className="flex flex-wrap gap-3">
            {product.map((item) => (
                <ProductItem key={item.id} product={item} />
            ))}
        </div>
    );
}

export default ProductList;
