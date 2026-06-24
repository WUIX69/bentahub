import { NextRequest, NextResponse } from "next/server"
import { verifyJwtEdge } from "./lib/auth-edge-utils"

// Public routes that unauthenticated users can access
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/verify-email",
  "/forgot-password",
  "/reset-password"
]

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Bypass Next.js internal files, public assets, and auth APIs
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.includes(".") // matches files like favicon.ico, images, etc.
  ) {
    return NextResponse.next()
  }

  // 2. Extract and verify token from cookies
  const token = request.cookies.get("auth_token")?.value
  const secret = process.env.JWT_SECRET || "default-secret-key-for-development-purposes-only"
  const user = token ? await verifyJwtEdge(token, secret) : null

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

  // 3. Unauthenticated requests
  if (!user) {
    if (!isPublicRoute) {
      // API routes return 401 instead of redirecting
      if (pathname.startsWith("/api/")) {
        return NextResponse.json(
          { success: false, message: "Unauthorized. Please log in." },
          { status: 401 }
        )
      }
      return NextResponse.redirect(new URL("/login", request.url))
    }
    return NextResponse.next()
  }

  // 4. Authenticated requests
  const role = user.role // 'admin', 'employee', 'customer'

  // If authenticated user tries to access login/register/etc., redirect to their home
  if (["/login", "/register", "/verify-email", "/forgot-password", "/reset-password"].includes(pathname)) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url))
    } else if (role === "employee") {
      return NextResponse.redirect(new URL("/employee", request.url))
    } else {
      return NextResponse.redirect(new URL("/customer", request.url))
    }
  }

  // Legacy route redirections (cashier & staff -> employee)
  if (pathname.startsWith("/cashier") || pathname.startsWith("/staff")) {
    return NextResponse.redirect(new URL("/employee", request.url))
  }

  // Route protection rules
  if (pathname.startsWith("/admin") && role !== "admin") {
    const fallback = role === "employee" ? "/employee" : "/customer"
    return NextResponse.redirect(new URL(fallback, request.url))
  }

  if (pathname.startsWith("/employee") && role !== "employee") {
    const fallback = role === "admin" ? "/admin" : "/customer"
    return NextResponse.redirect(new URL(fallback, request.url))
  }

  if (pathname.startsWith("/customer") && role !== "customer") {
    const fallback = role === "admin" ? "/admin" : "/employee"
    return NextResponse.redirect(new URL(fallback, request.url))
  }

  // API protection rules
  if (pathname.startsWith("/api/admin") && role !== "admin") {
    return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
  }

  if (pathname.startsWith("/api/customer") && role !== "customer") {
    return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
  }

  return NextResponse.next()
}
