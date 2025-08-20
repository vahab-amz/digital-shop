import { Image } from "@prisma/client"
import { Metadata } from "next"
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"

type ProductMetaData = {
    title?: string
    description?: string | null
    keywords?: string[],
    images?: Image[] | null
}

export default function customMetaDataGenerator({
    title = "Digital Shop",
    description = "a digital shop for ...",
    keywords = ['digiral', 'laptop', 'mobile'],
    images = undefined
}: ProductMetaData): Metadata {
    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            type: 'website',
            url: `http://localhost:3000/products/${title}`,
            images
        } as OpenGraph
    }
}