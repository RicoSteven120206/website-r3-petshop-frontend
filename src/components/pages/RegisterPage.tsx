import { Metadata } from "next";
import { AuthTemplate } from "../templates/AuthTemplate";
import { RegisterForm } from "../organisms/RegisterForm";

export const metadata: Metadata = {
    title: "Daftar - R3 Petshop",
    description: "Buat akun baru di R3 Petshop",
};

export default function RegisterPage() {
    return (
        <AuthTemplate
            imagePosition="right"
            imageUrl="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop"
        >
            <RegisterForm />
        </AuthTemplate>
    );
} 