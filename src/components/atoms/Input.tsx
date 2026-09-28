"use client";

import * as React from "react";
import { cn } from "@/src/lib/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid = false, leftAddon, rightAddon, disabled, ...props }, ref) => {
    if (!leftAddon && !rightAddon) {
      return (
        <input 
          ref={ref}
          disabled={disabled}
          aria-invalid={invalid}
          className={cn(
            "h-10 w-full rounded-md border bg-white px-3 text-sm text-neutral-900",
            "placeholder:text-neutral-400 transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400",
            invalid
              ? "border-red-500 focus-visible:ring-red-500"
              : "border-neutral-300 hover:border-neutral-400",
            className
          )}
          {...props}
        />
      );
    }

    return (
      <div
        className={cn(
          "flex h-10 w-full items-center overflow-hidden rounded-md border bg-white transition-colors",
          "focus-within:ring-2 focus-within:ring-neutral-900 focus-within:ring-offset-2",
          invalid ? "border-red-500 focus-within:ring-red-500" : "border-neutral-300 hover:border-neutral-400",
          disabled && "cursor-not-allowed bg-neutral-50",
          className
        )}
      >
        {leftAddon && (
          <span className="flex shrink-0 items-center pl-3 text-neutral-400">{leftAddon}</span>
        )}
        <input 
          ref={ref}
          disabled={disabled}
          aria-invalid={invalid}
          className={cn(
            "h-full w-full bg-transparent px-3 text-sm text-neutral-900 placeholder:text-neutral-400",
            "focus:outline-none disabled:cursor-not-allowed disabled:text-neutral-400"
          )}
          {...props}
        />
        {rightAddon && (
          <span className="flex shrink-0 items-center pr-3 text-neutral-400">{rightAddon}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";