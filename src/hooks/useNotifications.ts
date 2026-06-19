import { useCallback } from "react"
import { useNotificationsStore, type Notification } from "@/stores/notificationsStore"
import { useAuth } from "./useAuth"

export function useNotifications() {
  const { user } = useAuth()
  const notificationsStore = useNotificationsStore()

  /**
   * Fetch user's notifications from backend
   */
  const fetchNotifications = useCallback(
    async (unreadOnly: boolean = false) => {
      if (!user) return

      try {
        notificationsStore.setLoading(true)
        notificationsStore.setError(null)

        const params = new URLSearchParams()
        params.append("limit", "50")
        params.append("offset", "0")
        if (unreadOnly) params.append("unreadOnly", "true")

        const response = await fetch(
          `/api/customer/notifications?${params.toString()}`
        )
        if (!response.ok) throw new Error("Failed to fetch notifications")

        const data = await response.json()
        const notifications: Notification[] = data.map((n: any) => ({
          ...n,
          readAt: n.readAt ? new Date(n.readAt) : null,
          createdAt: new Date(n.createdAt),
          expiresAt: n.expiresAt ? new Date(n.expiresAt) : null,
        }))

        notificationsStore.setNotifications(notifications)
        return notifications
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        notificationsStore.setError(message)
        console.error("Failed to fetch notifications:", error)
        throw error
      } finally {
        notificationsStore.setLoading(false)
      }
    },
    [user, notificationsStore]
  )

  /**
   * Mark a notification as read
   */
  const markAsRead = useCallback(
    async (notificationId: string) => {
      if (!user) return

      try {
        const response = await fetch(
          `/api/customer/notifications/${notificationId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isRead: true }),
          }
        )

        if (!response.ok) throw new Error("Failed to mark notification as read")

        notificationsStore.markAsRead(notificationId)
      } catch (error) {
        console.error("Failed to mark notification as read:", error)
        throw error
      }
    },
    [user, notificationsStore]
  )

  /**
   * Mark all notifications as read
   */
  const markAllAsRead = useCallback(async () => {
    if (!user) return

    try {
      notificationsStore.markAllAsRead()
      // Optionally sync with backend if needed
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error)
      throw error
    }
  }, [user, notificationsStore])

  return {
    // State
    notifications: notificationsStore.notifications,
    unreadCount: notificationsStore.unreadCount,
    isLoading: notificationsStore.isLoading,
    error: notificationsStore.error,

    // Actions
    fetchNotifications,
    markAsRead,
    markAllAsRead,
  }
}
