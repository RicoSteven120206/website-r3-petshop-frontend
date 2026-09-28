"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../atoms/Button";
import { SearchBar } from "../molecules/SearchBar";

export interface HeaderDashboardProps {
    onSearch: (query: string) => void;
    onCartClick?: () => void;
    onProfileCheck?: () => void;
    onContactUsClick?: () => void;
}

export function HeaderDashboard({
    onSearch,
    onCartClick,
    onProfileCheck,
    onContactUsClick
}: HeaderDashboardProps) {
    return (
        <header className="flex min-h-full flex-row items-center justify-between space-x-20 bg-pink-50 p-4">
            <Image 
                src="/logo-r3-petshop.svg"
                alt="Logo Profile R3 Petshop"
                width={75}
                height={75}
            />

            <SearchBar onSearch={onSearch} className="flex-1" />

            <Button type="button" onClick={onProfileCheck} aria-label="Profile saya">
                <Image  
                    src="/person.svg"
                    alt="profile"
                    width={25}
                    height={25}
                />
            </Button>

            <Button type="button" onClick={onCartClick} aria-label="Buka keranjang">
                <Image 
                    src="/shopping_cart.svg"
                    alt="shopping cart"
                    width={25}
                    height={25}
                />
            </Button>

            <Button variant="brand" size="md" onClick={onContactUsClick}>
                Contact Us
            </Button>
        </header>
    );
}