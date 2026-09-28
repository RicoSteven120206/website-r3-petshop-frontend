"use client";

import React from "react";
import { Avatar, Rating, Text } from "@/src/components/atoms/Index";
import { Review } from "@/src/lib/types";

export interface ReviewItemProps {
    review: Review;
}

export function ReviewItem({
    review
}: ReviewItemProps) {
    return (
        <div className="flex gap-3 py-2">
            <Avatar fallback={review.authorName.slice(0, 2).toUpperCase()} size="sm"/>
            <div className="flex-1 spcae-y-1">
                <div className="flex items-center justify-between gap-2">
                    <Text weight="medium" size="sm">
                        {review.authorName}
                    </Text>
                    <Text size="xs" tone="muted">
                        {review.date}
                    </Text>
                </div>
                <Rating value={review.rating} size="sm"/>
                <Text size="sm" tone="muted">
                    {review.comment}
                </Text>
            </div>
        </div>
    );
}