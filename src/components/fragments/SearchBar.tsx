  
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const handleClick = () => {
        onSearch(query);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") onSearch(query);
    };

    return (
        <div className='flex max-h-lg w-full max-w-lg items-center rounded-full border-2 border-black bg-white overflow-hidden shadow-sm'>
            <Input 
                type='Text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Cari Makanan atau Mainan..."
                className='flex-1 px-6 py-3 text-gray-600 placeholder-gray-400 outline-none' 
            />
            <Button
                onClick={handleClick}
                className='flex items-center justify-center bg-[#DF1D3D] px-8 py-3 text-white transition-colors hover:bg-red-700'
                aria-label='Tombol Cari'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2.5}>
                        <path 
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                </svg>
            </Button>
        </div>
    );
}

export default SearchBar;