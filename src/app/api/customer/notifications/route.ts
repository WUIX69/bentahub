import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import * as jwt from "jsonwebtoken"
import { db } from "@/servers/db"
import { notifications } from "@/servers/schemas"
import { eq, and, desc } from "drizzle-orm"

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key-change-in-production"

async function getUserIdFromToken(): Promise<string | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    return decoded.userId
  } catch (error) {
    return null
  }
}

/**
 * GET /api/customer/notifications
 * Retrieve all notifications for the authenticated user
 * Query params: limit=10, offset=0, unreadOnly=false
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromToken()

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get("limit") || "20")
    const offset = parseInt(searchParams.get("offset") || "0")
    const unreadOnly = searchParams.get("unreadOnly") === "true"

    let query = db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))

    if (unreadOnly) {
      query = db
        .select()
        .from(notifications)
        .where(and(eq(notifications.userId, userId), eq(notifications.isRead, false)))
    }

    const userNotifications = await query
      .orderBy(desc(notifications.createdAt))
      .limit(limit)
      .offset(offset)

    // Get unread count
    const unreadNotifications = await db
      .select()
      .from(notifications)
      .where(
        and(eq(notifications.userId, userId), eq(notifications.isRead, false))
      )

    return NextResponse.json(
      {
        success: true,
        data: {
          notifications: userNotifications,
          unreadCount: unreadNotifications.length,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch notifications" },
      { status: 500 }
    )
  }
}
