import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Add request ID for debugging
  const requestId = crypto.randomUUID();
  response.headers.set("X-Request-Id", requestId);

  // Bot protection — block suspicious crawlers
  const userAgent = request.headers.get("user-agent") || "";
  const blockedBots = /semrush|ahrefs|mj12bot|dotbot|blexbot|seokicks/i;
  if (blockedBots.test(userAgent)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // Prevent clickjacking on sensitive pages
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/auth") || pathname.startsWith("/dashboard")) {
    response.headers.set("X-Frame-Options", "DENY");
  }

  // Add no-cache for API routes
  if (pathname.startsWith("/api")) {
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    response.headers.set("Pragma", "no-cache");
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)",
  ],
};
