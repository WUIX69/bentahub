import { db } from "@/drizzle/db"
import { notifications } from "@/drizzle/schema"
import { eq, and } from "drizzle-orm"

export async function getNotificationByUserAndId(userId: string, notificationId: string) {
  const result = await db
    .select()
    .from(notifications)
    .where(
      and(eq(notifications.id, notificationId), eq(notifications.userId, userId))
    )
    .limit(1)
  return result[0] || null
}

export async function updateNotificationReadStatus(notificationId: string, isRead: boolean) {
  const [updated] = await db
    .update(notifications)
    .set({
      isRead,
      readAt: isRead ? new Date() : null,
    })
    .where(eq(notifications.id, notificationId))
    .returning()
  return updated
}

export async function markAllUserNotificationsRead(userId: string) {
  const updated = await db
    .update(notifications)
    .set({
      isRead: true,
      readAt: new Date(),
    })
    .where(
      and(eq(notifications.userId, userId), eq(notifications.isRead, false))
    )
    .returning()
  return updated.length
}
