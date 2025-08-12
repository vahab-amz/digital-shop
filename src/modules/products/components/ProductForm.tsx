'use client';

import { Product, ProductCategory } from '@prisma/client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Input,
    Label,
    Textarea,
    Button,
} from '@/components/ui';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { upsertProduct } from '../services';
import UploadImage from './UploadImage';

function ProductForm(props: { product: Product | null }) {
    const { register, handleSubmit, setValue } = useForm<Product>();
    const { product } = props;

    const onSubmitForm = (data: Product) => {
        console.log(data);
        // console.log(product);
        const _product = {
            ...data,
            id: product?.id || '', //inam ke bayad bashe chon dakhele data nis, va dar dakhele method upsertProduct behesh niaz darim ke bar asase on ma migim aya update gharare beshe ya insert
            price: parseFloat(data.price?.toString() || '0'), //bayad tabdil konim be noe khode on meghdar dar dataBase(dakhele method parseInt faghat string ghabol mikone bara hamin on meghdaro be string tabdil kardim, va in ham || '0' be indalil gozashtim ke meghdare dakhele parseInt nemitone undefined bashe bara hamin migim age undefined bod '0' bezar)
            quantity: parseInt(data.quantity?.toString() || '0'), //in ham mese halate bala
            category: data.category || product?.category, // ino ham gozahtim chon age moghe edit kardn ye product meghdare category ke ye select asto avaz nakonim meghdare khali dar nazar grefte mishe chon attribute onValueChange ke moghe taghir meghdare select faal misshavad, faal nemishavad
        };
        upsertProduct(_product);
    };

    // tozihat ==> ba estafade az package hook-react-form va estefade az method hai ke me ma mide mitonim maghadir yek from ra daryaft konim, yek method handleSubmit mide ke mitonim dakhele onSubmit dakhele form bezarimesh va be onave vodofi ye tabe dg migire ke khodmon bayad besazimesh(onSubmitForm), in tabe ye vorodi dare be esme data ke tamame etelat dakhele one bad az submit
    // baestafde az az register ma ye key ke dakhelesh gozashtim doros kardim va value an ham meghdari ast ke input be ma mide

    return (
        <div className="flex justify-center">
            <form
                className="w-full max-w-[30%] text-white"
                onSubmit={handleSubmit(onSubmitForm)}
            >
                <div className="mb-10">
                    <h1 className="text-5xl ">Product</h1>
                    <h3>
                        {product?.id ? 'Update Product' : 'Create New Product'}
                    </h3>
                </div>
                <div className="mb-3">
                    <Label className="mb-2" htmlFor="name">
                        Product Name
                    </Label>
                    <Input
                        {...register('name')}
                        type="text"
                        id="name"
                        required
                        defaultValue={product?.name || ''}
                    />
                </div>
                <div className="mb-3">
                    <Label className="mb-2" htmlFor="category">
                        Category
                    </Label>
                    {/* dar bahse Select,ba estefade az register nemishe meghdaresho gereft va in hook ye method dg mide ke betonim azash dadaro begirim,( khode select attribute onValueChange dare ke dakhelesh ye method call mishe ke meghdare vorodie on value ast ke barabare meghdre on select ast ), ke be ma method setValue mide ke 2ta meghdar migire, avali key ma hast va dovomi value ya meghdare an (in ham "value as ProductCategory" injori neveshtim ke chon az typeScript darim estefade mikonim, chon bayad meghdaresh az string bashe miaim migim noe in dade be in sorate yni be halate stringe ke gir nade behemon) */}
                    <Select
                        onValueChange={(value) =>
                            setValue('category', value as ProductCategory)
                        }
                        required
                        defaultValue={
                            product?.category || ProductCategory.OTHERS
                        }
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {Object.values(ProductCategory).map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="mb-3">
                    <Label className="mb-2" htmlFor="description">
                        Description
                    </Label>
                    <Textarea
                        {...register('description')}
                        id="description"
                        required
                        defaultValue={product?.description || ''}
                    />
                </div>
                <div className="mb-3">
                    <Label className="mb-2" htmlFor="price">
                        Price
                    </Label>
                    <Input
                        {...register('price')}
                        type="number"
                        step="0.01"
                        id="price"
                        defaultValue={product?.price || ''}
                    />
                </div>
                <div className="mb-3">
                    <Label className="mb-2" htmlFor="quantity">
                        Quantity
                    </Label>
                    <Input
                        {...register('quantity')}
                        type="number"
                        id="quantity"
                        defaultValue={product?.quantity || ''}
                    />
                </div>
                <div className="flex justify-between">
                    <Button className="text-black" variant="outline" asChild>
                        <Link href="/dashboard/products">Back</Link>
                    </Button>
                    <Button type="submit">
                        {product?.id ? 'Update Product' : 'Add Product'}
                    </Button>
                </div>
                {product?.id && (
                    <div>
                        <UploadImage productId={product?.id} />
                    </div>
                )}
            </form>
        </div>
    );
}

export default ProductForm;
