"use server"

import { db } from "@/drizzle/db"
import { notifications } from "@/drizzle/schema"
import { eq, and } from "drizzle-orm"

export interface MarkNotificationReadParams {
  notificationId: string
  userId: string
  isRead: boolean
}

export interface MarkNotificationReadResult {
  success: boolean
  data?: typeof notifications.$inferSelect
}

export async function markNotificationRead(
  params: MarkNotificationReadParams,
): Promise<MarkNotificationReadResult> {
  const { notificationId, userId, isRead } = params

  const notification = await db
    .select()
    .from(notifications)
    .where(
      and(eq(notifications.id, notificationId), eq(notifications.userId, userId)),
    )
    .limit(1)

  if (!notification.length) {
    return { success: false }
  }

  const updated = await db
    .update(notifications)
    .set({
      isRead,
      readAt: isRead ? new Date() : null,
    })
    .where(eq(notifications.id, notificationId))
    .returning()

  return { success: true, data: updated[0] }
}

export async function markAllNotificationsRead(
  userId: string,
): Promise<{ success: boolean; updatedCount: number }> {
  const updated = await db
    .update(notifications)
    .set({
      isRead: true,
      readAt: new Date(),
    })
    .where(
      and(eq(notifications.userId, userId), eq(notifications.isRead, false)),
    )
    .returning()

  return { success: true, updatedCount: updated.length }
}
