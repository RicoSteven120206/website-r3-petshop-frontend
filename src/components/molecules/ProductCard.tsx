"use client";

import React from "react";
import Link from "next/link";
import { Badge, Button, Divider, Price, Rating, Skeleton } from "@/src/components/atoms/Index";
import { Product } from "@/src/lib/types";

export interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
}

export function ProductCard({
    product,
    onAddToCart
}: ProductCardProps) {
    const outOfStock = product.stock <= 0;

    return (
        <div className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition-shadow hover:shadow-md">
            <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-neutral-100">
                <img 
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <Badge variant="danger" className="absolute left-2 top-2">
                        Diskon
                    </Badge>
                )}
                {outOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                        <Badge variant="outline">Stok habis</Badge> 
                    </div>
                )}
            </Link>

            <div className="flex flex-1 flex-col gap-1.5 p-3">
                <Link href={`/product/${product.slug}`}>
                    <h3 className="line-clamp-2 text-sm font-medium text-neutral-900 hover:underline">
                        {product.name}
                    </h3>
                </Link>
                <Rating value={product.rating} count={product.reviewCount} />
                <Price value={product.price} compareAtValue={product.compareAtPrice} size="sm"/>

                <Button
                    variant="primary"
                    size="sm"
                    className="mt-2"
                    disabled={outOfStock}
                    onClick={() => onAddToCart?.(product)}
                >
                    {outOfStock ? "Stok habis" : "Tambah ke keranjang"}
                </Button>
            </div>
        </div>
    );
}

export function ProductCardSkeleton() {
    return (
        <div className="flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white">
            <Skeleton className="aspect-square w-full rounded-none"/>
            <div className="flex flex-col gap-2 p-3">
                <Skeleton className="h-4 w-full"/>
                <Skeleton className="h-4 w-2/3"/>
                <Skeleton className="h-3 w-1/3"/>
                <Skeleton className="h-5 w-1/2"/>
                <Skeleton className="mt-2 h-8 w-full"/>
            </div>
        </div>
    );
}