import { db } from "@/drizzle/db"
import { passwordResetTokens } from "@/drizzle/schema"
import { eq, and } from "drizzle-orm"

export async function getPasswordResetToken(token: string) {
  return db.query.passwordResetTokens.findFirst({
    where: eq(passwordResetTokens.token, token),
  })
}

export async function getPasswordResetTokenByEmailAndToken(email: string, token: string) {
  return db.query.passwordResetTokens.findFirst({
    where: and(
      eq(passwordResetTokens.token, token),
      eq(passwordResetTokens.email, email)
    ),
  })
}

export async function createPasswordResetToken(data: typeof passwordResetTokens.$inferInsert) {
  return db.insert(passwordResetTokens).values(data).returning()
}

export async function deletePasswordResetTokensByUserId(userId: string) {
  return db.delete(passwordResetTokens).where(eq(passwordResetTokens.userId, userId))
}

export async function incrementResetAttempts(id: string, currentAttempts: number) {
  return db
    .update(passwordResetTokens)
    .set({ attempts: currentAttempts + 1 })
    .where(eq(passwordResetTokens.id, id))
}

export async function markPasswordResetTokenAsUsed(id: string) {
  return db
    .update(passwordResetTokens)
    .set({ usedAt: new Date() })
    .where(eq(passwordResetTokens.id, id))
}
