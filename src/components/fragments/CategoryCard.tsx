import React from "react";
import Image from "next/image";

interface CategoryCardProps {
    title: string,
    imageSrc: string,
    altText?: string,
}

function CategoryCard({
    title,
    imageSrc,
    altText = "Gambar Kategori",
    ...rest
}: CategoryCardProps) {
    return (
        <div className="flex flex-col w-80 h-auto items-center justify-center rounded-lg border-none outline-none shadow-md">
            <Image  
                src={imageSrc}
                alt={altText}
                width={272}
                height={156}
                className="object-contain rounded-tl-lg rounded-tr-lg w-full"
            />
            <h1 
                className="font-bold py-2 text-lg"
            >{title}
            </h1>
        </div>
    )
}

export default CategoryCard;