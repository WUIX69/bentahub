import { NextRequest, NextResponse } from "next/server"
import { verifyToken, extractToken } from "@/lib/auth-utils"
import { getMonitoringData } from "@/features/admin-dashboard/actions/get-monitoring"
import type { AdminApiResponse } from "@/types/admin"

export async function GET(request: NextRequest): Promise<NextResponse<AdminApiResponse>> {
  try {
    const token = extractToken(request)

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      )
    }

    const payload = verifyToken(token)

    if (!payload) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      )
    }

    if (payload.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 }
      )
    }

    const data = await getMonitoringData()

    const alerts = data.alerts.map((a, i) => ({
      id: `alert-${i}`,
      title: a.title,
      description: a.description,
      severity: a.type === "critical" ? "critical" as const : a.type === "warning" ? "info" as const : "success" as const,
      category: a.type === "critical" ? "Inventory" : "System",
      timestamp: "just now",
      isRead: false,
      icon: a.type === "critical" ? "AlertTriangle" : "RefreshCw",
    }))

    return NextResponse.json({
      success: true,
      message: "Notifications retrieved",
      data: { notifications: alerts, unreadCount: alerts.length },
    })
  } catch (error) {
    console.error("Admin notifications error:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching notifications" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest): Promise<NextResponse<AdminApiResponse>> {
  try {
    const token = extractToken(request)

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      )
    }

    const payload = verifyToken(token)

    if (!payload || payload.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { ids, markAll } = body

    return NextResponse.json({
      success: true,
      message: markAll ? "All notifications marked as read" : `${ids?.length || 0} notifications marked as read`,
    })
  } catch (error) {
    console.error("Admin notifications error:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 }
    )
  }
}
