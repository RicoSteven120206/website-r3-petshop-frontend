"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authService } from "@/src/services/auth.service";
function safeNext(fallback: string) {
    const next = new URLSearchParams(window.location.search).get("next");
    return next && next.startsWith("/") && !next.startsWith("//") ? next : fallback;
}

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const { user } = await authService.login(email, password);
            router.replace(user.role === "admin" ? "/admin" : safeNext("/akun"));
            router.refresh();
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-3 py-10">
            <h1 className="text-2xl font-bold">Masuk</h1>
            {error && <p className="text-red-600">{error}</p>}
            <input 
                type="email" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2"
                required
            />
            <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2"
                required
            />
            <button disabled={loading} className="w-full bg-black p-2 text-white">
                {loading ? "Memproses..." : "Masuk"}
            </button>
            <p>Belum punya akun? <Link href="/register" className="underline">Daftar</Link></p>
        </form>
    )
}