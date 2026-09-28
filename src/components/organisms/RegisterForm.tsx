"use client";

import React from "react";
import Link from "next/link";
import { Button, Text } from "@/src/components/atoms/Index";
import { Card } from "../molecules/Card";
import { FormField } from "../molecules/FormField";
import { useAuth } from "@/src/lib/auth-context";

export function RegisterForm() {
    const { register } = useAuth();

    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
    const [globalError, setGlobalError] = React.useState<string>("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setGlobalError("");
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        const name = String(formData.get("name") ?? "");
        const email = String(formData.get("email") ?? "");
        const phone = String(formData.get("phone") ?? "");
        const password = String(formData.get("password") ?? "");

        try {
            await register(name, email, phone, password);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setGlobalError(error.message);
            } else {
                setGlobalError("Terjadi kesalahan sistem yang tidak diketahui.");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Card className="w-full max-w-sm shadow-xl border-neutral-100">
            <Card.Header>
                <Card.Title>Buat Akun Baru</Card.Title>
                <Card.Description>Lengkapi data diri kamu untuk mulai berbelanja.</Card.Description>
            </Card.Header>

            <form onSubmit={handleSubmit}>
                <Card.Content className="space-y-4">
                    {globalError && (
                        <div className="p-3 rounded-md bg-red-50 border-red-100">
                            <Text size="sm" tone="danger" className="font-medium">
                                {globalError}
                            </Text>
                        </div>
                    )}

                    <FormField 
                        name="name"
                        label="Nama Lengkap"
                        type="text"
                        placeholder="John Doe"
                        required
                    />
                    <FormField 
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="anda@example.com"
                        required
                    />
                    <FormField 
                        name="phone"
                        label="Nomor Telepon"
                        type="tel"
                        placeholder="081234567890"
                        required
                    />
                    <FormField 
                        name="password"
                        label="Kata Sandi"
                        type="password"
                        placeholder="••••••••"
                        required
                    />
                </Card.Content>

                <Card.Footer className="flex-col items-stretch gap-4 pt-4">
                    <Button type="submit" isLoading={isSubmitting} className="w-full">
                        Daftar Sekarang
                    </Button>
                    <Text size="sm" tone="muted" className="text-center">
                        Sudah punya akun? {" "}
                        <Link href="/login" className="font-medium text-[#DF1D3D] hover:text-[#CD0022] hover:underline transition-colors">
                            Masuk
                        </Link>
                    </Text>
                </Card.Footer>
            </form>
        </Card>
    )
}