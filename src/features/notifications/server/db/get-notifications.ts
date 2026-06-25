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
  void _params;
  return {
    notifications: [],
    total: 0,
    hasMore: false,
  }
}
