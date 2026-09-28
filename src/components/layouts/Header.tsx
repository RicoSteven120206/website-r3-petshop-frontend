"use client";
import Image from "next/image";
import Button from '../atoms/Button';
import SearchBar from '@/src/components//fragments/SearchBar';

export default function Header() {
    const handleSearch = (keyword: string) => {
        if (!keyword) alert ("Mohon isi kata kunci");
        alert (`Anda mencari: ${keyword}`);
    };

    const handleClickCart = () => {
        return (
            <div></div>
        )
    }

    const handleClickContactUs = () => {
        return (
            <div></div>
        )
    }
    
    const handleClickPerson = () => {
        return (
            <div></div>
        )
    }

    return (
        <header className='flex min-h-full flex-row justify-between items-center bg-pink-50 p-4 space-x-20'>
            <Image 
                src="/logo-r3-petshop.svg" 
                alt="Logo Profile R3 Petshop"
                width={75}
                height={75}
            />
            <SearchBar onSearch={handleSearch} />
            <Image 
                src="/person.svg"
                alt="profile"
                width={25}
                height={25}
                onClick={handleClickPerson}
            />
            <Image
                src="/shopping_cart.svg"
                alt="shopping cart"
                width={25}
                height={25}
                onClick={handleClickCart}
            />
            <Button
                className="flex px-4 py-1.5 h-10 items-center justify-center bg-[#DF1D3D] focus:outline-none text-white rounded-full hover:bg-[#CD0022]"
              >Contact Us
            </Button>

        </header>
    );
}