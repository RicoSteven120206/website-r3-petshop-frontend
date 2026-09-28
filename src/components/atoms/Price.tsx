"use client";

import React from "react";
import { cn } from "@/src/lib/cn";

export interface PriceProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number;
    compareAtValue?: number;
    size?: "sm" | "md" | "lg";
    currency?: string; 
}

const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
};

function formatIDR(value: number, currency: string) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    }).format(value);
}

export const Price = React.forwardRef<HTMLDivElement, PriceProps>(
    ({ value, compareAtValue, size = "md", currency = "IDR", className, ...props }, ref) => {
        const hasDiscount = !!compareAtValue && compareAtValue > value;
        const discountPercent = hasDiscount
            ? Math.round(((compareAtValue! - value) / compareAtValue) * 100)
            : 0;

        return (
            <div ref={ref} className={cn("flex flex-wrap items-baseline gap-2", className)} {...props}>
                <span className={cn("font-semibold text-neutral-900", sizeStyles[size])}>
                    {formatIDR(value, currency)}
                </span>
                {hasDiscount && (
                    <>
                        <span className="text-sm text-neutral-400 line-through">
                            {formatIDR(compareAtValue!, currency)}
                        </span>
                        <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700">
                            -{discountPercent}%
                        </span>
                    </>
                )}
            </div>
        );
    }
);

Price.displayName = "Price";