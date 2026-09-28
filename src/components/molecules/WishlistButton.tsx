"use client";

import React from "react";
import { cn } from "@/src/lib/cn";

export interface WishlistButtonProps {
  active: boolean;
  onToggle: () => void;
  className?: string;
}

export function WishlistButton({ active, onToggle, className }: WishlistButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      aria-label={active ? "Hapus dari wishlist" : "Tambah ke wishlist"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white transition-colors hover:border-neutral-300",
        className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className={cn("h-4.5 w-4.5 transition-colors", active ? "fill-red-500 text-red-500" : "fill-none text-neutral-500")}
      >
        <path
          d="M12 20.5s-7.5-4.6-10-9.3C.5 7.9 2.4 4.5 6 4.5c2 0 3.6 1 4.8 2.5.4.5.8 1 1.2 1.6.4-.6.8-1.1 1.2-1.6C14.4 5.5 16 4.5 18 4.5c3.6 0 5.5 3.4 4 6.7-2.5 4.7-10 9.3-10 9.3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}