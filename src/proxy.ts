import { NextRequest, NextResponse } from "next/server";
import { verifySession, AUTH_COOKIE } from "./lib/session";

const CUSTOMER_ROUTES = ['/akun', '/keranjang', '/checkout', '/pesanan'];
const GUEST_ONLY_ROUTES = ['/login', '/register'];

const matches = (path: string, routes: string[]) => 
    routes.some((r) => path === r || path.startsWith(r + "/"));

export async function proxy(req: NextRequest) {
    const { pathname, search } = req.nextUrl;
    const session = await verifySession(req.cookies.get(AUTH_COOKIE)?.value);
    const go = (path: string) => NextResponse.redirect(new URL(path, req.url));
    const next = encodeURIComponent(pathname + search);

    if (pathname === "/admin/login") {
        return session?.role === "admin" ? go("/admin") : NextResponse.next();
    }

    if (matches(pathname, ["/admin"])) {
        if (!session) return go(`/admin/login?next=${next}`);
        if (session.role !== "admin") return go("/");
        return NextResponse.next();
    }

    if (matches(pathname, CUSTOMER_ROUTES)) {
        if (!session) return go(`/login?next=${next}`);
        if (session.role !== "customer") return go("/admin");
        return NextResponse.next();
    }

    if (matches(pathname, GUEST_ONLY_ROUTES) && session) {
        return go(session.role === "admin" ? "/admin" : "/akun");
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/akun/:path*",
        "/keranjang/:path*",
        "/checkout/:path*",
        "/pesanan/:path*",
        "/login",
        "/register",
    ],
};