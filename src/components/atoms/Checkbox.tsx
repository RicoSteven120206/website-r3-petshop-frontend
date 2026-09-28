"use client";

import * as React from "react";
import { cn } from "@/src/lib/cn";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, disabled, ...props }, ref) => {
        return (
            <span className="relative inline-flex h-4 w-4 shrink-0 items-center justify-center">
                <input 
                    ref={ref}
                    type="checkbox" 
                    disabled={disabled}
                    className={cn(
                        "peer h-4 w-4 shrink-0 cursor-pointer appearance-none rounded border border-neutral-300 bg-white",
                        "checked:border-neutral-900 checked:bg-neutral-900",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    {...props}
                />
                <svg 
                    className="pointer-events-none absolute h-3 w-3 scale-0 text-white peer-checked:scale-100"
                    viewBox="0 0 12 12"
                    fill="none"
                >
                    <path 
                        d="M2.5 6.5L4.75 8.75L9.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
        );
    }
);

Checkbox.displayName = "Checkbox";