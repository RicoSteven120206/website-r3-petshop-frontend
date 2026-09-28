"use client";

import * as React from "react";
import { cn } from "@/src/lib/cn";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: AvatarSize;
}

const sizeStyles: Record<AvatarSize, string> = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
};

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
    ({ className, src, alt = "", fallback, size = "md", ...props }, ref) => {
        const [imgError, setImgError] = React.useState(false);
        const showImage = src && !imgError;

        return (
            <span
                ref={ref}
                className={cn(
                    "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-200 font-medium text-neutral-600",
                    sizeStyles[size],
                    className
                )}
                {...props}
            >
                {showImage ? (
                    <img
                        src={src}
                        alt={alt}
                        className="h-full w-full object-cover"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <span aria-hidden={!!alt}>{fallback ?? alt.slice(0, 2).toUpperCase()}</span>
                )}
            </span>
        );
    }
);

Avatar.displayName = "Avatar";