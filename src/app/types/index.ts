import { Prisma } from '@prisma/client';

// talfiq kardane 2 no tip dade

// product ba image
export type ProductsWithImages = Prisma.ProductGetPayload<{
    include: { images: true };
}>;

// cart ba product
export type CartWithProduct = Prisma.CartItemGetPayload<{
    include: { product: true; images: true };
}>;
