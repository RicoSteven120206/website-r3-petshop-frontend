"use client";

import React from "react";
import { cn } from "@/src/lib/cn";

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number;
    count?: number;
    size?: "sm" | "md";
}

const starSize: Record<NonNullable<RatingProps["size"]>, string> = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
};

function Star({
    fillPercent,
    className
}: { fillPercent: number, className: string }) {
    const id = React.useId();
    return (
        <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
            <defs>
                <linearGradient id={id}>
                    <stop offset={`${fillPercent}%`} stopColor="currentColor"/>
                    <stop offset={`${fillPercent}%`} stopColor="transparent"/>
                </linearGradient>
            </defs>
            <path 
                fill={`url(#${id})`}
                stroke="currentColor"
                strokeWidth="1"
                className="text-amber-400"
                d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.9l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L10 1.5z"
            />
        </svg>
    );
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
    ({ value, count, size = "sm", className, ...props }, ref) => {
        const clamped = Math.max(0, Math.min(5, value));
        return (
            <div ref={ref} className={cn("flex items-center gap-1", className)} {...props}>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => {
                        const fillPercent = Math.min(0, Math.min(1, clamped - i)) * 100;
                        return <Star key={i} fillPercent={fillPercent} className={starSize[size]}/>;
                    })}
                </div>
                {typeof count === "number" && (
                    <span className="text-xs text-neutral-500">{count}</span>
                )}
            </div>
        );
    }
);

Rating.displayName = "Rating";