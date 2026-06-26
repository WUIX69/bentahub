"use server"

import { db } from "@/drizzle/db"
import { cartItems } from "@/drizzle/schema"
import { eq, and } from "drizzle-orm"
import { getAuthenticatedUser } from "@/lib/auth-utils"

export async function updateCartItem(
  itemId: string,
  quantity: number
) {
  const user = await getAuthenticatedUser()
  if (!user) {
    return { success: false, message: "Unauthorized" }
  }
  const userId = user.userId

  if (quantity === undefined || quantity < 1) {
    return { success: false, message: "Invalid quantity" }
  }

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

  const newSubtotal = (Number(item.price) * quantity).toFixed(2)

  const [updated] = await db
    .update(cartItems)
    .set({
      quantity,
      subtotal: newSubtotal,
    })
    .where(eq(cartItems.id, itemId))
    .returning()

  return { success: true, message: "Cart item updated", data: updated }
}
