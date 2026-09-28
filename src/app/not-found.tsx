"use client";

import { useRouter } from "next/navigation";
import { EmptyState } from "@/src/components/molecules/EmptyState";
import { ShopLayout } from "@/src/components/templates/ShopLayout";

export default function ProductNotFound() {
    const router = useRouter();

    return (
        <ShopLayout>
            <EmptyState 
                icon="🐾"
                title="Produk tidak ditemukan"
                description="Produk yang kamu cari mungkin sudah tidak tersedia atau salah tautan."
                actionLabel="Kembali ke beranda"
                onAction={() => router.push("/")}
            />
        </ShopLayout>
    )
}