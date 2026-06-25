import { useCallback } from "react"
import { useCartStore, type CartItem } from "@/stores/cartStore"
import { useAuth } from "./useAuth"

function authHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }
  }

export function useCart() {
  const { user, token } = useAuth()
  const cartStore = useCartStore()

  /**
   * Fetch cart from backend
   */
  const fetchCart = useCallback(async () => {
    if (!user || !token) return
    if (cartStore.isLoading) return

    try {
      cartStore.setLoading(true)
      cartStore.setError(null)

      const response = await fetch("/api/customer/cart", {
        method: "GET",
        headers: authHeaders(token),
      })
      if (!response.ok) throw new Error("Failed to fetch cart")

      interface ApiCartItem {
        id: string
        productId: string
        productName: string
        price: string | number
        quantity: number
        subtotal: string | number
        image: string
        category: string
        branch: string
        addedAt: string
        updatedAt: string
      }

      const data = await response.json()
      const items: CartItem[] = data.data.items.map((item: ApiCartItem) => ({
        id: item.id,
        productId: item.productId,
        productName: item.productName,
        price: Number(item.price),
        quantity: Number(item.quantity),
        subtotal: Number(item.subtotal),
        image: item.image,
        category: item.category,
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
  }, [user, token, cartStore])

  /**
   * Add item to cart
   */
  const addToCart = useCallback(
    async (productId: string, quantity: number, branch: string) => {
      if (!user || !token) return

      try {
        cartStore.setLoading(true)
        cartStore.setError(null)

        const response = await fetch("/api/customer/cart", {
          method: "POST",
          headers: authHeaders(token),
          body: JSON.stringify({ productId, quantity, branch }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => null)
          throw new Error(errorData?.message || "Failed to add item to cart")
        }

        const data = await response.json()
        const item: CartItem = {
          ...data.data,
          addedAt: new Date(data.data.addedAt),
          updatedAt: new Date(data.data.updatedAt),
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
    [user, token, cartStore]
  )

  /**
   * Update cart item quantity
   */
  const updateCartItem = useCallback(
    async (itemId: string, quantity: number) => {
      if (!user || !token) return

      try {
        cartStore.setLoading(true)
        cartStore.setError(null)

        const response = await fetch(`/api/customer/cart/${itemId}`, {
          method: "PUT",
          headers: authHeaders(token),
          body: JSON.stringify({ quantity }),
        })

        if (!response.ok) throw new Error("Failed to update cart item")

        const data = await response.json()
        cartStore.updateItem(itemId, {
          quantity: data.data.quantity,
          subtotal: data.data.subtotal,
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
    [user, token, cartStore]
  )

  /**
   * Remove item from cart
   */
  const removeFromCart = useCallback(
    async (itemId: string) => {
      if (!user || !token) return

      try {
        cartStore.setLoading(true)
        cartStore.setError(null)

        const response = await fetch(`/api/customer/cart/${itemId}`, {
          method: "DELETE",
          headers: authHeaders(token),
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
    [user, token, cartStore]
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
