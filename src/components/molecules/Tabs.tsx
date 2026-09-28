"use client";

import React from "react";
import { cn } from "@/src/lib/cn";

export interface TabItem {
    value: string;
    label: string;
    content: React.ReactNode;
}

export interface TabsProps {
    items: TabItem[];
    defaultValue?: string;
    className?: string;
}

export function Tabs({
    items,
    defaultValue,
    className
}: TabsProps) {
    const [active, setActive] = React.useState(defaultValue ?? items[0]?.value);
    const activeItem = items.find((i) => i.value === active);

    return (
        <div className={className}>
            <div role="tablist" className="flex gap-6 border-b border-neutral-200">
                {items.map((item) => (
                    <button
                        key={item.value}
                        role="tab"
                        type="button"
                        aria-selected={item.value === active}
                        onClick={() => setActive(item.value)}
                        className={cn(
                            "-mb-px border-b-2 pb-3 text-sm font-medium transition-colors",
                            item.value === active
                                ? "border-neutral-900 text-neutral-900"
                                : "border-transparent text-neutral-500 hover:text-neutral-900"
                        )}
                    >
                        {item.label}
                    </button>
                ))}
                <div role="tabpanel" className="pt-4">
                    {activeItem?.content}
                </div>
            </div>
        </div>
    );
}