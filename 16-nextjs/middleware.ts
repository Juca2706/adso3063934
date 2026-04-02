// middleware.ts
import { stackServerApp } from "@/stack/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
    const user = await stackServerApp.getUser();
    const { pathname } = request.nextUrl;

    // 1. Si intenta entrar a CONFIGURACIÓN sin sesión, al login
    if (!user && pathname.includes('settings')) {
        return NextResponse.redirect(new URL(stackServerApp.urls.signIn, request.url));
    }

    // 2. Si intenta entrar a rutas de la APP sin sesión, al login
    if (!user) {
        return NextResponse.redirect(new URL(stackServerApp.urls.signIn, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/games/:path*',
        '/consoles/:path*',
        '/profile/:path*',
        '/handler/account-settings',
        '/handler/settings',
    ],
};