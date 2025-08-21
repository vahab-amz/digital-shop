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
    console.error("API GET /api/product error: ", error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  console.log("[API] درخواست POST دریافت شد");

  try {
    const body = await req.json();
    console.log("[API] داده دریافتی:", body);

    // ادامه کار
  } catch (err) {
    console.error("[API-ERROR] خطا هنگام پردازش:", err);
    return NextResponse.json({ error: "خطا در پردازش" }, { status: 500 });
  }
}