"use client";

import React from "react";
import Link from "next/link";
import { Input } from "@/src/components/atoms/Index";
import { cn } from "@/src/lib/cn";
import { products } from "@/src/lib/data/products";
import { Product } from "@/src/lib/types";

export interface SearchBarProps {
    placeholder?: string;
    defaultValue?: string;
    onSearch: (query: string) => void;
    className?: string;
    maxSuggestions?: number;
}

export function SearchBar({
    placeholder = "Cari produk",
    defaultValue = "",
    onSearch,
    className,
    maxSuggestions = 5,
}: SearchBarProps) {
    const [query, setQuery] = React.useState(defaultValue);
    const [isOpen, setIsOpen] = React.useState(false);
    const [highlightIndex, setHighlightIndex] = React.useState(-1);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const suggestions: Product[] = React.useMemo(() => {
        const trimmed = query.trim().toLowerCase();
        if (!trimmed) return [];
        return products.filter((p) => p.name.toLowerCase().includes(trimmed)).slice(0, maxSuggestions);
    }, [query, maxSuggestions]);

    React.useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function runSearch(value: string) {
        setIsOpen(false);
        setHighlightIndex(-1);
        onSearch(value.trim());
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        runSearch(query);
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (!isOpen || suggestions.length === 0) return;
        if (e.key === "ArrawDown") {
            e.preventDefault();
            setHighlightIndex((i) => (i + 1) % suggestions.length);
        } else if (e.key === "ArrawUp") {
            e.preventDefault();
            setHighlightIndex((i) => i <= 0 ? suggestions.length - 1 : i - 1);
        } else if (e.key === "Escape") {
            setIsOpen(false);
        }
    }

    return (
        <div ref={containerRef} className={cn("relative w-full", className)}> 
            <form onSubmit={handleSubmit} role="search">
                <Input 
                    type="search"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                        setHighlightIndex(-1);
                    }}
                    onFocus={() => query && setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    aria-label="Cari produk"
                    autoComplete="off"
                    role="comobox"
                    aria-expanded={isOpen && suggestions.length > 0}
                    aria-controls="search-suggestions"
                    leftAddon={
                        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M17 17l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                    }
                />
            </form>

            {isOpen && suggestions.length > 0 && (
                <ul
                    id="search-suggestions"
                    role="listbox"
                    className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-md border border-neutral-200 bg-white shadow-lg"
                >
                    {suggestions.map((product, i) => (
                        <li key={product.id} role="option" aria-selected={i === highlightIndex}>
                            <Link 
                                href={`/product/${product.slug}`}
                                onClick={() => setIsOpen(false)}
                                onMouseEnter={() => setHighlightIndex(i)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 text-sm transition-colors",
                                    i === highlightIndex ? "bg-neutral-100" : "hover:bg-neutral-50"
                                )}
                            >
                                <img 
                                    src={product.image}
                                    alt={product.name}
                                    className="h-9 w-9 shrink-0 rounded object-cover"
                                />
                                <span className="line-clamp-1 text-neutral-800">{product.name}</span>
                            </Link>
                        </li>
                    ))}
                    <li>
                        <button
                            type="button"
                            onClick={() => onSearch(query)}
                            className="block w-full px-3 py-2 text-left text-sm font-medium text-neutral-600 hover:bg-neutral-50"
                        >
                            Lihat semua hasil untuk &ldquo;{query}&rdquo;
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
}