"use server"

import { db } from "@/drizzle/db"
import { cartItems } from "@/drizzle/schema"
import { eq, and } from "drizzle-orm"
import { getAuthenticatedUser } from "@/lib/auth-utils"

export async function removeCartItem(itemId: string) {
  const user = await getAuthenticatedUser()
  if (!user) {
    return { success: false, message: "Unauthorized" }
  }
  const userId = user.userId
  const [item] = await db
    .select()
    .from(cartItems)
    .where(
      and(
        eq(cartItems.id, itemId),
        eq(cartItems.userId, userId)
      )
    )
    .limit(1)

  if (!item) {
    return { success: false, message: "Cart item not found" }
  }

  await db.delete(cartItems).where(eq(cartItems.id, itemId))

  return { success: true, message: "Cart item removed" }
}
