import { NextRequest, NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { orders } from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { extractToken, verifyToken } from "@/lib/auth-utils"

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

    const [order] = await db.select().from(orders).where(eq(orders.id, orderId))
    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 })
    }
    if (order.userId !== payload.userId) {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
    }

    const [updated] = await db
      .update(orders)
      .set({ status: newStatus })
      .where(eq(orders.id, orderId))
      .returning()

    return NextResponse.json({ success: true, data: updated }, { status: 200 })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json(
      { success: false, message: "Failed to update order" },
      { status: 500 }
    )
  }
}
