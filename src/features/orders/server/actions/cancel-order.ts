"use server"

import { getAuthenticatedUser } from "@/lib/auth-utils"
import { cancelOrderSchema } from "@/features/orders/schemas/orders"
import { getOrderByIdAndUserId, cancelOrderById } from "@/features/orders/server/db/mutations"

export async function cancelOrder(orderId: string) {
  const user = await getAuthenticatedUser()
  if (!user) {
    return { success: false, message: "Unauthorized" }
  }
  const userId = user.userId

  const parsed = cancelOrderSchema.safeParse({ orderId })
  if (!parsed.success) {
    return { success: false, message: "Invalid order ID" }
  }

  const order = await getOrderByIdAndUserId(orderId, userId)

  if (!order) {
    return { success: false, message: "Order not found or forbidden" }
  }

  await cancelOrderById(orderId)

  return { success: true, message: "Order cancelled successfully" }
}
