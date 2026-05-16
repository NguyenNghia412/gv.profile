import { encode, getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const CONNECT_TOKEN_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/connect/token`;
const SESSION_COOKIE = process.env.NEXTAUTH_URL?.startsWith("https")
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";

export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! });

    if (!token?.refresh_token) {
        return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    const response = await fetch(CONNECT_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: token.refresh_token as string,
            client_id: process.env.AUTH_CLIENT_ID!,
            client_secret: process.env.AUTH_CLIENT_SECRET!,
        }).toString(),
    });

    if (!response.ok) {
        return NextResponse.json({ error: "Refresh failed" }, { status: 401 });
    }

    const newTokens = await response.json();

    const newSessionToken = await encode({
        token: {
            ...token,
            access_token: newTokens.access_token,
            refresh_token: newTokens.refresh_token ?? token.refresh_token,
        },
        secret: process.env.NEXTAUTH_SECRET!,
        maxAge: 30 * 24 * 60 * 60,
    });

    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, newSessionToken, {
        httpOnly: true,
        secure: process.env.NEXTAUTH_URL?.startsWith("https"),
        sameSite: "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
    });

    return res;
}
