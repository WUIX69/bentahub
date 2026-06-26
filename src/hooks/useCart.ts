import { useCallback } from "react"
import { useCartStore, type CartItem } from "@/stores/cartStore"
import { useAuth } from "./useAuth"
import { getCart } from "@/features/cart/server/db/get-cart"
import { addToCart as addToCartAction } from "@/features/cart/server/actions/add-to-cart"
import { updateCartItem as updateCartItemAction } from "@/features/cart/server/actions/update-cart-item"
import { removeCartItem as removeCartItemAction } from "@/features/cart/server/actions/remove-cart-item"

export function useCart() {
  const { user } = useAuth()
  const cartStore = useCartStore()

  const fetchCart = useCallback(async () => {
    if (!user) return
    if (cartStore.isLoading) return

    try {
      cartStore.setLoading(true)
      cartStore.setError(null)

      const data = await getCart()
      const items: CartItem[] = data.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        productName: item.productName,
        price: Number(item.price),
        quantity: item.quantity,
        subtotal: Number(item.subtotal),
        image: item.image || "",
        category: item.category || "",
        branch: item.branch,
        addedAt: new Date(item.addedAt),
        updatedAt: new Date(item.updatedAt),
      }))

      cartStore.setItems(items)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error"
      cartStore.setError(message)
      console.error("Failed to fetch cart:", error)
    } finally {
      cartStore.setLoading(false)
    }
  }, [user, cartStore])

  const addToCart = useCallback(
    async (productId: string, quantity: number, branch: string) => {
      if (!user) return

      try {
        cartStore.setLoading(true)
        cartStore.setError(null)

        const result = await addToCartAction({ productId, quantity, branch })

        if (!result.success || !result.data) {
          throw new Error(result.message || "Failed to add item to cart")
        }

        const d = result.data
        const item: CartItem = {
          id: d.id,
          productId: d.productId,
          productName: d.productName,
          price: Number(d.price),
          quantity: d.quantity,
          subtotal: Number(d.subtotal),
          image: d.image || "",
          category: d.category || "",
          branch: d.branch,
          addedAt: new Date(),
          updatedAt: new Date(),
        }

        cartStore.addItem(item)
        return item
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        cartStore.setError(message)
        console.error("Failed to add to cart:", error)
        throw error
      } finally {
        cartStore.setLoading(false)
      }
    },
    [user, cartStore]
  )

  const updateCartItem = useCallback(
    async (itemId: string, quantity: number) => {
      if (!user) return

      try {
        cartStore.setLoading(true)
        cartStore.setError(null)

        const result = await updateCartItemAction(itemId, quantity)
        if (!result.success || !result.data) {
          throw new Error(result.message || "Failed to update cart item")
        }

        cartStore.updateItem(itemId, {
          quantity: result.data.quantity,
          subtotal: Number(result.data.subtotal),
        })
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        cartStore.setError(message)
        console.error("Failed to update cart item:", error)
        throw error
      } finally {
        cartStore.setLoading(false)
      }
    },
    [user, cartStore]
  )

  const removeFromCart = useCallback(
    async (itemId: string) => {
      if (!user) return

      try {
        cartStore.setLoading(true)
        cartStore.setError(null)

        const result = await removeCartItemAction(itemId)
        if (!result.success) {
          throw new Error(result.message || "Failed to remove item from cart")
        }

        cartStore.removeItem(itemId)
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        cartStore.setError(message)
        console.error("Failed to remove from cart:", error)
        throw error
      } finally {
        cartStore.setLoading(false)
      }
    },
    [user, cartStore]
  )

  return {
    items: cartStore.items,
    itemCount: cartStore.itemCount,
    total: cartStore.total,
    isLoading: cartStore.isLoading,
    error: cartStore.error,
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart: () => cartStore.clearCart(),
  }
}
