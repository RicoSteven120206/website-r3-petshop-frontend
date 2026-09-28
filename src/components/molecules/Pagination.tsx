"use client";

import React from "react";
import { cn } from "@/src/lib/cn";

export interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

function getPageNumbers(page: number, totalPages: number): (number | "ellipsis")[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = new Set([1, totalPages, page, page - 1, page + 1]);
    const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
    const result: (number | "ellipsis")[] = [];
    sorted.forEach((p, i) => {
        if (i > 0 && p - (sorted[i - 1] as number) > 1) result.push("ellipsis");
        result.push(p);
    })
    return result;
}

export function Pagination({
    page,
    totalPages,
    onPageChange,
    className
}: PaginationProps) {
    if (totalPages <= 1) return null;
    const pages = getPageNumbers(page, totalPages);

    return (
        <nav aria-label="Pagination" className={cn("flex items-center justify-center gap-1", className)}>
            <button
                type="button"
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
                aria-label="Halaman sebelumnya"
                className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
                ,
            </button>
            
            {pages.map((p, i) =>
                p === "ellipsis" ? (
                    <span key={`e${i}`} className="flex h-8 w-8 items-center justify-center text-neutral-400">
                        ...
                    </span>
                ) : (
                    <button
                        key={p}
                        type="button"
                        onClick={() => onPageChange(p)}
                        aria-current={p === page ? "page" : undefined}
                        className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors",
                            p === page ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100"
                        )}
                    >
                        {p}
                    </button>
                )
            )}

            <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => onPageChange(page + 1)}
                aria-label="Halaman berikutnya"
                className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
                ,
            </button>
        </nav>
    );
}