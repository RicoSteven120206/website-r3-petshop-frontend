import React from "react";
import { Heading, Text } from "@/src/components/atoms/Index";
import { ProductCard } from "../molecules/ProductCard";
import { Product } from "@/src/lib/types";

export interface ProductSectionProps {
    title: string;
    subtitle?: string;
    products: Product[];
}

export function ProductSection({
    title,
    subtitle,
    products
}: ProductSectionProps) {
    if (products.length === 0) return;

    return (
        <div className="flex w-full flex-col items-start py-6 pl-13.5">
            <div>
                <Heading level={2} className="text-xl">
                    {title}
                </Heading>
                {subtitle && (
                    <Text size="sm" tone="muted">
                        {subtitle}
                    </Text>
                )}
            </div>
            <div className="flex w-full flex-row justify-start gap-8 overflow-x-auto">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}