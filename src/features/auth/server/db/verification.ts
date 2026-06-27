import { db } from "@/drizzle/db"
import { users, emailVerifications } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export async function getVerificationCodeByUserId(userId: string) {
  return db.query.emailVerifications.findFirst({
    where: eq(emailVerifications.userId, userId),
  })
}

export async function createVerificationCode(data: typeof emailVerifications.$inferInsert) {
  return db.insert(emailVerifications).values(data).returning()
}

export async function deleteVerificationCodesByUserId(userId: string) {
  return db.delete(emailVerifications).where(eq(emailVerifications.userId, userId))
}

export async function incrementVerificationAttempts(id: string, currentAttempts: number) {
  return db
    .update(emailVerifications)
    .set({ attempts: currentAttempts + 1 })
    .where(eq(emailVerifications.id, id))
}

export async function verifyUserEmail(userId: string, verificationId: string) {
  return db.transaction(async (tx) => {
    // 1. Update user email verification status
    await tx
      .update(users)
      .set({ isEmailVerified: true })
      .where(eq(users.id, userId))

    // 2. Delete verification record
    await tx
      .delete(emailVerifications)
      .where(eq(emailVerifications.id, verificationId))
  })
}
