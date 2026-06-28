import { useCallback } from "react"
import { useCartStore, type CartItem } from "./use-cart-store"
import { useAuth } from "@/hooks/useAuth"
import { getCart } from "../server/db/get-cart"
import { addToCart as addToCartAction } from "../server/actions/add-to-cart"
import { updateCartItem as updateCartItemAction } from "../server/actions/update-cart-item"
import { removeCartItem as removeCartItemAction } from "../server/actions/remove-cart-item"

export function useCart() {
  const { user } = useAuth()
  const items = useCartStore((s) => s.items)
  const itemCount = useCartStore((s) => s.itemCount)
  const total = useCartStore((s) => s.total)
  const isLoading = useCartStore((s) => s.isLoading)
  const error = useCartStore((s) => s.error)

  const fetchCart = useCallback(async () => {
    if (!user) return
    const state = useCartStore.getState()
    if (state.isLoading) return

    try {
      state.setLoading(true)
      state.setError(null)

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

      state.setItems(items)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error"
      state.setError(message)
      console.error("Failed to fetch cart:", error)
    } finally {
      state.setLoading(false)
    }
  }, [user])

  const addToCart = useCallback(
    async (productId: string, quantity: number, branch: string) => {
      if (!user) return

      try {
        const state = useCartStore.getState()
        state.setLoading(true)
        state.setError(null)

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

        state.addItem(item)
        return item
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        useCartStore.getState().setError(message)
        console.error("Failed to add to cart:", error)
        throw error
      } finally {
        useCartStore.getState().setLoading(false)
      }
    },
    [user]
  )

  const updateCartItem = useCallback(
    async (itemId: string, quantity: number) => {
      if (!user) return

      try {
        const state = useCartStore.getState()
        state.setLoading(true)
        state.setError(null)

        const result = await updateCartItemAction(itemId, quantity)
        if (!result.success || !result.data) {
          throw new Error(result.message || "Failed to update cart item")
        }

        state.updateItem(itemId, {
          quantity: result.data.quantity,
          subtotal: Number(result.data.subtotal),
        })
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        useCartStore.getState().setError(message)
        console.error("Failed to update cart item:", error)
        throw error
      } finally {
        useCartStore.getState().setLoading(false)
      }
    },
    [user]
  )

  const removeFromCart = useCallback(
    async (itemId: string) => {
      if (!user) return

      try {
        const state = useCartStore.getState()
        state.setLoading(true)
        state.setError(null)

        const result = await removeCartItemAction(itemId)
        if (!result.success) {
          throw new Error(result.message || "Failed to remove item from cart")
        }

        state.removeItem(itemId)
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        useCartStore.getState().setError(message)
        console.error("Failed to remove from cart:", error)
        throw error
      } finally {
        useCartStore.getState().setLoading(false)
      }
    },
    [user]
  )

  return {
    items,
    itemCount,
    total,
    isLoading,
    error,
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart: () => useCartStore.getState().clearCart(),
  }
}
