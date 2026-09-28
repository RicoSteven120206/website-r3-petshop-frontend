"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";

export type Role = "admin" | "customer"; 

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: Role;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, phone: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<User | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const router = useRouter();

    React.useEffect(() => {
        const storedUser = localStorage.getItem("user_session");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const data = await authService.login({ email, password });

            const userData: User = data.user;
            setUser(userData);
            localStorage.setItem("user_session", JSON.stringify(data.user));
            localStorage.setItem("auth_token", data.token);

            if (userData.role === "admin") {
                router.push("/admin/dashboard");
            } else {
                router.push("/");
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const errMessage = error.response?.data?.message || "Terjadi kesalahan saat login";
                throw new Error(errMessage);
            } else if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("Terjadi kesalahan saat login");
            }
        }
    };

    const register = async (name: string, email: string, password: string, phone: string) => {
        try {
            const data = await authService.register({ name, email, password, phone });

            const userData: User = data.user;
            setUser(userData);
            localStorage.setItem("user_session", JSON.stringify(userData));
            localStorage.setItem("auth_token", data.token);

            router.push("/login");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const errMessage = error.response?.data?.message || "Terjadi kesalahan saat register";
                throw new Error(errMessage);
            } else if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("Terjadi kesalahan saat register");
            }
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user_session");
        localStorage.removeItem("auth_token");
        router.push("login");
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = React.useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used in <AuthProvider>");
    return ctx;
};