"use client";

import React from "react";
import Link from "next/link";
import { Badge, Button } from "@/src/components/atoms/Index";
import { SearchBar } from "@/src/components/molecules/SearchBar";
import { categories } from "@/src/lib/data/categories";
import { useCart } from "@/src/lib/cart-context";
import { useWishlist } from "@/src/lib/wishlist-context";

export interface HeaderProps {
    onSearch?: (query: string) => void;
    onCartClick?: () => void;
}

export function Header({
    onSearch,
    onCartClick
}: HeaderProps) {
    const { totalItems } = useCart();
    const { productIds } = useWishlist();

    return (
        <header className="sticky top-0 z-30 border-b border-neutral-200bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3">
                <div className="flex items-center gap-4">
                    <link
                        href="/"
                        className="shrink-0 text-lg font-bold text-neutral-900"    
                    >
                        🐾 PetShop
                    </link>
                    <div className="hidden flex-1 md:block">
                        <SearchBar onSearch={(q) => onSearch?.(q)}/>
                    </div>

                    <Link
                        href="/wishlist"
                        aria-label="Wishlist"
                        className="relative ml-auto flex h-10 w-10 items-center justify-center rounded-md text-neutral-700 transition-colors hover:bg-neutral-100"
                    >
                        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                            <path 
                                d="M12 20.5s-7.5-4.6-10-9.3C.5 7.9 2.4 4.5 6 4.5c2 0 3.6 1 4.8 2.5.4.5.8 1 1.2 1.6.4-.6.8-1.1 1.2-1.6C14.4 5.5 16 4.5 18 4.5c3.6 0 5.5 3.4 4 6.7-2.5 4.7-10 9.3-10 9.3z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                        </svg>
                        {productIds.length > 0 && (
                            <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center px-1">
                                {productIds.length}
                            </Badge>
                        )}
                    </Link>

                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Buka keranjang"
                        onClick={onCartClick}
                        className="relative"
                    >
                        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                            <path 
                                d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-1.5 6h13M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        {totalItems > 0 && (
                            <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center px-1">
                                {totalItems}
                            </Badge>
                        )}
                    </Button>
                </div>

                <div className="md:hidden">
                    <SearchBar onSearch={(q) => onSearch?.(q)}/>
                </div>
                <nav className="flex gap-4 overflow-x-auto text-sm">
                    {categories.map((c) => (
                        <Link
                            key={c.slug}
                            href={`/category/${c.slug}`}
                            className="shrink-0 text-neutral-600 hover:text-neutral-900"
                        >
                            {c.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    )
}