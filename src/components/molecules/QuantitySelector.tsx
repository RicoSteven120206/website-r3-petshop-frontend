"use client";

import React from "react";
import { cn } from "@/src/lib/cn";

export interface QuantitySelectorProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    size?: "sm" | "md";
    className?: string;
}

export function QuantitySelector({
    value,
    onChange,
    min = 1,
    max = 99,
    size = "md",
    className
}: QuantitySelectorProps){
    const heights = size === "sm" ? "h-8 w-8 text-sm" : "h-10 w-10 text-base";

    function clamp(next: number) {
        onChange(Math.max(min, Math.min(max, next)));
    }

    return (
        <div className={cn("inline-flex items-center rounded-md border border-neutral-300", className)}>
            <button
                type="button"
                aria-label="Kurangi jumlah"
                disabled={value <= min}
                onClick={() => clamp(value -1)}
                className={cn(
                    "flex items-center justify-center text-neutral-600 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40",
                    heights
                )}
            >
                -
            </button>
            <span
                className={cn(
                    "flex min-w-[2rem] items-center justify-center border-x border-neutral-300 font-medium text-neutral-900", heights
                )}
            >
                {value}
            </span>
            <button
                type="button"
                aria-label="Tambah jumlah"
                disabled={value >= max}
                onClick={() => clamp(value + 1)}
                className={cn(
                    "flex items-center justify-center text-neutral-600 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40", heights
                )}
            >
                +
            </button>
        </div>
    )
}