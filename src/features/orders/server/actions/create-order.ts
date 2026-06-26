"use server"

import { db } from "@/drizzle/db"
import { cartItems, orders, orderItems } from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { generateId } from "@/lib/auth-utils"

export async function createOrder(
  userId: string,
  {
    paymentMethod,
    branch,
    notes,
  }: { paymentMethod: string; branch: string; notes?: string }
) {
  if (!paymentMethod || !branch) {
    return { success: false, message: "Payment method and branch are required" }
  }

  if (!["cash", "gcash"].includes(paymentMethod)) {
    return { success: false, message: "Invalid payment method" }
  }

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
