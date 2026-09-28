"use client";

import React from "react";
import { Button, Checkbox, Label, Text } from "@/src/components/atoms/Index";
import { Card } from "@/src/components/molecules/Card";
import { FormField } from "@/src/components/molecules/FormField";
import { useAuth } from "@/src/lib/auth-context";
import Link from "next/link";

export interface LoginFormValues {
    email: string;
    password: string;
    remember: boolean;
}

export interface LoginFormProps {
    // onSubmit: (values: LoginFormValues) => void | Promise<void>;
    errors?: Partial<Record<"email" | "password", string>>;
}

export function LoginForm({
    errors
}: LoginFormProps) {
    const { login } = useAuth();

    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
    const [globalError, setGlobalError] = React.useState<string>("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setGlobalError("");
        setIsSubmitting(true);

        const email = String(formData.get("email") ?? "");
        const password = String(formData.get("password") ?? "");

        try {
            await login(email, password);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setGlobalError(error.message);
            } else {
                setGlobalError("terjadi kesalahan sistem yang tidak diketahui.");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Card className="w-full max-w-sm shadow-xl border-neutral-100">
            <Card.Header>
                <Card.Title>Masuk ke akun</Card.Title>
                <Card.Description>Gunakan email dan kata sandi kamu.</Card.Description>
            </Card.Header>

            <form onSubmit={handleSubmit}>
                <Card.Content className="space-y-4">
                    {globalError && (
                        <div className="p-3 rounded-md bg-red-50 border border-red-100">
                            <Text size="sm" tone="danger" className="font-medium">
                                {globalError}
                            </Text>
                        </div>
                    )}
                    <FormField 
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="anda@example.com"
                        required
                        error={errors?.email}
                    />
                    <FormField 
                        name="password"
                        label="Kata Sandi"
                        type="password"
                        placeholder="••••••••"
                        required
                        error={errors?.password}
                    />
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" name="remember"/>
                        <Label htmlFor="remember">Ingat saya</Label>
                    </div>
                </Card.Content>

                <Card.Footer className="flex-col items-stretch gap-3 pt-4">
                    <Button type="submit" isLoading={isSubmitting} className="w-full">
                        Masuk
                    </Button>
                    <Text size="sm" tone="muted" className="text-center">
                        Belum punya akun? {" "}
                        <Link href="/register" className="font-medium text-[#DF1D3D] hover:text-[#CD0022] hover:underline transition-colors">
                        Daftar</Link>
                    </Text>
                </Card.Footer>
            </form>
        </Card>
    );
}