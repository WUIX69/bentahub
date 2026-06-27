"use server"

import { db } from "@/drizzle/db"
import { cartItems } from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { getAuthenticatedUser } from "@/lib/auth-utils"

export async function getCart() {
  const user = await getAuthenticatedUser()
  if (!user) {
    throw new Error("Unauthorized")
  }
  const userId = user.userId

  const items = await db
    .select()
    .from(cartItems)
    .where(eq(cartItems.userId, userId))

  const total = items.reduce((sum, item) => sum + Number(item.subtotal), 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return {
    items,
    itemCount,
    total: Number(total.toFixed(2)),
  }
}
