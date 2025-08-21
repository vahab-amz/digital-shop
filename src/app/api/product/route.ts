// handle REST API routes GET, POST, ...

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const result = await prisma.product.findMany({
            include: { images: true },
        });
        return NextResponse.json({ data: result });
    } catch (error) {
        return new NextResponse('Internal server error', { status: 500 });
    }
}