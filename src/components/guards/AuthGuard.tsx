"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth, Role } from "@/src/lib/auth-context";

interface AuthGuardProps {
    children: React.ReactNode;
    allowedRoles?: Role[];
}

export function AuthGuard({
    children,
    allowedRoles
}: AuthGuardProps) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        if (!isLoading && !user) {
            router.replace("login");
        } else if (!isLoading && user && allowedRoles) {
            if (!allowedRoles.includes(user.role)) {
                router.replace(user.role === "admin" ? "/admin/dashboard" : "/");
            }
        }
    }, [user, isLoading, router, allowedRoles]);

    if (isLoading) {
        return (
            <div className="h-min-screen flex items-center justify-center bg-neutral-50">
                <div className="text-neutral-500 font-medium animate-pulse">Memverifikasi akses...</div>
            </div>
        );
    }

    if (!user) return null;

    if (allowedRoles && !allowedRoles.includes(user.role)) return null;

    return <>{children}</>;
}