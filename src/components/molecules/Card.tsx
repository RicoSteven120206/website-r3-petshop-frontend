"use client";

import * as React from "react";
import { cn } from "@/src/lib/cn";
import { Heading, Text } from "@/src/components/atoms/Index";

function CardRoot({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div 
            className={cn(
                "rounded-lg border border-neutral-200 bg-white shadow-sm",
                className
            )}
            {...props}
        />
    );
}

function CardHeader({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("flex flex-col gap-1 p-6 pb-0", className)} {...props} />
}

function CardTitle({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <Heading level={4} className={className} {...props}>
            {children}
        </Heading>
    )
}

function CardDescription({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <Text 
            size="sm"
            tone="muted"
            className={className} 
            {...props}
        >
            {children}
        </Text>
    );
}

function CardContent({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("p-6", className)} {...props} />
}

function CardFooter({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("flex items-center gap-2 border-t border-neutral-100 p-6 pt-4", className)}
            {...props}
        />
    );
}

export const Card = Object.assign(CardRoot, {
    Header: CardHeader,
    Title: CardTitle,
    Description: CardDescription,
    Content: CardContent,
    Footer: CardFooter,
});