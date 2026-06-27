"use server"

import { getAuthenticatedUser } from "@/lib/auth-utils"
import { updateCartItemSchema } from "@/features/cart/schemas/cart"
import { getCartItemByUserAndId } from "@/features/cart/server/db/get-product-for-cart"
import { updateCartItemQuantity } from "@/features/cart/server/db/mutations"

export async function updateCartItem(
  itemId: string,
  quantity: number
) {
  const user = await getAuthenticatedUser()
  if (!user) {
    return { success: false, message: "Unauthorized" }
  }
  const userId = user.userId

  const parsed = updateCartItemSchema.safeParse({ itemId, quantity })
  if (!parsed.success) {
    return { success: false, message: "Invalid quantity" }
  }

  const item = await getCartItemByUserAndId(userId, itemId)

  if (!item) {
    return { success: false, message: "Cart item not found" }
  }

  const newSubtotal = (Number(item.price) * quantity).toFixed(2)

  const updated = await updateCartItemQuantity(itemId, quantity, newSubtotal)

  return { success: true, message: "Cart item updated", data: updated }
}
