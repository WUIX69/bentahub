"use server"

import { db } from "@/drizzle/db"
import { orders } from "@/drizzle/schema"
import { eq, desc } from "drizzle-orm"

export async function getOrders(userId: string) {
  return await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt))
}

export async function getOrderById(orderId: string, userId: string) {
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1)

  if (!order || order.userId !== userId) {
    return null
  }

  return order
}
