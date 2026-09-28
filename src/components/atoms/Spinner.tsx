"use client";

import * as React from "react";
import { cn } from "@/src/lib/cn";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
    size?: SpinnerSize;
}

const sizeStyles: Record<SpinnerSize, string> = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
};

export const Spinner  = React.forwardRef<SVGSVGElement, SpinnerProps>(
    ({ className, size = "md", ...props }, ref) => {
        return (
            <svg
                ref={ref}
                role="status"
                aria-label="loading"
                viewBox="0 0 24 24"
                fill="none"
                className={cn("animate-spin", sizeStyles[size], className)}
                {...props}
            >
                <circle 
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path 
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
            </svg>
        );
    }
);

Spinner.displayName = "Spinner";
