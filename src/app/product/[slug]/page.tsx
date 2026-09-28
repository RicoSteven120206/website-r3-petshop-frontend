"use client";

import React from "react";
import { notFound, useParams } from "next/navigation";
import { Badge, Button, Divider, Heading, Price, Rating, Text } from "@/src/components/atoms/Index";
import { QuantitySelector } from "@/src/components/molecules/QuantitySelector";
import { Tabs } from "@/src/components/molecules/Tabs";
import { WishlistButton } from "@/src/components/molecules/WishlistButton";
import { ProductGrid } from "@/src/components/organisms/ProductGrid";
import { ReviewList } from "@/src/components/organisms/ReviewList";
import { ShopLayout } from "@/src/components/templates/ShopLayout";
import { getProductBySlug, getProductsByCategory } from "@/src/lib/data/products";
import { getReviewsByProduct } from "@/src/lib/data/reviews";
import { useCart } from "@/src/lib/cart-context";
import { useWishlist } from "@/src/lib/wishlist-context";

export default function ProductDetailPage() {
    const params = useParams<{ slug: string }>();
    const product = getProductBySlug(params.slug);
    const { addItem } = useCart();
    const { isWishlisted, toggleWishlist } = useWishlist();
    const [quantity, setQuantity] = React.useState(1);

    if (!product) return notFound();

    const related = getProductsByCategory(product.categorySlug).filter((p) => p.id !== product.id);
    const reviews = getReviewsByProduct(product.id);

    return (
        <ShopLayout>
            <div className="grid gap-8 md:grid-cols-2">
                <div className="aspect-square overflow-hidden rounded-lg bg-neutral-100">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-start justify-between gap-3">
                            <Heading level={2}>{product.name}</Heading>
                            <WishlistButton 
                                active={isWishlisted(product.id)}
                                onToggle={() => toggleWishlist(product.id)}
                            />
                        </div>
                        <Rating value={product.rating} count={product.reviewCount} size="md"/>
                    </div>
                    <Price value={product.price} compareAtValue={product.compareAtPrice} size="lg"/>
                    <Divider />

                    <Text tone="muted">{product.description}</Text>

                    <div className="flex items-center gap-2">
                        <Badge variant={product.stock > 0 ? "success" : "danger"}>
                            {product.stock > 0 ? `Stok: ${product.stock}` : "Stok habis"}
                        </Badge>
                        {product.tags?.map((tag) => (
                            <Badge key={tag} variant="outline">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <Divider />

                    <div className="flex items-center gap-3">
                        <QuantitySelector 
                            value={quantity}
                            onChange={setQuantity}
                            max={product.stock}
                        />
                        <Button
                            variant="primary"
                            size="lg"
                            className="flex-1"
                            disabled={product.stock <= 0}
                            onClick={() => addItem(product.id, quantity)}
                        >
                            Tambah ke keranjang
                        </Button>
                    </div>
                </div>
            </div>

            <section className="mt-12">
                <Tabs 
                    items={[
                        {
                            value: "deskrisi",
                            label: "Deskripsi",
                            content: <Text tone="muted">{product.description}</Text>
                        },
                        {
                            value: "ulasan",
                            label: `Ulasan (${reviews.length})`,
                            content: <ReviewList reviews={reviews}/>
                        },
                    ]}
                />
            </section>

            {related.length > 0 && (
                <section className="mt-14">
                    <Heading level={3} className="mb-4">
                        Product terkait
                    </Heading>
                    <ProductGrid products={related}/>
                </section>
            )}
        </ShopLayout>
    );
}