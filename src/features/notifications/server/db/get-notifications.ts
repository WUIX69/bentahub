import type { NotificationItem } from "../../components/notifications-feed"

export type NotificationRole = "admin" | "employee" | "customer"

export interface GetNotificationsParams {
  role: NotificationRole
  filter?: "all" | "orders" | "payments" | "system"
  offset?: number
  limit?: number
}

export interface GetNotificationsResult {
  notifications: NotificationItem[]
  total: number
  hasMore: boolean
}

export async function getNotifications(
  _params: GetNotificationsParams,
): Promise<GetNotificationsResult> {
  // Stub: real implementation will query the database via Drizzle ORM.
  // Admin   → notifications.branch_events + notifications.system_alerts
  // Employee → notifications.branch_operational
  // Customer → notifications.user_notifications WHERE user_id = ?
  //
  // throw new Error("Not implemented: use mock data in components until DB schema is ready")

  return {
    notifications: [],
    total: 0,
    hasMore: false,
  }
}
