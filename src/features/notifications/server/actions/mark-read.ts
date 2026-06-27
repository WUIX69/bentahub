"use server"

import { notifications } from "@/drizzle/schema"
import { getAuthenticatedUser } from "@/lib/auth-utils"
import { markNotificationReadSchema } from "@/features/notifications/schemas/notifications"
import {
  getNotificationByUserAndId,
  updateNotificationReadStatus,
  markAllUserNotificationsRead,
} from "@/features/notifications/server/db/mutations"

export interface MarkNotificationReadResult {
  success: boolean
  data?: typeof notifications.$inferSelect
}

export async function markNotificationRead(
  params: { notificationId: string; isRead: boolean },
): Promise<MarkNotificationReadResult> {
  const user = await getAuthenticatedUser()
  if (!user) {
    return { success: false }
  }
  const userId = user.userId

  const parsed = markNotificationReadSchema.safeParse(params)
  if (!parsed.success) {
    return { success: false }
  }

  const { notificationId, isRead } = parsed.data

  const notification = await getNotificationByUserAndId(userId, notificationId)

  if (!notification) {
    return { success: false }
  }

  const updated = await updateNotificationReadStatus(notificationId, isRead)

  return { success: true, data: updated }
}

export async function markAllNotificationsRead(): Promise<{ success: boolean; updatedCount: number }> {
  const user = await getAuthenticatedUser()
  if (!user) {
    return { success: false, updatedCount: 0 }
  }
  const userId = user.userId

  const updatedCount = await markAllUserNotificationsRead(userId)

  return { success: true, updatedCount }
}
