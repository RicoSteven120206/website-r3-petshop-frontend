import React from "react";
import Image from "next/image";

interface ProductCardProps {
    titleName: string,
    weightProduct: number,
    priceProduct: number,
    imageSrc: string,
    altText?: string,
    rating?: number,
}

function ProductCard({
    titleName,
    weightProduct = 0,
    priceProduct = 0,
    imageSrc,
    rating = 5,
    altText = "gambar product",
    ...rest
}: ProductCardProps) {
    return (
        <div className="flex flex-col rounded-xl w-60 h-100 border shadow-[4px_4px_10px_rgba(0,0,0,0.1)] outline-none border-none">
           <Image
                src={imageSrc}
                alt={altText}
                width={100}
                height={100}
                className="w-full rounded-tl-xl rounded-tr-xl"
           />
           <div className="p-2">
                <div className="flex flex-row gap-1">
                    {[...Array(rating)].map((_, index) => (
                        <Image 
                            key={index}
                            src="/start_rating.svg"
                            alt="rating"
                            width={14}
                            height={14}
                        />
                    ))}
                    <h1 className="text-[13px] pl-1 pt-1">{rating}</h1>
                </div>
                <h1 className="font-bold text-xl">{titleName}</h1>
                <p>{weightProduct}gr</p>
                <p className="font-bold text-lg pt-2">Rp. {priceProduct},-</p>
           </div>
        </div>
    );
}

export default ProductCard;