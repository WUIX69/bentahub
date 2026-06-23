import { NextResponse } from "next/server"

/**
 * POST /api/auth/logout
 *
 * Since auth is now JWT-based (no server-side session), logout
 * is handled client-side by discarding the stored token.
 * This endpoint exists as a no-op for any server-side cleanup.
 */
export async function POST() {
  return NextResponse.json(
    { success: true, message: "Logged out successfully" },
    { status: 200 }
  )
}
