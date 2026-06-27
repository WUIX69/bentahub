"use server"

import { hashPassword } from "@/lib/auth-utils"
import { resetPasswordSchema } from "@/features/auth/schemas/auth"
import { getUserById, updatePassword } from "@/features/auth/server/db/get-user"
import {
  getPasswordResetToken,
  incrementResetAttempts,
  markPasswordResetTokenAsUsed,
} from "@/features/auth/server/db/password-reset"

const MAX_RESET_ATTEMPTS = 5

export async function resetPassword(token: string, password: string): Promise<{ success: boolean; message: string }> {
  try {
    const parsed = resetPasswordSchema.safeParse({ token, password })
    if (!parsed.success) {
      const errorMap = parsed.error.flatten().fieldErrors
      const firstError = Object.values(errorMap)[0]?.[0] || "Validation failed"
      return { success: false, message: firstError }
    }

    const resetToken = await getPasswordResetToken(token)

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

    await incrementResetAttempts(resetToken.id, resetToken.attempts)

    const user = await getUserById(resetToken.userId)

    if (!user) {
      return { success: false, message: "User not found" }
    }

    const hashedPassword = await hashPassword(password)

    await updatePassword(user.id, hashedPassword)

    await markPasswordResetTokenAsUsed(resetToken.id)

    return { success: true, message: "Password reset successfully" }
  } catch (error) {
    console.error("Reset password error:", error)
    return { success: false, message: "An error occurred during password reset" }
  }
}
