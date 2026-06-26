import { NextRequest, NextResponse } from "next/server"
import { extractToken, verifyToken } from "@/lib/auth-utils"
import { markNotificationRead } from "@/features/notifications/server/actions/mark-read"

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
 * PATCH /api/customer/notifications/[notificationId]
 * Mark notification as read
 * Body: { isRead: boolean }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ notificationId: string }> },
) {
  try {
    const userId = await getUserIdFromToken(request)

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      )
    }

    const { notificationId } = await params
    const body = await request.json()
    const { isRead } = body

    if (isRead === undefined) {
      return NextResponse.json(
        { success: false, message: "isRead flag is required" },
        { status: 400 },
      )
    }

    const result = await markNotificationRead({ notificationId, userId, isRead })

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Notification not found" },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Notification updated",
        data: result.data,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error updating notification:", error)
    return NextResponse.json(
      { success: false, message: "Failed to update notification" },
      { status: 500 },
    )
  }
}
