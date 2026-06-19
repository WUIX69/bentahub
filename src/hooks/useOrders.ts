import { useCallback } from "react"
import { useOrdersStore, type Order } from "@/stores/ordersStore"
import { useAuth } from "./useAuth"

export function useOrders() {
  const { user } = useAuth()
  const ordersStore = useOrdersStore()

  /**
   * Fetch user's orders from backend
   */
  const fetchOrders = useCallback(async () => {
    if (!user) return

    try {
      ordersStore.setLoading(true)
      ordersStore.setError(null)

      const response = await fetch("/api/customer/orders")
      if (!response.ok) throw new Error("Failed to fetch orders")

      const data = await response.json()
      const orders: Order[] = data.map((o: any) => ({
        ...o,
        paidAt: o.paidAt ? new Date(o.paidAt) : null,
        createdAt: new Date(o.createdAt),
        updatedAt: new Date(o.updatedAt),
        items: o.items?.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        })) || [],
      }))

      ordersStore.setOrders(orders)
      return orders
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error"
      ordersStore.setError(message)
      console.error("Failed to fetch orders:", error)
      throw error
    } finally {
      ordersStore.setLoading(false)
    }
  }, [user, ordersStore])

  /**
   * Create a new order from cart
   * @param paymentMethod - "cash" or "gcash"
   * @param branch - Customer's selected branch
   * @param notes - Optional order notes
   */
  const createOrder = useCallback(
    async (paymentMethod: "cash" | "gcash", branch: string, notes?: string) => {
      if (!user) throw new Error("User not authenticated")

      try {
        ordersStore.setLoading(true)
        ordersStore.setError(null)

        const response = await fetch("/api/customer/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentMethod, branch, notes }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(
            errorData.message || "Failed to create order"
          )
        }

        const data = await response.json()
        const order: Order = {
          ...data,
          paidAt: data.paidAt ? new Date(data.paidAt) : null,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
          items: data.items?.map((item: any) => ({
            ...item,
            createdAt: new Date(item.createdAt),
          })) || [],
        }

        ordersStore.addOrder(order)
        return order
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        ordersStore.setError(message)
        console.error("Failed to create order:", error)
        throw error
      } finally {
        ordersStore.setLoading(false)
      }
    },
    [user, ordersStore]
  )

  /**
   * Cancel an order
   */
  const cancelOrder = useCallback(
    async (orderId: string) => {
      if (!user) throw new Error("User not authenticated")

      try {
        ordersStore.setLoading(true)
        ordersStore.setError(null)

        const response = await fetch(`/api/customer/orders/${orderId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "cancelled" }),
        })

        if (!response.ok) throw new Error("Failed to cancel order")

        const data = await response.json()
        ordersStore.updateOrder(orderId, { status: "cancelled" })
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        ordersStore.setError(message)
        console.error("Failed to cancel order:", error)
        throw error
      } finally {
        ordersStore.setLoading(false)
      }
    },
    [user, ordersStore]
  )

  return {
    // State
    orders: ordersStore.orders,
    currentOrder: ordersStore.currentOrder,
    isLoading: ordersStore.isLoading,
    error: ordersStore.error,

    // Actions
    fetchOrders,
    createOrder,
    cancelOrder,
  }
}
