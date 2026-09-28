"use client";

import React from "react";
import { Price, Text } from "@/src/components/atoms/Index";
import { QuantitySelector } from "./QuantitySelector";
import { Product } from "@/src/lib/types";

export interface CartItemProps {
    product: Product;
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    onRemove: () => void;
}

export function CartItem({
    product,
    quantity,
    onQuantityChange,
    onRemove
}: CartItemProps) {
    return (
        <div>
            <img 
                src={product.image} 
                alt={product.name}
                className="h-16 w-16 shrink-0 rounded-md object-cover" 
            />
            <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-start justify-between gap-2">
                    <Text size="sm" weight="medium" className="line-clamp-2">
                        {product.name}
                    </Text>
                    <button
                        type="button"
                        onClick={onRemove}
                        aria-label={`Hapus ${product.name} dari keranjang`}
                        className="shrink-0 text-neutral-400 hover:text-red-600"
                    >
                        ✕
                    </button>
                </div>
                <Price value={product.price} size="sm"/>
                <div className="mt-1">
                    <QuantitySelector 
                        value={quantity}
                        onChange={onQuantityChange}
                        max={product.stock}
                        size="sm"
                    />
                </div>
            </div>
        </div>
    );
}