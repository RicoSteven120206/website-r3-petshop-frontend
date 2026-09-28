"use client";

import * as React from "react";
import { cn } from "@/src/lib/cn";

type TextSize = "xs" | "sm" | "base" |"lg" | "xl";
type TextWeight = "normal" | "medium" | "semibold" | "bold";
type TextTone = "default" | "muted" | "danger" | "success";
type TextAs = "p" | "span" | "div";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
    as?: TextAs;
    size?: TextSize;
    weight?: TextWeight;
    tone?: TextTone;
}

const sizeStyles: Record<TextSize, string> = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
};

const weightStyles: Record<TextWeight, string> = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "semibold",
    bold: "font-bold",
};

const toneStyles: Record<TextTone, string> = {
    default: "text-neutral-900",
    muted: "text-neutral-500",
    danger: "text-red-600",
    success: "text-emerald-600",
};

export const Text = React.forwardRef<HTMLElement, TextProps>(
    ({ as = "p", size = "base", weight = "normal", tone = "default", className, children, ...props }, ref) => {
        const Component = as as React.ElementType;
        return (
            <Component
                ref={ref}
                className={cn(sizeStyles[size], weightStyles[weight], toneStyles[tone], className)}
                {...props}
            >
                {children}
            </Component>
        );
    }
);

Text.displayName = "Text";