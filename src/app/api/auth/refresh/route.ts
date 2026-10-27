import { encode, getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const CONNECT_TOKEN_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/connect/token`;
const SESSION_COOKIE = process.env.NEXTAUTH_URL?.startsWith("https")
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";
// Giống NextAuth: 4096 (giới hạn cookie) - 163 (ước lượng phần name/attributes)
const CHUNK_SIZE = 4096 - 163;
const SESSION_MAX_AGE = 30 * 24 * 60 * 60;

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
        maxAge: SESSION_MAX_AGE,
    });

    const res = NextResponse.json({ ok: true });
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NEXTAUTH_URL?.startsWith("https"),
        sameSite: "lax" as const,
        path: "/",
    };

    // NextAuth tách session cookie thành nhiều chunk (.0, .1, ...) khi vượt ~4KB.
    // Phải xóa toàn bộ cookie cũ rồi ghi lại theo đúng format chunk, nếu không
    // getToken() sẽ ghép lẫn cookie cũ + mới -> decode lỗi -> token = null.
    const chunkCount = Math.ceil(newSessionToken.length / CHUNK_SIZE);
    const newNames = chunkCount === 1
        ? [SESSION_COOKIE]
        : Array.from({ length: chunkCount }, (_, i) => `${SESSION_COOKIE}.${i}`);

    for (const { name } of req.cookies.getAll()) {
        if (name.startsWith(SESSION_COOKIE) && !newNames.includes(name)) {
            res.cookies.set(name, "", { ...cookieOptions, maxAge: 0 });
        }
    }

    newNames.forEach((name, i) => {
        res.cookies.set(name, newSessionToken.substring(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE), {
            ...cookieOptions,
            maxAge: SESSION_MAX_AGE,
        });
    });

    return res;
}
