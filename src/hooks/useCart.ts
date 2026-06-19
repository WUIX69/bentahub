import { useCallback } from "react"
import { useCartStore, type CartItem } from "@/stores/cartStore"
import { useAuth } from "./useAuth"

export function useCart() {
  const { user } = useAuth()
  const cartStore = useCartStore()

  /**
   * Fetch cart from backend
   */
  const fetchCart = useCallback(async () => {
    if (!user) return

    try {
      cartStore.setLoading(true)
      cartStore.setError(null)

      const response = await fetch("/api/customer/cart")
      if (!response.ok) throw new Error("Failed to fetch cart")

      const data = await response.json()
      const items: CartItem[] = data.items.map((item: any) => ({
        ...item,
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

  /**
   * Add item to cart
   */
  const addToCart = useCallback(
    async (productId: string, quantity: number, branch: string) => {
      if (!user) return

      try {
        cartStore.setLoading(true)
        cartStore.setError(null)

        const response = await fetch("/api/customer/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, quantity, branch }),
        })

        if (!response.ok) throw new Error("Failed to add item to cart")

        const data = await response.json()
        const item: CartItem = {
          ...data,
          addedAt: new Date(data.addedAt),
          updatedAt: new Date(data.updatedAt),
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

  /**
   * Update cart item quantity
   */
  const updateCartItem = useCallback(
    async (itemId: string, quantity: number) => {
      if (!user) return

      try {
        cartStore.setLoading(true)
        cartStore.setError(null)

        const response = await fetch(`/api/customer/cart/${itemId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        })

        if (!response.ok) throw new Error("Failed to update cart item")

        const data = await response.json()
        cartStore.updateItem(itemId, {
          quantity: data.quantity,
          subtotal: data.subtotal,
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

  /**
   * Remove item from cart
   */
  const removeFromCart = useCallback(
    async (itemId: string) => {
      if (!user) return

      try {
        cartStore.setLoading(true)
        cartStore.setError(null)

        const response = await fetch(`/api/customer/cart/${itemId}`, {
          method: "DELETE",
        })

        if (!response.ok) throw new Error("Failed to remove item from cart")

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
    // State
    items: cartStore.items,
    itemCount: cartStore.itemCount,
    total: cartStore.total,
    isLoading: cartStore.isLoading,
    error: cartStore.error,

    // Actions
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart: () => cartStore.clearCart(),
  }
}
