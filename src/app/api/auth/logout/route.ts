import { NextResponse } from "next/server"
import { cookies } from "next/headers"

/**
 * POST /api/auth/logout
 *
 * Clears the server-side HTTP-only auth cookie and returns a success response.
 */
export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete("auth_token")

  return NextResponse.json(
    { success: true, message: "Logged out successfully" },
    { status: 200 }
  )
}
