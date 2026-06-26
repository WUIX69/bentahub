import { useCallback } from "react"
import { useOrdersStore, type Order } from "@/stores/ordersStore"
import { useAuth } from "./useAuth"
import { getOrders } from "@/features/orders/server/db/get-orders"
import { createOrder as createOrderAction } from "@/features/orders/server/actions/create-order"
import { cancelOrder as cancelOrderAction } from "@/features/orders/server/actions/cancel-order"

function decodeUserId(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    return payload.userId || null
  } catch {
    return null
  }
}

export function useOrders() {
  const { user, token } = useAuth()
  const ordersStore = useOrdersStore()

  const fetchOrders = useCallback(async () => {
    if (!user || !token) return
    if (ordersStore.isLoading) return

    try {
      ordersStore.setLoading(true)
      ordersStore.setError(null)

      const userId = decodeUserId(token)
      if (!userId) throw new Error("Invalid token")

      const data = await getOrders(userId)
      const orders: Order[] = (data ?? []).map((o) => ({
        id: o.id,
        userId: o.userId,
        status: o.status as Order["status"],
        paymentMethod: o.paymentMethod as Order["paymentMethod"],
        totalAmount: Number(o.totalAmount),
        branch: o.branch,
        notes: o.notes || "",
        isPaid: o.isPaid,
        paidAt: o.paidAt ? new Date(o.paidAt) : null,
        createdAt: new Date(o.createdAt),
        updatedAt: new Date(o.updatedAt),
        items: [],
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
  }, [user, token, ordersStore])

  const createOrder = useCallback(
    async (paymentMethod: "cash" | "gcash", branch: string, notes?: string) => {
      if (!user) throw new Error("User not authenticated")
      if (!token) throw new Error("No authentication token found")

      try {
        ordersStore.setLoading(true)
        ordersStore.setError(null)

        const userId = decodeUserId(token)
        if (!userId) throw new Error("Invalid token")

        const result = await createOrderAction(userId, { paymentMethod, branch, notes })

        if (!result.success || !result.data) {
          throw new Error(result.message || "Failed to create order")
        }

        const payload = result.data
        const order: Order = {
          id: payload.order.id,
          userId: payload.order.userId,
          status: payload.order.status as Order["status"],
          paymentMethod: payload.order.paymentMethod as Order["paymentMethod"],
          totalAmount: Number(payload.order.totalAmount),
          branch: payload.order.branch,
          notes: payload.order.notes || "",
          isPaid: payload.order.isPaid,
          paidAt: payload.order.paidAt ? new Date(payload.order.paidAt) : null,
          createdAt: new Date(payload.order.createdAt),
          updatedAt: new Date(payload.order.updatedAt),
          items: (payload.items ?? []).map((item) => ({
            id: item.id,
            productId: item.productId,
            productName: item.productName,
            quantity: Number(item.quantity),
            price: Number(item.price),
            subtotal: Number(item.subtotal),
            createdAt: new Date(),
          })),
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
    [user, token, ordersStore]
  )

  const cancelOrder = useCallback(
    async (orderId: string) => {
      if (!user) throw new Error("User not authenticated")
      if (!token) throw new Error("No authentication token found")

      try {
        ordersStore.setLoading(true)
        ordersStore.setError(null)

        const userId = decodeUserId(token)
        if (!userId) throw new Error("Invalid token")

        const result = await cancelOrderAction(orderId, userId)
        if (!result.success) throw new Error("Failed to cancel order")

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
    [user, token, ordersStore]
  )

  return {
    orders: ordersStore.orders,
    currentOrder: ordersStore.currentOrder,
    isLoading: ordersStore.isLoading,
    error: ordersStore.error,
    fetchOrders,
    createOrder,
    cancelOrder,
  }
}
