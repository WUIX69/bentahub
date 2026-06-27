import { db } from "@/drizzle/db"
import { cartItems } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export async function addProductToCart(data: typeof cartItems.$inferInsert) {
  const [created] = await db.insert(cartItems).values(data).returning()
  return created
}

export async function updateCartItemQuantity(itemId: string, quantity: number, subtotal: string) {
  const [updated] = await db
    .update(cartItems)
    .set({
      quantity,
      subtotal,
    })
    .where(eq(cartItems.id, itemId))
    .returning()
  return updated
}

export async function removeCartItemById(itemId: string) {
  await db.delete(cartItems).where(eq(cartItems.id, itemId))
}
