"use server"

import { db } from "@/drizzle/db"
import { users, passwordResetTokens } from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { hashPassword } from "@/lib/auth-utils"

const MIN_PASSWORD_LENGTH = 8
const MAX_RESET_ATTEMPTS = 5

export async function resetPassword(token: string, password: string): Promise<{ success: boolean; message: string }> {
  try {
    if (!token || !password) {
      return { success: false, message: "Token and password are required" }
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return {
        success: false,
        message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
      }
    }

    const resetToken = await db.query.passwordResetTokens.findFirst({
      where: eq(passwordResetTokens.token, token),
    })

    if (!resetToken) {
      return { success: false, message: "Invalid or expired reset token" }
    }

    if (new Date() > resetToken.expiresAt) {
      return { success: false, message: "Reset token has expired" }
    }

    if (resetToken.usedAt) {
      return { success: false, message: "This reset token has already been used" }
    }

    if (resetToken.attempts >= MAX_RESET_ATTEMPTS) {
      return { success: false, message: "Too many attempts. Please request a new reset link." }
    }

    await db
      .update(passwordResetTokens)
      .set({ attempts: resetToken.attempts + 1 })
      .where(eq(passwordResetTokens.id, resetToken.id))

    const user = await db.query.users.findFirst({
      where: eq(users.id, resetToken.userId),
    })

    if (!user) {
      return { success: false, message: "User not found" }
    }

    const hashedPassword = await hashPassword(password)

    await db
      .update(users)
      .set({ password: hashedPassword, updatedAt: new Date() })
      .where(eq(users.id, user.id))

    await db
      .update(passwordResetTokens)
      .set({ usedAt: new Date() })
      .where(eq(passwordResetTokens.id, resetToken.id))

    return { success: true, message: "Password reset successfully" }
  } catch (error) {
    console.error("Reset password error:", error)
    return { success: false, message: "An error occurred during password reset" }
  }
}
