"use server"

import { db } from "@/drizzle/db"
import { passwordResetTokens } from "@/drizzle/schema"
import { eq, and } from "drizzle-orm"
import { verifyResetCodeSchema } from "@/features/user-mgmt/schemas/auth"

const MAX_RESET_ATTEMPTS = 5

export async function verifyResetCode(email: string, token: string): Promise<{ success: boolean; message: string }> {
  try {
    const parsed = verifyResetCodeSchema.safeParse({ email, token })
    if (!parsed.success) {
      return { success: false, message: "Email and verification code are required" }
    }

    const resetToken = await db.query.passwordResetTokens.findFirst({
      where: and(
        eq(passwordResetTokens.token, token),
        eq(passwordResetTokens.email, email)
      ),
    })

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

    await db
      .update(passwordResetTokens)
      .set({ attempts: resetToken.attempts + 1 })
      .where(eq(passwordResetTokens.id, resetToken.id))

    return { success: true, message: "Code verified successfully" }
  } catch (error) {
    console.error("Verify reset code error:", error)
    return { success: false, message: "An error occurred during verification" }
  }
}
