import { useCallback } from "react"
import { useNotificationsStore, type Notification } from "@/stores/notificationsStore"
import { useAuth } from "./useAuth"
import { getNotifications } from "@/features/notifications/server/db/get-notifications"
import { markNotificationRead, markAllNotificationsRead } from "@/features/notifications/server/actions/mark-read"

function decodeUserId(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    return payload.userId || null
  } catch {
    return null
  }
}

export function useNotifications() {
  const { user, token } = useAuth()
  const notificationsStore = useNotificationsStore()

  const fetchNotifications = useCallback(
    async (unreadOnly: boolean = false) => {
      if (!user) return
      if (!token) return
      if (notificationsStore.isLoading) return

      try {
        notificationsStore.setLoading(true)
        notificationsStore.setError(null)

        const userId = decodeUserId(token)
        if (!userId) throw new Error("Invalid token")

        const result = await getNotifications({
          userId,
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
    [user, token, notificationsStore]
  )

  const markAsRead = useCallback(
    async (notificationId: string) => {
      if (!user) return
      if (!token) return

      try {
        const userId = decodeUserId(token)
        if (!userId) throw new Error("Invalid token")

        const result = await markNotificationRead({
          notificationId,
          userId,
          isRead: true,
        })

        if (!result.success) throw new Error("Failed to mark notification as read")

        notificationsStore.markAsRead(notificationId)
      } catch (error) {
        console.error("Failed to mark notification as read:", error)
        throw error
      }
    },
    [user, token, notificationsStore]
  )

  const markAllAsRead = useCallback(async () => {
    if (!user) return
    if (!token) return

    try {
      const userId = decodeUserId(token)
      if (!userId) throw new Error("Invalid token")

      await markAllNotificationsRead(userId)
      notificationsStore.markAllAsRead()
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error)
      throw error
    }
  }, [user, token, notificationsStore])

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
