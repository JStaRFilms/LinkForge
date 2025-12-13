import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { signCookie, verifyCookie } from "@/lib/cookie-utils";

// Cookie configuration constants
const COOKIE_USER_ID = "linkforge_user_id";
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const response = NextResponse.next();
    const existingCookie = request.cookies.get(COOKIE_USER_ID)?.value;

    // Check if we need to set a new cookie
    let needsNewCookie = false;

    if (!existingCookie) {
        needsNewCookie = true;
    } else {
        // Verify existing cookie signature
        const verifiedUserId = await verifyCookie(existingCookie);
        if (!verifiedUserId) {
            // Cookie was tampered with or invalid format - issue new one
            needsNewCookie = true;
        }
    }

    if (needsNewCookie) {
        const userId = crypto.randomUUID();
        const signedUserId = await signCookie(userId);
        response.cookies.set(COOKIE_USER_ID, signedUserId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: ONE_YEAR_IN_SECONDS,
            path: "/",
        });
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
