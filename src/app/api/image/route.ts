import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { promises as fs } from 'fs';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    const formdata = await req.formData();
    const file = formdata.get('file') as File;
    const productId = formdata.get('productId') as string;

    if (!file || !productId) {
        return NextResponse.json(
            {
                error: 'Missing file or product id',
            },
            {
                status: 400,
            },
        );
    } else {
        // save image to local
        // dar DB va cloud service ham mishe gozaht ke bishtr cloud service pishnahad mishe mese firebase, AWS, Microsft ...

        // Read the file data as a buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure the directory exists
        const uploadDir = path.join(process.cwd(), 'public/assets', productId);
        await mkdir(uploadDir, { recursive: true });

        // Define the file path
        const filePath = path.join(uploadDir, file.name);

        // Write file to disk
        await writeFile(filePath, buffer);

        // Construct the public URL
        const fileURL = `/assets/${productId}/${file.name}`;

        // save to Prisma
        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: {
                images: {
                    create: { image: fileURL },
                },
            },
            include: { images: true },
        });

        return NextResponse.json({
            message: 'File Uploaded successfully',
            data: updatedProduct?.images,
        });
    }
}

// dar POST raveheshe ferestadan dadeo ba FormData yad gereftim va aln mikham az raveshe query string dadeo begirim(ke inja id ra lazem darim)
export async function GET(req: NextRequest) {
    // query string ?data=''
    // get productImage
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');
    if (!productId) {
        return NextResponse.json(
            {
                error: 'Missing product id',
            },
            {
                status: 400,
            },
        );
    } else {
        const images = await prisma.image.findMany({
            where: { productId },
        });
        return NextResponse.json({
            // in dg daste khodemone ke mesle POST peygham befrestim ya na, ya darinja be esme images befrestim ya mesle POST data: images, ina dg daste khodemone
            images,
        });
    }
}

export async function DELETE(req: NextRequest) {
    // delete image from localhost
    const { searchParams } = new URL(req.url);
    const imageId = searchParams.get('imageId');
    if (!imageId) {
        return NextResponse.json(
            {
                error: 'Missing image id',
            },
            {
                status: 400,
            },
        );
    }
    const image = await prisma.image.findUnique({
        where: {
            id: imageId,
        },
        include: {
            product: true,
        },
    });
    if (!image) {
        return NextResponse.json(
            {
                error: 'Invalid image id',
            },
            {
                status: 400,
            },
        );
    }

    // Construct the file path from stored URL
    const imagePath = path.join(process.cwd(), 'public', image.image);

    //remove the image file from the filesystem
    try {
        await fs.unlink(imagePath);
        console.log(`Deleted file: ${imagePath}`);
    } catch (fileError) {
        console.error(`Error deleting file ${imagePath}:`, fileError);
        return NextResponse.json(
            {
                error: 'File deletion failed',
            },
            {
                status: 500,
            },
        );
    }

    // delete image from db
    await prisma.image.delete({
        where: {
            id: imageId,
        },
    });

    return NextResponse.json(
        {
            message: 'Image deleted successfully',
            data: image.productId,
        },
        {
            status: 200,
        },
    );
}
