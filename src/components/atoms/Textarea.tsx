import React from "react";
import { cn } from "@/src/lib/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, invalid = false, disabled, ...props }, ref) => {
        return (
            <textarea 
                ref={ref}
                disabled={disabled}
                aria-invalid={invalid}
                className={cn(
                    "w-full resize-none rounded-md border bg-white px-3 py-2 text-sm text-neutral-900",
                    "placeholder:text-neutral-400 transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#DF1D3D]",
                    "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400",
                    invalid
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-neutral-300 hover:border-neutral-400"  ,
                    className
                )}
                {...props}
            />
        );
    }
);

Textarea.displayName = "Textarea";