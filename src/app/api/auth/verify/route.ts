import { NextRequest, NextResponse } from "next/server"
import { db } from "@/servers/db"
import { users } from "@/servers/schemas"
import { eq } from "drizzle-orm"
import { verifyToken } from "@/lib/auth-utils"
import { AUTH_COOKIE_NAME } from "@/lib/cookie-utils"
import type { AuthResponse } from "@/types/auth"

/**
 * GET /api/auth/verify
 *
 * Validates the auth_token cookie and returns the current user's data.
 * Used by the frontend AuthProvider to hydrate session state on page load.
 *
 * Unlike the old version which only decoded the JWT, this now also fetches
 * the user from the database to ensure the account still exists and to
 * return up-to-date fields (role, verification status, etc.).
 */
export async function GET(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token found" },
        { status: 401 }
      )
    }

    // --- Decode JWT ----------------------------------------------------------

    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      )
    }

    // --- Fetch fresh user data from DB --------------------------------------

    const user = await db.query.users.findFirst({
      where: eq(users.id, decoded.userId),
    })

    if (!user || !user.isActive) {
      return NextResponse.json(
        { success: false, message: "User not found or deactivated" },
        { status: 401 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Token is valid",
        data: {
          userId: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred during verification" },
      { status: 500 }
    )
  }
}
