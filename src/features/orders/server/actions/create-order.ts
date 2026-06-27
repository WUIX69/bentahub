"use server"

import { db } from "@/drizzle/db"
import { cartItems, orders, orderItems } from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { getAuthenticatedUser, generateId } from "@/lib/auth-utils"
import { createOrderSchema } from "@/features/orders/schemas/orders"

export async function createOrder(data: {
  paymentMethod: string
  branch: string
  notes?: string
}) {
  const user = await getAuthenticatedUser()
  if (!user) {
    return { success: false, message: "Unauthorized" }
  }
  const userId = user.userId

  const parsed = createOrderSchema.safeParse(data)
  if (!parsed.success) {
    const errorMap = parsed.error.flatten().fieldErrors
    const firstError = Object.values(errorMap)[0]?.[0] || "Validation failed"
    return { success: false, message: firstError }
  }

  const { paymentMethod, branch, notes } = parsed.data

  const userCartItems = await db
    .select()
    .from(cartItems)
    .where(eq(cartItems.userId, userId))

  if (userCartItems.length === 0) {
    return { success: false, message: "Cart is empty" }
  }

  const totalAmount = userCartItems.reduce(
    (sum, item) => sum + Number(item.subtotal),
    0
  )

  const orderId = generateId()
  const newOrder = {
    id: orderId,
    userId,
    status: "pending" as const,
    paymentMethod: paymentMethod as "cash" | "gcash",
    totalAmount: totalAmount.toFixed(2),
    branch,
    notes: notes || null,
    isPaid: false,
    paidAt: null,
  }

  const createdOrder = await db
    .insert(orders)
    .values(newOrder)
    .returning()

  const orderItemsData = userCartItems.map((item) => ({
    id: generateId(),
    orderId,
    productId: item.productId,
    productName: item.productName,
    quantity: item.quantity,
    price: item.price,
    subtotal: item.subtotal,
  }))

  await db.insert(orderItems).values(orderItemsData)

  await db.delete(cartItems).where(eq(cartItems.userId, userId))

  return {
    success: true,
    message: "Order created successfully",
    data: {
      order: createdOrder[0],
      items: orderItemsData,
    },
  }
}
