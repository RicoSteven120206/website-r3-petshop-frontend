import React from "react";
import Image from "next/image";
import { Button, Heading } from "@/src/components/atoms/Index";

export interface PromoBannerProps {
    onCtaClick?: () => void;
}

const marketplace = [
    { src: "/logo-shopee.svg", alt: "logo shopee" },
    { src: "/logo-tokopedia.svg", alt: "logo tokopedia" },
    { src: "/logo-tiktokshop.svg", alt: "logo tiktokshop" },
];

export function PromoBanner({
    onCtaClick
}: PromoBannerProps) {
    return (
        <>
            <div className="relative flex items-center justify-center">
                <Image 
                    src="/banner-dashboard.svg"
                    alt="Banner promosi R3 Petshop"
                    width={1200}
                    height={400}
                    className="w-full"
                />
                <Button
                    variant="brand"
                    size="lg"
                    onClick={onCtaClick}
                    className="absolute bottom-60 flex h-13 w-60 items-center justify-center"
                >
                    Belanja Sekarang
                </Button>
            </div>

            <div className="flex flex-col items-center justify-center bg-gray-100 p-10">
                <Heading level={2} className="text-xl">
                    Tersedia di
                </Heading>
                <div className="flex flex-row items-center justify-center space-x-40">
                    {marketplace.map((m) => (
                        <Image 
                            key={m.alt}
                            src={m.src}
                            alt={m.alt}
                            loading="lazy"
                            width={200}
                            height={200}
                            className="mb-4"
                        />
                    ))}
                </div>
            </div>
        </>
    );
}