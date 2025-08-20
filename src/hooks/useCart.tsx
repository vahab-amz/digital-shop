'use client';

import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCart = () => {
    // nokte: request haye ma ke az reactQuery estefade mikonim ya query hastan ya mutation. 1_ onai ke marbot be GET kardan mishan, mishe query 2_ va onai ke marbot mishan be dastkari kardane yek dade mishan mutation mesle DELETE EDIT ADD

    // get all cart items by query ==> cart
    // add to cart ==> addToCartMutiation
    // delete from cart ==> removeCartItemMutation

    const queryClient = useQueryClient();

    // fetch cart data
    // useQuery marbot be gereftn dade ma az yek data base hastesh (va ya mahali ke data e ma daron zakhire shode)
    // useQuery khooji haye mokhtalef dare ke baste be kare ma miaim va onaro biron mikeshim, vali ma inja nizad be data, isLoading va error dashtim
    const {
        data: cart,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['cart'], //har useQuery bayd ye kilide vahed dashte bashasn dashte bashe ta age jae dg az proje azash estefade kardim betonim onharo az ham motamayez konim
        queryFn: async () => {
            //queryFn ya query function ye kario anjam mide ke async hastesh
            const res = await fetch('/api/cart/');
            if (!res.ok) throw new Error('failed to fetch cart');
            return res.json();
        },
        // ba estfade az useQuery mitonim dade haro ham catch bokoim bade fetch (catch dakhele rame system ma hast va na dar mororgar)
        staleTime: 5 * 60 * 1000, //catch for 5 min
    });

    //add to cart
    const addToCartMutiation = useMutation({
        // darinja chon niaz be mutationKey ndashtim azash skip kardim
        mutationFn: async (productId: string) => {
            const res = await fetch('/api/cart/', {
                method: 'POST',
                body: JSON.stringify({ productId }),
                headers: {
                    'Content-type': 'application/json',
                },
            });
            if (!res.ok) throw new Error('failed to add to cart');
            return res.json();
        },
        onSuccess: () => {
            //in bakh male zamanie ke item dakhele cart ba movafaghiat add shode va niaz dare dare ke ghestame fetch kardane dadaro yek invalidate ya update bokone bedone refresh kardane page va dakhele invalidateQueries ba on queryKey ke enekhab kardim migim kodom useQuery ra invalidate kone
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            // console.log("Item is added")
            toast.success('Item is added');
        },
        onError: () => {
            // console.log('Failed to add')
            toast.error('Failed to add. Please make sure you are logged in');
        },
    });

    //remove a item from cart
    const removeCartItemMutation = useMutation({
        // darinja chon niaz be mutationKey ndashtim azash skip kardim
        mutationFn: async (productId: string) => {
            const res = await fetch('/api/cart/', {
                method: 'DELETE',
                body: JSON.stringify({ productId }),
                headers: {
                    'Content-type': 'application/json',
                },
            });
            if (!res.ok) throw new Error('failed to remove from cart');
            return res.json();
        },
        onSuccess: () => {
            //in bakh male zamanie ke item dakhele cart ba movafaghiat add shode va niaz dare dare ke ghestame fetch kardane dadaro yek invalidate ya update bokone bedone refresh kardane page va dakhele invalidateQueries ba on queryKey ke enekhab kardim migim kodom useQuery ra invalidate kone
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            // console.log('item deleted');
            toast.success('Item deleted');
        },
        onError: () => {
            // console.log('failed to delete')
            toast.error('failed to delete');
        },
    });

    return {
        cart,
        isLoading,
        error,
        addToCartMutiation,
        removeCartItemMutation,
    };
};
