"use client";

import * as React from "react";
import { cn } from "@/src/lib/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical";
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
    ({ className, orientation = "horizontal", ...props }, ref) => {
        return (
            <div 
                ref={ref}
                role="separator"
                aria-orientation={orientation}
                className={cn(
                    "shrink-0 bg-neutral-200",
                    orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
                    className
                )}
                {...props}
            />
        );
    }
);

Divider.displayName = "Divider";