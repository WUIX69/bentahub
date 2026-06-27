"use server"

import { db } from "@/drizzle/db"
import { cartItems, products } from "@/drizzle/schema"
import { eq, and } from "drizzle-orm"
import { getAuthenticatedUser, generateId } from "@/lib/auth-utils"

export async function addToCart({
  productId,
  quantity,
  branch,
}: { productId: string; quantity: number; branch?: string }) {
  const user = await getAuthenticatedUser()
  if (!user) {
    return { success: false, message: "Unauthorized" }
  }
  const userId = user.userId

  if (!productId || !quantity || quantity < 1) {
    return { success: false, message: "Invalid product ID or quantity" }
  }

  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
    .limit(1)

  if (!product.length) {
    return { success: false, message: "Product not found" }
  }

  const productData = product[0]
  const subtotal = (Number(productData.price) * quantity).toFixed(2)

  const existingItem = await db
    .select()
    .from(cartItems)
    .where(
      and(
        eq(cartItems.userId, userId),
        eq(cartItems.productId, productId)
      )
    )
    .limit(1)

  if (existingItem.length > 0) {
    const existingCartItem = existingItem[0]
    const newQuantity = existingCartItem.quantity + quantity
    const newSubtotal = (Number(productData.price) * newQuantity).toFixed(2)

    const [updated] = await db
      .update(cartItems)
      .set({
        quantity: newQuantity,
        subtotal: newSubtotal,
      })
      .where(eq(cartItems.id, existingCartItem.id))
      .returning()

    return { success: true, message: "Cart item updated", data: updated }
  }

  const newCartItem = {
    id: generateId(),
    userId,
    productId,
    productName: productData.name,
    price: productData.price.toString(),
    quantity,
    subtotal,
    image: productData.image || "",
    category: productData.category,
    branch: branch || productData.branch,
  }

  const [created] = await db.insert(cartItems).values(newCartItem).returning()

  return { success: true, message: "Item added to cart", data: created }
}
