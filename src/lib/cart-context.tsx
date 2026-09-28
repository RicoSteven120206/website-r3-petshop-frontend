"use client";

import React from "react";
import { CartLine, Product } from "@/src/lib/types";
import { products } from "@/src/lib/data/products";

interface CartContextValue {
    lines: CartLine[];
    addItem: (productId: string, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clear: () => void;
    totalItems: number;
    subtotal: number;
    detailedLines: { 
        product: Product; 
        quantity: number
    }[];
}

const CartContext = React.createContext<CartContextValue | null>(null);
const STORAGE_KEY = "petshop:cart";

export function CartProvider({ 
    children 
}: {children: React.ReactNode}) {
    const [lines, setLines] = React.useState<CartLine[]>([]);
    const [hydrated, setHydrated] = React.useState(false);

    React.useEffect(() => {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (raw) {
                setLines(JSON.parse(raw));
            } 
        } catch {
                
        } finally {
            setHydrated(true);
        }
    }, []);

    React.useEffect(() => {
        if (!hydrated) return;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    }, [lines, hydrated]);

    const addItem = React.useCallback((productId: string, quantity = 1) => {
        setLines((prev) => {
            const existing = prev.find((l) => l.productId === productId);
            if (existing) {
                return prev.map((l) => 
                    l.productId === productId ? {...l, quantity: l.quantity + quantity} : l
                )
            }

            return [...prev, { productId, quantity }];
        });
    }, []);

    const removeItem = React.useCallback((productId: string) => {
        setLines((prev) => prev.filter((l) => l.productId !== productId));
    }, []);

    const updateQuantity = React.useCallback(( productId: string, quantity: number ) =>{
        setLines((prev) =>
            quantity <= 0
                ? prev.filter((l) => l.productId !== productId)
                : prev.map((l) => (l.productId === productId ? { ...l, quantity } : l))
        );
    }, []);

    const clear = React.useCallback(() => setLines([]), []);

    const detailedLines = React.useMemo(
        () => 
            lines.map((line) => {
                const product = products.find((p) => p.id === line.productId);
                return product ? { 
                    product, 
                    quantity: line.quantity 
                } : null;
            })
            .filter((v): v is { 
                product: Product;
                quantity: number
            } => v !== null),
        [lines]
    );

    const totalItems = lines.reduce((sum, l) => sum + l.quantity, 0);
    const subtotal = detailedLines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);

    const value: CartContextValue = {
        lines,
        addItem,
        removeItem,
        updateQuantity,
        clear,
        totalItems,
        subtotal,
        detailedLines,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
    const ctx = React.useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within <CartProvider>");
    return ctx;
}