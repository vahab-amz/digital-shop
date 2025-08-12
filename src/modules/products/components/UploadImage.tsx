'use client';

import { Button, Input, Label } from '@/components/ui';
import { PrismaType } from '@/lib/prisma';
import { CircleX } from 'lucide-react';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import { deleteImage, FetchImages, uploadImages } from '../services/image';
import Spinner from '@/components/Spinner';

const UploadImage: FC<{ productId: string }> = ({ productId }) => {
    const [file, setFile] = useState<File | null>(null);
    const [images, setImages] = useState<PrismaType.Image[] | null>(null);
    const [loading, setLoading] = useState(true);

    const handleChnageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        } else {
            setFile(null);
        }
    };

    const handleUpload = async () => {
        if (!file || !productId) {
            alert('please select a valid file and product');
        } else {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('productId', productId);
            const { data } = await uploadImages(formData);
            setImages(data);
            setFile(null);
        }
    };

    const handleDelete = async (imageId: string) => {
        setLoading(true);
        const data = await deleteImage(imageId);
        updateImageList(imageId);
        setLoading(false);
    };

    const updateImageList = (imageId: string) => {
        setImages(
            (preState) => preState?.filter((img) => img.id !== imageId) || null,
        );
    };

    useEffect(() => {
        const getImages = async () => {
            const data = await FetchImages(productId);
            setImages(data?.images);
            setLoading(false);
        };

        getImages();
    }, [productId]);

    return (
        <div className="w-full mt-5">
            <Label htmlFor="picture">Product Image</Label>
            <div className="flex gap-2 mt-2 w-full justify-between">
                <Input
                    type="file"
                    id="picture"
                    accept="image/*"
                    onChange={handleChnageFile}
                />
                <Button onClick={handleUpload}>Upload Image</Button>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-wrap gap-2 mt-4 ">
                    {images?.map((img) => (
                        <div className="relative group" key={img.id}>
                            <CircleX
                                size="30px"
                                className="absolute top-0 right-0 text-red-600 p-1  group-hover:opacity-100 transition-opacity cursor-pointer"
                                onClick={() => handleDelete(img.id)}
                            />
                            <Image
                                width={100}
                                height={100}
                                alt="product image"
                                src={img.image || '/assets/no-image.jpg'}
                                className=" mx-auto rounded-md"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UploadImage;
