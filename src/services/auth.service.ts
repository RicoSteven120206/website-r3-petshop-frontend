// import { apiClient } from "./axios-config";

// export interface LoginPayload {
//     email: string;
//     password: string;
// }

// export interface RegisterPayload {
//     name: string;
//     email: string;
//     password: string;
//     phone: string;
// }

// export const authService = {
//     login: async (data: LoginPayload) => {
//         const response = await apiClient.post("/login", {
//             email: data.email,
//             password: data.password,
//         });
//         return response.data;
//     },

//     register: async (data: RegisterPayload) => {
//         const response = await apiClient.post("register", {
//             name: data.name,
//             email: data.email,
//             password: data.password,
//             phone: data.phone,
//         });
//         return response.data;
//     },
// };

import type { User } from "../types/auth";

async function request<T>(url: string, body?: unknown): Promise<T> {
    const res = await fetch(url, {
        method: body === undefined ? "GET" : "POST",
        headers: { "Content-Type": "application/json" },
        body: body === undefined ? undefined : JSON.stringify(body),
        credentials: "include",
    });
    
    const data = res.status === 204 ? null : await res.json();
    if (!res.ok) throw new Error(data?.message ?? "Terjadi kesalahan");
    return data as T;
}

export const authService = {
    register: (name: string, email: string, password: string) => 
        request<{ user: User }>("/api/auth/register", { name, email, password }),
    login: (email: string, password: string) =>
        request<{ user: User }>("/api/auth/login", { email, password }),
    loginAdmin: (email: string, password: string) => 
        request<{ user: User }>("/api/auth/admin/login", { email, password }),
    logout: () => request<null>("/api/auth/logout", {}),
    me: () => request<{ user: User }>("/api/auth/me"),
};