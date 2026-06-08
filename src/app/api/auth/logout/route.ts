import { NextResponse } from "next/server"
import { AUTH_COOKIE_NAME } from "@/lib/cookie-utils"

/**
 * POST /api/auth/logout
 *
 * Clears the auth_token cookie to end the session.
 */
export async function POST() {
  try {
    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    )

    response.cookies.delete(AUTH_COOKIE_NAME)

    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred during logout" },
      { status: 500 }
    )
  }
}
