import React from "react";
import Link from "next/link";
import { cn } from "@/src/lib/cn";

export interface BreadcrumbItems {
    label: string;
    href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
    items: BreadcrumbItems[];
}

export function Breadcrumb({
    items,
    className,
    ...props
}: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className={cn("text-sm", className)} {...props}>
            <ol className="flex flex-wrap items-center gap-1.5">
                {items.map((item, i) => {
                    const isLast = i === items.length -1;
                    return (
                        <li key={i} className="flex items-center gap-1.5">
                            {item.href && !isLast ? (
                                <Link href={item.href} className="text-neutal-500 hover:text-neutral-900">
                                {item.label}</Link>
                            ) : (
                                <span className="text-neutral-900" aria-current={isLast ? "page" : undefined}>
                                    {item.label}
                                </span>
                            )}
                            {!isLast && <span className="text-neutral-300">/</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}