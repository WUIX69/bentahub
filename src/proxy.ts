import { NextRequest, NextResponse } from "next/server"

// ---------------------------------------------------------------------------
// Route classification
// ---------------------------------------------------------------------------

const PROTECTED_PREFIXES = ["/admin", "/cashier", "/staff", "/customer", "/dashboard"]

/** Auth API routes that should always pass through without token checks. */
const AUTH_API_ROUTES = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/verify-email",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
]

// Cookie name must match the value used in cookie-utils.ts
const AUTH_COOKIE = "auth_token"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}

function isPublicAuthApi(pathname: string): boolean {
  return AUTH_API_ROUTES.some((route) => pathname.startsWith(route))
}

// ---------------------------------------------------------------------------
// Proxy (Edge Interceptor)
// ---------------------------------------------------------------------------

/**
 * Next.js proxy (formerly middleware) that enforces authentication on protected routes.
 *
 * Logic:
 *  - Public pages and auth API endpoints always pass through.
 *  - Protected pages require a valid `auth_token` cookie.
 *    If missing, the user is redirected to /login.
 *  - Already-authenticated users visiting /login or /register are
 *    redirected to /customer (or their role-based dashboard).
 *  - All other routes (static assets, public API, etc.) pass through.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(AUTH_COOKIE)?.value

  // --- Let public auth APIs through without checks -------------------------

  if (isPublicAuthApi(pathname)) {
    return NextResponse.next()
  }

  // --- Protected routes: redirect to /login if no token --------------------

  if (isProtectedRoute(pathname) && !token) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // --- Auth pages: redirect away if already logged in ----------------------

  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/customer", request.url))
  }

  return NextResponse.next()
}

// ---------------------------------------------------------------------------
// Matcher — skip static assets, images, and Next.js internals
// ---------------------------------------------------------------------------

export const config = {
  matcher: [
    /*
     * Match all paths except:
     *  - _next/static (static files)
     *  - _next/image  (image optimization)
     *  - favicon.ico, sitemap.xml, robots.txt
     *  - public folder files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
