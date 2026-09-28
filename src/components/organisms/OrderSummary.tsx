import React from "react";
import { Divider, Heading, Price, Text } from "@/src/components/atoms/Index";
import { useCart } from "@/src/lib/cart-context";

export interface OrderSummaryProps {
    shippingFee?: number;
}

export function OrderSummary({
    shippingFee = 0
}: OrderSummaryProps) {
    const { detailedLines, subtotal } = useCart();
    const total = subtotal + shippingFee;

    return (
        <div className="space-y-4 rounded-lg border border-neutral-200 p-5">
            <Heading level={5}>Ringkasan pesanan</Heading>

            <div className="space-y-2">
                {detailedLines.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center justify-between gap-2 text-sm">
                        <Text size="sm" className="line-clamp-1">
                            {product.name} <span className="text-neutral-400">x {quantity}</span>
                        </Text>
                        <Text size="sm" weight="medium">
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                maximumFractionDigits: 0,
                            }).format(product.price * quantity)}
                        </Text>
                    </div>
                ))}
            </div>

            <Divider />

            <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                    <Text size="sm" tone="muted">
                        Subtotal
                    </Text>
                    <Price value={subtotal}/>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <Text size="sm" tone="muted">
                        Ongkos kirim
                    </Text>
                    <Price value={shippingFee} size="sm"/>
                </div>
            </div>

            <Divider />

            <div className="flex items-center justify-between">
                <Text weight="semibold">Total</Text>
                <Price value={total} size="lg"/>
            </div>
        </div>
    );
}