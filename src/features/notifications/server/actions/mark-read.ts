"use server"

import type { NotificationRole } from "../db/get-notifications"

export interface MarkReadParams {
  notificationIds: string[]
  role: NotificationRole
}

export interface MarkReadResult {
  success: boolean
  updatedCount: number
}

export async function markNotificationsRead(
  _params: MarkReadParams,
): Promise<MarkReadResult> {
  // Stub: real implementation will UPDATE notifications SET is_read = true
  // WHERE id IN (notificationIds) AND user_unused = role
  //
  // throw new Error("Not implemented: DB query not wired yet")

  return {
    success: true,
    updatedCount: _params.notificationIds.length,
  }
}

export async function markAllNotificationsRead(): Promise<MarkReadResult> {
  // Stub: real implementation will UPDATE notifications SET is_read = true
  // WHERE user_unused = role
  //
  // throw new Error("Not implemented: DB query not wired yet")

  return {
    success: true,
    updatedCount: 0,
  }
}
