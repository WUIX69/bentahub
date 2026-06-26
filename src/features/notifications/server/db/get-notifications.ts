"use server"

import { db } from "@/drizzle/db"
import { notifications } from "@/drizzle/schema"
import { eq, and, desc } from "drizzle-orm"

export interface GetNotificationsParams {
  userId: string
  limit?: number
  offset?: number
  unreadOnly?: boolean
}

export interface GetNotificationsResult {
  notifications: (typeof notifications.$inferSelect)[]
  unreadCount: number
}

export async function getNotifications(
  params: GetNotificationsParams,
): Promise<GetNotificationsResult> {
  const { userId, limit = 20, offset = 0, unreadOnly = false } = params

  const conditions = [eq(notifications.userId, userId)]
  if (unreadOnly) {
    conditions.push(eq(notifications.isRead, false))
  }

  const userNotifications = await db
    .select()
    .from(notifications)
    .where(and(...conditions))
    .orderBy(desc(notifications.createdAt))
    .limit(limit)
    .offset(offset)

  const unreadNotifications = await db
    .select()
    .from(notifications)
    .where(
      and(eq(notifications.userId, userId), eq(notifications.isRead, false)),
    )

  return {
    notifications: userNotifications,
    unreadCount: unreadNotifications.length,
  }
}
