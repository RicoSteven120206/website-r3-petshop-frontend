"use client";

import * as React from "react";
import { cn } from "@/src/lib/cn";
import { Spinner} from "./Spinner";

export type ButtonVariant = "brand" | "primary" | "secondary" | "outline" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode; 
}

const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible-ring-offset-2 focus-visible:ring-[#DF1D3D] disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
    brand: "bg-[#DF1D3D] text-white hover:bg-[#CD0022] active:bg[#B5001E]",
    primary: "bg-neutral-900 text-white hover:bg-neutral-700 active:bg-neutral-800",
    secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300",
    outline: "border border-neutral-300 bg-transparent text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200",
    ghost: "bg-transparent text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200",
    destructive: "bg-red-600 text-white hover:bg-red-500 active:bg-red-700"
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10 p-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "brand",
            size = "md",
            isLoading = false,
            leftIcon,
            rightIcon,
            disabled,
            children,
            ...props
        }, ref
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
                {...props}
            >
                {isLoading ? (
                    <Spinner size="sm" className="text-current" />
                ) : (
                    leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
                )}
                {children}
                {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = "Button";
