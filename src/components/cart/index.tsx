'use client';

import React from 'react';
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { CartWithProduct } from '@/app/types';

function CartDropdown() {
    const { cart, isLoading, error, removeCartItemMutation } = useCart();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="relative">
                    <ShoppingCart
                        strokeWidth="2.2"
                        size="25"
                        color="#ffffff"
                        className="cursor-pointer"
                    />
                    {cart?.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {cart.length}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 p-4">
                <h1 className="text-lg font-semibold">Cart Items</h1>
                {isLoading ? (
                    <p>loading...</p>
                ) : !cart || cart?.length === 0 ? (
                    <p>your cart is empty</p>
                ) : (
                    <div className="space-y-3">
                        {cart?.map((item: CartWithProduct) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between border-b pb-2"
                            >
                                <div>
                                    <p className="text-sm font-medium">
                                        {item.product.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Price: $
                                        {Number(item.product.price).toFixed(2)}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Quantity: {item.quantity}
                                    </p>
                                </div>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() =>
                                        //removeCartItemMutation yek function mamoli nistesh ke beshe callesh kard va bayad mutatesh kard baraye hamin bayad behesh ye mutate ezafe kard va sepas raftare functioni dasht bahash
                                        removeCartItemMutation.mutate(
                                            item.product.id,
                                        )
                                    }
                                >
                                    ✕
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default CartDropdown;
