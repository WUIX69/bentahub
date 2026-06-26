import { NextRequest, NextResponse } from "next/server"
import { extractToken, verifyToken } from "@/lib/auth-utils"
import { getNotifications } from "@/features/notifications/server/db/get-notifications"

async function getUserIdFromToken(request: NextRequest): Promise<string | null> {
  const token = extractToken(request)

  if (!token) {
    return null
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return null
  }

  return decoded.userId
}

/**
 * GET /api/customer/notifications
 * Retrieve all notifications for the authenticated user
 * Query params: limit=10, offset=0, unreadOnly=false
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromToken(request)

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      )
    }

    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get("limit") || "20")
    const offset = parseInt(searchParams.get("offset") || "0")
    const unreadOnly = searchParams.get("unreadOnly") === "true"

    const result = await getNotifications({ userId, limit, offset, unreadOnly })

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch notifications" },
      { status: 500 },
    )
  }
}
