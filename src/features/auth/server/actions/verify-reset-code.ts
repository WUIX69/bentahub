"use server"

import { verifyResetCodeSchema } from "@/features/auth/schemas/auth"
import { getPasswordResetTokenByEmailAndToken, incrementResetAttempts } from "@/features/auth/server/db/password-reset"

const MAX_RESET_ATTEMPTS = 5

export async function verifyResetCode(email: string, token: string): Promise<{ success: boolean; message: string }> {
  try {
    const parsed = verifyResetCodeSchema.safeParse({ email, token })
    if (!parsed.success) {
      return { success: false, message: "Email and verification code are required" }
    }

    const resetToken = await getPasswordResetTokenByEmailAndToken(email, token)

    if (!resetToken) {
      return { success: false, message: "Invalid verification code" }
    }

    if (new Date() > resetToken.expiresAt) {
      return { success: false, message: "Verification code has expired" }
    }

    if (resetToken.usedAt) {
      return { success: false, message: "This verification code has already been used" }
    }

    if (resetToken.attempts >= MAX_RESET_ATTEMPTS) {
      return { success: false, message: "Too many attempts. Please request a new code." }
    }

    await incrementResetAttempts(resetToken.id, resetToken.attempts)

    return { success: true, message: "Code verified successfully" }
  } catch (error) {
    console.error("Verify reset code error:", error)
    return { success: false, message: "An error occurred during verification" }
  }
}
