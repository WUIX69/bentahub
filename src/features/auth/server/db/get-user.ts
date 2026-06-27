"use server"

import { db } from "@/drizzle/db"
import { users } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

/**
 * NOTE: The following database helpers are currently unused by the active auth
 * server actions (which query Drizzle directly), but are retained here for
 * future query refactoring and database access encapsulation.
 */

export async function getUserByEmail(email: string) {
  return db.query.users.findFirst({
    where: eq(users.email, email),
  })
}

export async function getUserById(id: string) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  })
}

export async function updatePassword(userId: string, hashedPassword: string) {
  await db
    .update(users)
    .set({ password: hashedPassword, updatedAt: new Date() })
    .where(eq(users.id, userId))
}
