"use client";

import React from "react";
import { Product } from "@/src/lib/types";
import { products } from "./data/products";

interface WishlistContextValue {
    productIds: string[];
    isWishlisted: (productId: string) => boolean;
    toggleWishlist: (productId: string) => void;
    wishlistedProducts: Product[];
}

const WishlistContext = React.createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "petshop:wishlist";

export function WishlistProvider({ 
    children 
}: { children: React.ReactNode }) {
    const [productIds, setProductIds] = React.useState<string[]>([]);
    const [hydrated, setHydrated] = React.useState(false);

    React.useEffect(() => {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (raw) setProductIds(JSON.parse(raw));
        } catch {

        } finally {
            setHydrated(true);
        }
    }, []);

    React.useEffect(() => {
        if (!hydrated) return;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(productIds));
    }, [productIds, hydrated]);

    const toggleWishlist = React.useCallback((productId: string) => {
        setProductIds((prev) => 
            prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
        );
    }, []);

    const isWishlisted = React.useCallback(
        (productId: string) => productIds.includes(productId),
        [productIds]
    );

    const wishlistedProducts = React.useMemo(
        () => products.filter((p) => productIds.includes(p.id)),
        [productIds]
    );

    return (
        <WishlistContext.Provider
            value={{ productIds, isWishlisted, toggleWishlist, wishlistedProducts }}
        >
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist() {
    const ctx = React.useContext(WishlistContext);
    if (!ctx) throw new Error("useWishlist must be used within <WishlistProvider>");
    return ctx;
}