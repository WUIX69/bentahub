"use server"

import { db } from "@/drizzle/db"
import { cartItems } from "@/drizzle/schema"
import { eq, and } from "drizzle-orm"

export async function updateCartItem(
  itemId: string,
  userId: string,
  quantity: number
) {
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
