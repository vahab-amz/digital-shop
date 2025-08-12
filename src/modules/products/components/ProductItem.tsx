import {
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui';
import { GalleryThumbnails, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function ProductItem(props: { product: any }) {
    const { product } = props;

    return (
        <Card className="w-[350px] flex-col p-3">
            <CardHeader>
                <div className="w-full relative h-[300px]">
                    <Image
                        src={product.images?.[0]?.image || '/assets/no-image.jpg'}
                        alt={product?.name}
                        fill
                        className="object-cover"
                    />
                </div>
            </CardHeader>
            <CardContent>
                <div>
                    <h1 className="text-xl font-semibold">{product?.name}</h1>
                    <p className="text-gray-600">{product?.category}</p>
                </div>
                <div className="mt-3 flex justify-between">
                    <span className="text-lg font-semibold">
                        ${product?.price}
                    </span>
                    <div className="flex gap-2 items-center">
                        <Heart color="red" className="cursor-pointer" />
                        <Link href={`/products/catalog?id=${product?.id}`} className="">
                            <GalleryThumbnails />
                        </Link>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="mt-5">
                <Button asChild>
                    <Link
                        className="w-full py-2"
                        href={`./products/${product.id}`}
                    >
                        More detail
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

export default ProductItem;
