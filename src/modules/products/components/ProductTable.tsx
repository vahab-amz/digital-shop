'use client';

import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui';
import { SquarePen, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { deleteProduct, getProducts } from '../services';

// baraye goftn noe type mishe az raveshi ke ghablan estefade kardim ke ba estefade az prisma bod yani ProductWithImage, vali aln ba ye sabke dg mikham noe dadeo moskhas konim ke bedone estefade az prisma ast va ba khode TypeScript ast
// in ravesh injroie ke ma chon darim az noe dade Promis estefade mikonim bayad az Awaited estefade konim va badesh ba estefade az ReturnType mitonim noe returnie ye function ra bedast biarim (chon product returnie function getProducts() bod, getProducts ra dakhele ReturnType gharar dadim va chon noe type returnie on function mikhaim az typeof estefade kardim)
function ProductTable(props: {
    products: Awaited<ReturnType<typeof getProducts>>;
}) {
    const { products } = props;

    const onDeleteProduct = (id: string) => {
      deleteProduct(id)
    };

    return (
        <div>
            <div className="text-4xl text-white font-semibold mb-10 flex justify-between">
                <h1>Products</h1>
                <Button asChild>
                    <Link href="/dashboard/products/new">Add new product</Link>
                </Button>
            </div>
            <Table className="text-white">
                <TableHeader>
                    <TableRow className="w-full grid grid-cols-12">
                        <TableHead className="col-span-3 text-left">
                            Name
                        </TableHead>
                        <TableHead className="col-span-2">Category</TableHead>
                        <TableHead className="col-span-1">Price</TableHead>
                        <TableHead className="col-span-1">Quantity</TableHead>
                        <TableHead className="col-span-2">Image</TableHead>
                        <TableHead className="col-span-3">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow
                            key={product.id}
                            className="w-full grid grid-cols-12"
                        >
                            <TableCell className="font-medium justify-start col-span-3">
                                {product.name}
                            </TableCell>
                            <TableCell className="col-span-2">
                                {product.category}
                            </TableCell>
                            <TableCell className="col-span-1">
                                {product.price}
                            </TableCell>
                            <TableCell className="col-span-1">
                                {product.quantity}
                            </TableCell>
                            <TableCell className="relative col-span-2">
                                <Image
                                    src={
                                        product?.images[0]?.image ||
                                        '/assets/no-image.jpg'
                                    }
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                />
                            </TableCell>
                            <TableCell className="col-span-3 flex justify-center gap-1">
                                <Button asChild variant="ghost">
                                    <Link
                                        href={`/dashboard/products/${product.id}`}
                                    >
                                        <SquarePen />
                                    </Link>
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        onDeleteProduct(product.id);
                                    }}
                                >
                                    <Trash />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow className="flex justify-between">
                        <TableCell>Total</TableCell>
                        <TableCell>{products.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}

export default ProductTable;
