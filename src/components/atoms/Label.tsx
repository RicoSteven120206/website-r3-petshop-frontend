"use client"

import * as React from "react";
import { cn } from "@/src/lib/cn";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <label 
        ref={ref}
        className={cn("text-sm font-medium leading-none text-neutral-900", className)}
      >
        {children}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
    );
  }
);

Label.displayName = "Label";