"use server"

import { getAuthenticatedUser } from "@/lib/auth-utils"
import { removeCartItemSchema } from "@/features/cart/schemas/cart"
import { getCartItemByUserAndId } from "@/features/cart/server/db/get-product-for-cart"
import { removeCartItemById } from "@/features/cart/server/db/mutations"

export async function removeCartItem(itemId: string) {
  const user = await getAuthenticatedUser()
  if (!user) {
    return { success: false, message: "Unauthorized" }
  }
  const userId = user.userId

  const parsed = removeCartItemSchema.safeParse({ itemId })
  if (!parsed.success) {
    return { success: false, message: "Invalid item ID" }
  }

  const item = await getCartItemByUserAndId(userId, itemId)

  if (!item) {
    return { success: false, message: "Cart item not found" }
  }

  await removeCartItemById(itemId)

  return { success: true, message: "Cart item removed" }
}
