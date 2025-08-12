import React from 'react';
import ProductTable from '../components/ProductTable';
import { getProducts } from '../services';

async function ProductDashboardView() {
    const products = await getProducts();
    return (
        <div className="w-full">
            <ProductTable products={products} />
        </div>
    );
}

export default ProductDashboardView;
