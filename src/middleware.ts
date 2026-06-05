import { NextRequest, NextResponse } from "next/server"

const publicRoutes = ["/", "/login", "/register", "/verify-email", "/api/auth/register", "/api/auth/verify-email", "/api/auth/login"]

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = request.cookies.get("auth_token")?.value
  
  console.log(`[Middleware] Path: ${pathname}, Token present: ${!!token}`)

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Allow static files and public assets
  if (pathname.startsWith("/public/") || pathname.startsWith("/images/") || /\.(png|jpg|jpeg|gif|ico|svg|webp|css|js|woff|woff2|ttf|eot)$/.test(pathname)) {
    return NextResponse.next()
  }

  // Allow all API routes (verification happens in the API routes themselves)
  if (pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Check token for protected routes
  if (!token) {
    // Redirect to login
    console.log(`[Middleware] No token found for ${pathname}, redirecting to /login`)
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Token exists, allow access
  // Full verification will happen in the page component or API routes
  console.log(`[Middleware] Token present for ${pathname}, allowing access`)
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
