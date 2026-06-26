import { NextRequest, NextResponse } from "next/server"
import { extractToken, verifyToken } from "@/lib/auth-utils"
import { cancelOrder } from "@/features/orders/server/actions/cancel-order"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const token = extractToken(request)
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 })
    }

    const { orderId } = params
    const body = await request.json()
    const { status: newStatus } = body

    if (newStatus !== "cancelled") {
      return NextResponse.json({ success: false, message: "Invalid status update" }, { status: 400 })
    }

    const result = await cancelOrder(orderId, payload.userId)

    if (!result.success) {
      const status = result.message === "Order not found" ? 404 : 403
      return NextResponse.json(result, { status })
    }

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json(
      { success: false, message: "Failed to update order" },
      { status: 500 }
    )
  }
}
