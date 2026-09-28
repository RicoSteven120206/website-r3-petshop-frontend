import { jwtVerify } from "jose";
import type { Role, Session } from "../types/auth";

export const AUTH_COOKIE = "token";
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function verifySession(token?: string): Promise<Session | null> {
    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
        return {
            userId: String(payload.sub),
            name: String(payload.name),
            role: payload.role as Role,
        };
    } catch {
        return null;
    }
}