"use server"

import crypto from "crypto"
import { generateId } from "@/lib/auth-utils"
import { sendPasswordResetEmail } from "@/lib/email-service"
import { forgotPasswordSchema } from "@/features/auth/schemas/auth"
import { getUserByEmail } from "@/features/auth/server/db/get-user"
import {
  deletePasswordResetTokensByUserId,
  getPasswordResetToken,
  createPasswordResetToken,
} from "@/features/auth/server/db/password-reset"

const RESET_TOKEN_EXPIRY_HOURS = 1

export async function forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const parsed = forgotPasswordSchema.safeParse({ email })
    if (!parsed.success) {
      return { success: false, message: "Email is required" }
    }

    const user = await getUserByEmail(email)

    const safeMessage = "If an account exists with this email, a password reset link will be sent"

    if (!user) {
      return { success: true, message: safeMessage }
    }

    await deletePasswordResetTokensByUserId(user.id)

    let resetToken = ""
    let isUnique = false
    let attemptsToGenerate = 0
    while (!isUnique && attemptsToGenerate < 10) {
      resetToken = crypto.randomInt(100000, 999999).toString()
      attemptsToGenerate++
      const existing = await getPasswordResetToken(resetToken)
      if (!existing) {
        isUnique = true
      }
    }

    const expiresAt = new Date(Date.now() + RESET_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000)

    await createPasswordResetToken({
      id: generateId(),
      userId: user.id,
      token: resetToken,
      email: user.email,
      expiresAt,
    })

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`
    const emailSent = await sendPasswordResetEmail(user.email, resetToken, resetLink, user.fullName)

    if (!emailSent) {
      console.error("[Auth] Failed to send password reset email for user:", user.id)
    }

    return { success: true, message: safeMessage }
  } catch (error) {
    console.error("Forgot password error:", error)
    return { success: false, message: "An error occurred during password reset request" }
  }
}
