"use client"

import React from "react";
import { Rating, Text } from "@/src/components/atoms/Index";
import { EmptyState } from "../molecules/EmptyState";
import { ReviewItem } from "@/src/components/molecules/ReviewItem";
import { Review } from "@/src/lib/types";

export interface ReviewListProps {
    reviews: Review[];
}

export function ReviewList({
    reviews
}: ReviewListProps) {
    if (reviews.length === 0) {
        return <EmptyState title="Belum ada ulasan" description="Jadilah yang pertama memberi ulasan produk ini"/>
    }

    const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    return (
        <div>
            <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                <Text size="lg" weight="semibold">
                    {average.toFixed(1)}
                </Text>
                <div>
                    <Rating value={average} size="md"/>
                    <Text size="xs" tone="muted">
                        Berdasarkan {reviews.length} ulasan
                    </Text>
                </div>
            </div>
            <div className="divide-y divide-neutral-100">
                {reviews.map((review) => (
                    <ReviewItem key={review.id} review={review}/>
                ))}
            </div>
        </div>
    );
}