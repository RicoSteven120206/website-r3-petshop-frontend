"use client";

import React from "react";
import { Checkbox, Heading, Input, Label, Text } from "@/src/components/atoms/Index";
import { categories } from "@/src/lib/data/categories";

export interface PriceRange {
    min?: number;
    max?: number;
}

export interface FilterSidebarProps {
    selectedCategories: string[];
    onCategoriesChange: (categories: string[]) => void;
    priceRange: PriceRange;
    onPriceRangeChange: (range: PriceRange) => void;
    onClear: () => void;
}

export function FilterSidebar({
    selectedCategories,
    onCategoriesChange,
    priceRange,
    onPriceRangeChange,
    onClear
}: FilterSidebarProps) {
    function toggleCategory(slug: string) {
        onCategoriesChange(
            selectedCategories.includes(slug)
                ? selectedCategories.filter((s) => s !== slug)
                : [...selectedCategories, slug]
        );
    }

    return (
        <aside className="w-full space-y-6 md:w-56">
            <div className="flex items-center justify-between">
                <Heading level={6}>Filter</Heading>
                <button type="button" onClick={onClear} className="text-xs text-neutral-500 underline hover:text-neutral-900">
                    Reset
                </button>
            </div>

            <div className="space-y-3">
                <Text size="sm" weight="medium">
                    Kategori
                </Text>
                <div className="space-y-2">
                    {categories.map((c) => (
                        <div key={c.slug} className="flex items-center gap-2">
                            <Checkbox 
                                id={`filter-${c.slug}`}
                                checked={selectedCategories.includes(c.slug)}
                                onChange={() => toggleCategory(c.slug)}
                            />
                            <Label htmlFor={`filter-${c.slug}`} className="font-normal">
                                {c.name}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <Text size="sm" weight="medium">
                    Rentang harga
                </Text>
                <div className="flex items-center gap-2">
                    <Input 
                        type="number"
                        placeholder="min"
                        value={priceRange.min ?? ""}
                        onChange={(e) => 
                            onPriceRangeChange({ ...priceRange, min: e.target.value ? Number(e.target.value) : undefined })
                        }
                    />
                    <span className="text-neutral-400">-</span>
                    <Input 
                        type="number"
                        placeholder="max"
                        value={priceRange.max ?? ""}
                        onChange={(e) => 
                            onPriceRangeChange({ ...priceRange, max: e.target.value ? Number(e.target.value) : undefined })
                        }
                    />
                </div>
            </div>
        </aside>
    )
}