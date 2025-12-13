import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Cookie configuration constants
const COOKIE_USER_ID = "linkforge_user_id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export function middleware(request: NextRequest): NextResponse {
    const response = NextResponse.next();

    // Ensure user ID cookie exists for session tracking
    if (!request.cookies.has(COOKIE_USER_ID)) {
        const userId = crypto.randomUUID();
        response.cookies.set(COOKIE_USER_ID, userId, {
            httpOnly: true,
            secure: true, // Always secure (modern browsers handle correctly)
            sameSite: "lax",
            maxAge: COOKIE_MAX_AGE,
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
