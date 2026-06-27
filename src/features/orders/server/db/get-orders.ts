"use server"

import { db } from "@/drizzle/db"
import { orders } from "@/drizzle/schema"
import { eq, desc } from "drizzle-orm"

import { getAuthenticatedUser } from "@/lib/auth-utils"

export async function getOrders() {
  const user = await getAuthenticatedUser()
  if (!user) {
    throw new Error("Unauthorized")
  }
  const userId = user.userId

  return await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt))
}

export async function getOrderById(orderId: string) {
  const user = await getAuthenticatedUser()
  if (!user) {
    return null
  }
  const userId = user.userId

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
