"use server"

import { getAuthenticatedUser, generateId } from "@/lib/auth-utils"
import { addToCartSchema } from "@/features/cart/schemas/cart"
import { getProductForCart, getCartItemByUserAndProduct } from "@/features/cart/server/db/get-product-for-cart"
import { addProductToCart, updateCartItemQuantity } from "@/features/cart/server/db/mutations"

export async function addToCart(data: { productId: string; quantity: number; branch?: string }) {
  const user = await getAuthenticatedUser()
  if (!user) {
    return { success: false, message: "Unauthorized" }
  }
  const userId = user.userId

  const parsed = addToCartSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, message: "Invalid product ID or quantity" }
  }

  const { productId, quantity, branch } = parsed.data

  const product = await getProductForCart(productId)

  if (!product) {
    return { success: false, message: "Product not found" }
  }

  const subtotal = (Number(product.price) * quantity).toFixed(2)

  const existingCartItem = await getCartItemByUserAndProduct(userId, productId)

  if (existingCartItem) {
    const newQuantity = existingCartItem.quantity + quantity
    const newSubtotal = (Number(product.price) * newQuantity).toFixed(2)

    const updated = await updateCartItemQuantity(existingCartItem.id, newQuantity, newSubtotal)

    return { success: true, message: "Cart item updated", data: updated }
  }

  const newCartItem = {
    id: generateId(),
    userId,
    productId,
    productName: product.name,
    price: product.price.toString(),
    quantity,
    subtotal,
    image: product.image || "",
    category: product.category,
    branch: branch || product.branch,
  }

  const created = await addProductToCart(newCartItem)

  return { success: true, message: "Item added to cart", data: created }
}
