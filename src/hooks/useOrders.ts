import { useCallback } from "react"
import { useOrdersStore, type Order } from "@/stores/ordersStore"
import { useAuth } from "./useAuth"
import { getOrders } from "@/features/orders/server/db/get-orders"
import { createOrder as createOrderAction } from "@/features/orders/server/actions/create-order"
import { cancelOrder as cancelOrderAction } from "@/features/orders/server/actions/cancel-order"

export function useOrders() {
  const { user } = useAuth()
  const orders = useOrdersStore((s) => s.orders)
  const currentOrder = useOrdersStore((s) => s.currentOrder)
  const isLoading = useOrdersStore((s) => s.isLoading)
  const error = useOrdersStore((s) => s.error)

  const fetchOrders = useCallback(async () => {
    if (!user) return
    const state = useOrdersStore.getState()
    if (state.isLoading) return

    try {
      state.setLoading(true)
      state.setError(null)

      const data = await getOrders()
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

      state.setOrders(orders)
      return orders
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error"
      useOrdersStore.getState().setError(message)
      console.error("Failed to fetch orders:", error)
      throw error
    } finally {
      useOrdersStore.getState().setLoading(false)
    }
  }, [user])

  const createOrder = useCallback(
    async (paymentMethod: "cash" | "gcash", branch: string, notes?: string) => {
      if (!user) throw new Error("User not authenticated")

      try {
        const state = useOrdersStore.getState()
        state.setLoading(true)
        state.setError(null)

        const result = await createOrderAction({ paymentMethod, branch, notes })

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

        state.addOrder(order)
        return order
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        useOrdersStore.getState().setError(message)
        console.error("Failed to create order:", error)
        throw error
      } finally {
        useOrdersStore.getState().setLoading(false)
      }
    },
    [user]
  )

  const cancelOrder = useCallback(
    async (orderId: string) => {
      if (!user) throw new Error("User not authenticated")

      try {
        const state = useOrdersStore.getState()
        state.setLoading(true)
        state.setError(null)

        const result = await cancelOrderAction(orderId)
        if (!result.success) throw new Error("Failed to cancel order")

        state.updateOrder(orderId, { status: "cancelled" })
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        useOrdersStore.getState().setError(message)
        console.error("Failed to cancel order:", error)
        throw error
      } finally {
        useOrdersStore.getState().setLoading(false)
      }
    },
    [user]
  )

  return {
    orders,
    currentOrder,
    isLoading,
    error,
    fetchOrders,
    createOrder,
    cancelOrder,
  }
}
