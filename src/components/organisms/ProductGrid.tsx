"use client";

import React from "react";
import { Text } from "../atoms/Index";
import { ProductCard, ProductCardSkeleton } from "../molecules/ProductCard";
import { Product } from "@/src/lib/types";
import { useCart } from "@/src/lib/cart-context";
import { useToast } from "@/src/lib/toast-context";

export interface ProductGridProps {
    products: Product[];
    emptyMessage?: string;
    isLoading?: boolean;
    skeletonCount?: number;
}

export function ProductGrid({
    products,
    emptyMessage = "Tidak ada produk ditemukan",
    isLoading = false,
    skeletonCount = 8,
}: ProductGridProps) {
    const { addItem } = useCart();
    const { showToast } = useToast();

    function handleAddToCart(product: Product) {
        addItem(product.id);
        showToast(`${product.name} ditambahkan ke keranjang`, "success");
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: skeletonCount }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex justify-center py-16">
                <Text>{emptyMessage}</Text>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart}/>
            ))}
        </div>
    );
}