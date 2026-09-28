"use client";

import React from "react";
import { cn } from "@/src/lib/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
    ({ className, ...props }, ref) => {
        return (
            <div 
                ref={ref}
                aria-hidden="true"
                className={cn("animate-pulse rounded-md bg-neutral-200", className)}
                {...props}
            />
        );
    }
);

Skeleton.displayName = "Skeleton";