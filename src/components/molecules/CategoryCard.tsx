import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heading } from "../atoms/Heading";
import { Category } from "@/src/lib/types";

export interface CategoryCardProps {
    category: Category;
}

export function CategoryCard({
    category
}: CategoryCardProps) {
    return (
        <Link href={`/kategori-${category.slug}`}>
            <div className="flex h-auto w-80 flex-col items-center justify-center rouneded-lg border-none shadow-md outline-none">
                <Image 
                    src={category.image}
                    alt={category.name}
                    width={272}
                    height={156}
                    className="w-full rounded-tl-lg rounded-tr-lg object-contain"
                />
                <Heading level={3} className="py-2 text-lg">
                    {category.name}
                </Heading>
            </div>
        </Link>
    )
}