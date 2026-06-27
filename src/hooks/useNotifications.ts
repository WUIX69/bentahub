import { useCallback } from "react"
import { useNotificationsStore, type Notification } from "@/stores/notificationsStore"
import { useAuth } from "./useAuth"
import { getNotifications } from "@/server/db/get-notifications"
import { markNotificationRead, markAllNotificationsRead } from "@/server/actions/mark-read"

export function useNotifications() {
  const { user } = useAuth()
  const notificationsStore = useNotificationsStore()

  const fetchNotifications = useCallback(
    async (unreadOnly: boolean = false) => {
      if (!user) return
      if (notificationsStore.isLoading) return

      try {
        notificationsStore.setLoading(true)
        notificationsStore.setError(null)

        const result = await getNotifications({
          limit: 50,
          offset: 0,
          unreadOnly,
        })

        const notifications: Notification[] = (result.notifications ?? []).map((n) => ({
          id: n.id,
          userId: n.userId,
          type: n.type as Notification["type"],
          title: n.title,
          message: n.message,
          relatedOrderId: n.relatedOrderId || undefined,
          relatedProductId: n.relatedProductId || undefined,
          isRead: n.isRead,
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

  const markAsRead = useCallback(
    async (notificationId: string) => {
      if (!user) return

      try {
        const result = await markNotificationRead({
          notificationId,
          isRead: true,
        })

        if (!result.success) throw new Error("Failed to mark notification as read")

        notificationsStore.markAsRead(notificationId)
      } catch (error) {
        console.error("Failed to mark notification as read:", error)
        throw error
      }
    },
    [user, notificationsStore]
  )

  const markAllAsRead = useCallback(async () => {
    if (!user) return

    try {
      await markAllNotificationsRead()
      notificationsStore.markAllAsRead()
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error)
      throw error
    }
  }, [user, notificationsStore])

  return {
    notifications: notificationsStore.notifications,
    unreadCount: notificationsStore.unreadCount,
    isLoading: notificationsStore.isLoading,
    error: notificationsStore.error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
  }
}
