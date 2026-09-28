import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession, AUTH_COOKIE } from "./session";
import type { Role } from "../types/auth";

export async function getSession() {
    const store = await cookies();
    return verifySession(store.get(AUTH_COOKIE)?.value);
}

export async function requireRole(role: Role, loginPath: string) {
    const session = await getSession();
    if (!session) redirect(loginPath);
    if (session.role !== role) redirect(session.role === "admin" ? "/admin" : "/");
    return session;
}