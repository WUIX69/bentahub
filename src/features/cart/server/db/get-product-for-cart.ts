import { db } from "@/drizzle/db"
import { cartItems, products } from "@/drizzle/schema"
import { eq, and } from "drizzle-orm"

export async function getProductForCart(productId: string) {
  const result = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
    .limit(1)
  return result[0] || null
}

export async function getCartItemByUserAndProduct(userId: string, productId: string) {
  const result = await db
    .select()
    .from(cartItems)
    .where(
      and(
        eq(cartItems.userId, userId),
        eq(cartItems.productId, productId)
      )
    )
    .limit(1)
  return result[0] || null
}

export async function getCartItemByUserAndId(userId: string, itemId: string) {
  const result = await db
    .select()
    .from(cartItems)
    .where(
      and(
        eq(cartItems.id, itemId),
        eq(cartItems.userId, userId)
      )
    )
    .limit(1)
  return result[0] || null
}
