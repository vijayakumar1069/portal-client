// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Define protected routes
  const protectedRoutes = ["/connect", "/logs", "/tickets"];

  // Define public routes that do not require token
  const publicRoutes = ["/signin", "/"];

  // Allow public routes without any check
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // If request is for protected route
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const token = req.cookies.get("access_token")?.value;

    // If token exists, allow request
    if (token) {
      return NextResponse.next();
    }

    // Otherwise redirect to /signin
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // For any other routes, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/connect/:path*", "/logs/:path*", "/tickets/:path*"],
};
