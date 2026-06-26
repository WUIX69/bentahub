"use server"

import { db } from "@/drizzle/db"
import { orders } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export async function cancelOrder(orderId: string, userId: string) {
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1)

  if (!order) {
    return { success: false, message: "Order not found" }
  }

  if (order.userId !== userId) {
    return { success: false, message: "Forbidden" }
  }

  await db
    .update(orders)
    .set({ status: "cancelled" })
    .where(eq(orders.id, orderId))

  return { success: true, message: "Order cancelled successfully" }
}
