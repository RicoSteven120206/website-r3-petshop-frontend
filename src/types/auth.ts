export type Role = "customer" | "admin";

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
}

export interface Session {
    userId: string;
    name: string;
    role: Role;
}