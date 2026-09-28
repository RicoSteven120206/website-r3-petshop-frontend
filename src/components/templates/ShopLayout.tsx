"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Header, CartDrawer, Footer } from "@/src/components/organisms/Index";

export interface ShopLayoutProps {
    children: React.ReactNode;
}

export function ShopLayout({ children }: ShopLayoutProps) {
    const [cartOpen, setCartOpen] = React.useState(false);
    const router = useRouter();

    return (
        <div className="flex min-h-screen flex-col">
            <Header 
                onSearch={(q) => router.push(q ? `search?q=${encodeURIComponent(q)}` : "/")}
                onCartClick={() => setCartOpen(true)}
            />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
                {children}
            </main>
            <Footer />
            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)}/>
        </div>
    );
}