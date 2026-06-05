import { NextRequest, NextResponse } from "next/server"
import { db } from "@/servers/db"
import { users, passwordResetTokens } from "@/servers/schemas"
import { eq } from "drizzle-orm"
import { generateId } from "@/lib/auth-utils"
import { sendPasswordResetEmail } from "@/lib/email-service"
import crypto from "crypto"
import type { AuthResponse } from "@/types/auth"

function generateResetToken(): string {
  return crypto.randomBytes(32).toString("hex")
}

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    // Security: Don't reveal if user exists or not
    if (!user) {
      return NextResponse.json(
        {
          success: true,
          message: "If an account exists with this email, a password reset link will be sent",
        },
        { status: 200 }
      )
    }

    // Generate reset token
    const resetToken = generateResetToken()
    const tokenId = generateId()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now

    // Store token in database
    await db.insert(passwordResetTokens).values({
      id: tokenId,
      userId: user.id,
      token: resetToken,
      email: user.email,
      expiresAt,
    })

    // Generate reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`

    // Send email
    const emailSent = await sendPasswordResetEmail(user.email, resetLink, user.fullName)

    if (!emailSent) {
      console.error("Failed to send password reset email")
      // Still return success to avoid revealing email addresses
    }

    console.log("[Auth] Password reset token generated:", {
      userId: user.id,
      email: user.email,
      tokenPreview: resetToken.substring(0, 20),
      expiresAt,
    })

    return NextResponse.json(
      {
        success: true,
        message: "If an account exists with this email, a password reset link will be sent",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during password reset request",
      },
      { status: 500 }
    )
  }
}
