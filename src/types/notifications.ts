export type NotificationCategory = "inventory" | "system" | "user" | "order" | "payment" | "offer"

export type NotificationSeverity = "critical" | "info" | "success" | "warning"

export interface Notification {
  id: string
  title: string
  description?: string
  category: NotificationCategory
  severity: NotificationSeverity
  timestamp: string
  isRead: boolean
  actionLabel?: string
  actionHref?: string
  icon?: string
}
