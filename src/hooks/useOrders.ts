import { useCallback } from "react"
import { useOrdersStore, type Order } from "@/stores/ordersStore"
import { useAuth } from "./useAuth"

function authHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }
}

interface ApiOrderItem {
  id: string
  productId: string
  productName: string
  quantity: number
  price: string | number
  subtotal: string | number
  createdAt: string
}

interface ApiOrder {
  id: string
  userId: string
  status: Order["status"]
  paymentMethod: Order["paymentMethod"]
  totalAmount: string | number
  branch: string
  notes: string
  isPaid: boolean
  paidAt: string | null
  items?: ApiOrderItem[]
  createdAt: string
  updatedAt: string
}

export function useOrders() {
  const { user, token } = useAuth()
  const ordersStore = useOrdersStore()

  /**
   * Fetch user's orders from backend
   */
  const fetchOrders = useCallback(async () => {
    if (!user || !token) return
    if (ordersStore.isLoading) return

    try {
      ordersStore.setLoading(true)
      ordersStore.setError(null)

      const response = await fetch("/api/customer/orders", {
        method: "GET",
        headers: authHeaders(token),
      })
      if (!response.ok) throw new Error("Failed to fetch orders")

      const data = await response.json()
      const orders: Order[] = (data.data ?? []).map((o: ApiOrder) => ({
        id: o.id,
        userId: o.userId,
        status: o.status,
        paymentMethod: o.paymentMethod,
        totalAmount: Number(o.totalAmount),
        branch: o.branch,
        notes: o.notes,
        isPaid: o.isPaid,
        paidAt: o.paidAt ? new Date(o.paidAt) : null,
        createdAt: new Date(o.createdAt),
        updatedAt: new Date(o.updatedAt),
        items: o.items?.map((item: ApiOrderItem) => ({
          id: item.id,
          productId: item.productId,
          productName: item.productName,
          quantity: Number(item.quantity),
          price: Number(item.price),
          subtotal: Number(item.subtotal),
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
  }, [user, token, ordersStore])

  /**
   * Create a new order from cart
   * @param paymentMethod - "cash" or "gcash"
   * @param branch - Customer's selected branch
   * @param notes - Optional order notes
   */
  const createOrder = useCallback(
    async (paymentMethod: "cash" | "gcash", branch: string, notes?: string) => {
      if (!user) throw new Error("User not authenticated")

      if (!token) throw new Error("No authentication token found")

      try {
        ordersStore.setLoading(true)
        ordersStore.setError(null)

        const response = await fetch("/api/customer/orders", {
          method: "POST",
          headers: authHeaders(token),
          body: JSON.stringify({ paymentMethod, branch, notes }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(
            errorData.message || "Failed to create order"
          )
        }

        const data = await response.json()
        const payload = data.data ?? {}
        const orderPayload = (payload.order ?? {}) as ApiOrder
        const order: Order = {
          id: orderPayload.id,
          userId: orderPayload.userId,
          status: orderPayload.status,
          paymentMethod: orderPayload.paymentMethod,
          totalAmount: Number(orderPayload.totalAmount),
          branch: orderPayload.branch,
          notes: orderPayload.notes,
          isPaid: orderPayload.isPaid,
          paidAt: orderPayload.paidAt ? new Date(orderPayload.paidAt) : null,
          createdAt: new Date(orderPayload.createdAt),
          updatedAt: new Date(orderPayload.updatedAt),
          items: orderPayload.items?.map((item: ApiOrderItem) => ({
            id: item.id,
            productId: item.productId,
            productName: item.productName,
            quantity: Number(item.quantity),
            price: Number(item.price),
            subtotal: Number(item.subtotal),
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
    [user, token, ordersStore]
  )

  /**
   * Cancel an order
   */
  const cancelOrder = useCallback(
    async (orderId: string) => {
      if (!user) throw new Error("User not authenticated")
      if (!token) throw new Error("No authentication token found")

      try {
        ordersStore.setLoading(true)
        ordersStore.setError(null)

        const response = await fetch(`/api/customer/orders/${orderId}`, {
          method: "PATCH",
          headers: authHeaders(token ?? ""),
          body: JSON.stringify({ status: "cancelled" }),
        })

        if (!response.ok) throw new Error("Failed to cancel order")

        await response.json()
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
