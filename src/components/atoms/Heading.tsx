"use client";

import * as React from "react";
import { cn } from "@/src/lib/cn";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level?: HeadingLevel;
}

const levelStyles: Record<HeadingLevel, string> = {
    1: "text-4xl font-bold tracking-tight",
    2: "text-3xl font-bold tracking-tight",
    3: "text-2xl font-semibold tracking-tight",
    4: "text-xl font-semibold",
    5: "text-lg font-semibold",
    6: "text-base font-semibold",
};

export const Heading  = React.forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ level = 2, className, children, ...props }, ref) => {
        const Component =  `h${level}` as React.ElementType;
        return (
            <Component
                ref={ref}
                className={cn(levelStyles[level], "text-neutral-900", className)}
                {...props}
            >
                {children}
            </Component>
        );
    }
);

Heading.displayName = "Heading";