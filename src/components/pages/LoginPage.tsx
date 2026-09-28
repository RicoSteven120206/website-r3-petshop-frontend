"use client";

import { Metadata } from "next";
import { AuthTemplate } from "../templates/AuthTemplate";
import { LoginForm } from "../organisms/LoginForm";

export const metadata: Metadata =  {
    title: "Masuk - R3 Petshop",
    description: "Masuk ke akun R3 Petshop Anda",
};

export default function LoginPage() {
    return (
        <AuthTemplate 
            imagePosition="left"
            imageUrl="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop"
        >
            <LoginForm />
        </AuthTemplate>
    )
}