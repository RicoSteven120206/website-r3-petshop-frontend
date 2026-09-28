"use client";

import React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Button, Divider, Heading, Price, Text } from "@/src/components/atoms/Index";
import { CartItem } from "../molecules/CartItem";
import { useCart } from "@/src/lib/cart-context";
import { useLockBodyScroll } from "@/src/hooks/useLockBodyScroll";

export interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

export function CartDrawer({
    open,
    onClose
}: CartDrawerProps) {
    const { detailedLines, subtotal, updateQuantity, removeItem } = useCart();
    const [mounted, setMounted] = React.useState(false);

    useLockBodyScroll(open);
    React.useEffect(() => setMounted(true), []);

    React.useEffect(() => {
        if (!open) return;
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onClose();
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    if (!mounted || !open) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex justify-end">
            <div 
                aria-hidden="true"
                onClick={onClose}
                className="absolute inset-0 bg-black/50 animate-in fade-in duration-150"
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Keranjang belanja"
                className="relative z-10 flex h-full w-full max-w-sm flex-col bg-white shadow-xl animate-in slide-in-from-right duration-200"
            >
                <div className="flex items-center justify-between border-b border-neutral-200 p-4">
                    <Heading level={5}>Keranjang belanja</Heading>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup keranjang"
                        className="text-neutral-400 hover:text-neutral-900"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4">
                    {detailedLines.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                            <Text tone="muted">Keranjang kami masih kosong.</Text>
                            <Button variant="outline" size="sm" onClick={onClose}>
                                Mulai belanja
                            </Button>
                        </div>
                    ) : (
                        <div className="divide-y divide-neutral-100">
                            {detailedLines.map(({ product, quantity }) => (
                                <CartItem 
                                    key={product.id}
                                    product={product}
                                    quantity={quantity}
                                    onQuantityChange={(q) => updateQuantity(product.id, q)}
                                    onRemove={() => removeItem(product.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {detailedLines.length > 0 && (
                    <div className="space-y-3 border-t border-neutral-200 p-4">
                        <div className="flex items-center justify-between">
                            <Text weight="medium">Subtotal</Text>
                            <Price value={subtotal} size="md"/>
                        </div>
                        <Divider />
                        <Link
                            href="/checkout"
                            className="block"
                        >
                            <Button variant="primary" className="w-full" onClick={onClose}>
                                Checkout
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
}