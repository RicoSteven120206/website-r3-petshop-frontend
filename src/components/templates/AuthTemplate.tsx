// "use client";

// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { cn } from "@/src/lib/cn";

// interface AuthTemplateProps {
//     title: string;
//     subtitle: string;
//     children: React.ReactNode;
//     alternativeLinkText: string;
//     alternativeLinkUrl: string;
//     alternativeLinkLabel: string;
//     imageUrl?: string;
//     imagePosition?: "left" | "right";
// }

// export function AuthTemplate({
//     title,
//     subtitle,
//     children,
//     alternativeLinkText,
//     alternativeLinkUrl,
//     alternativeLinkLabel,
//     imageUrl,
//     imagePosition,
// }: AuthTemplateProps) {
//     const layoutClass = imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row";

//     return (
//         <div className={`flex min-h-screen w-full bg-white ${layoutClass}`}>
//             <div className="relative hidden lg:flex lg:w-1/2 bg-neutral-100 overflow-hidden">
//                 <img
//                     src={imageUrl}
//                     alt="Authentication Background"
//                     className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"/>

//                 <div className="absolute bottom-12 left-12 right-12 text-white">
//                     <h2 className="text-3xl font-bold mb-2">R3 Petshop</h2>
//                     <p className="text-white/80 text-lg">Tempat terbaik untuk memenuhi semua kebutuhan anabul kesayangan anda.</p>
//                 </div>
//             </div>

//             <div className="flex w-full lg:w-1/2 items-center justify-center p-8 sm:p-12">
//                 <div className=" w-full max-w-md">
//                     <div className="mb-8">
//                         <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">{title}</h1>
//                         <p className="text-base text-neutral-500 mt-2">{subtitle}</p>
//                     </div>
//                     {children}
//                     <div className="mt-8 text-center text-sm text-neutral-600">
//                         {alternativeLinkText}{" "}
//                         <Link
//                             href={alternativeLinkUrl}
//                             className="font-semibold text-[#DF1D3D] hover:text-[#CD0022] hover:underline transition-colors"
//                         >
//                         {alternativeLinkLabel}</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

import React from "react";

interface AuthTemplateProps {
  children: React.ReactNode;
  imageUrl: string;
  imagePosition?: "left" | "right";
}

export function AuthTemplate({ 
  children, 
  imageUrl,
  imagePosition = "left" 
}: AuthTemplateProps) {
  
  // Logika posisi gambar
  const layoutClass = imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row";

  return (
    <div className={`flex min-h-screen w-full bg-neutral-50 ${layoutClass}`}>
      
      {/* BAGIAN GAMBAR (Hidden di HP) */}
      <div className="relative hidden lg:flex lg:w-1/2 bg-neutral-200 overflow-hidden">
        <img 
          src={imageUrl} 
          alt="Authentication Background" 
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h2 className="text-3xl font-bold mb-2">R3 Petshop</h2>
          <p className="text-white/80 text-lg">Tempat terbaik untuk memenuhi semua kebutuhan sahabat bulu kesayangan Anda.</p>
        </div>
      </div>

      {/* BAGIAN FORM CARD */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12">
        {/* Komponen <LoginForm> (yang berupa Card) akan dirender di sini */}
        {children}
      </div>

    </div>
  );
}