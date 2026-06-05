import { NextRequest, NextResponse } from "next/server"
import { db } from "@/servers/db"
import { users, passwordResetTokens } from "@/servers/schemas"
import { eq, and } from "drizzle-orm"
import { hashPassword } from "@/lib/auth-utils"
import type { AuthResponse } from "@/types/auth"

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body = await request.json()
    const { token, password } = body

    if (!token || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Token and password are required",
        },
        { status: 400 }
      )
    }

    // Validate password
    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters long",
        },
        { status: 400 }
      )
    }

    // Find reset token
    const resetToken = await db.query.passwordResetTokens.findFirst({
      where: eq(passwordResetTokens.token, token),
    })

    if (!resetToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired reset token",
        },
        { status: 400 }
      )
    }

    // Check if token is expired
    if (new Date() > resetToken.expiresAt) {
      return NextResponse.json(
        {
          success: false,
          message: "Reset token has expired",
        },
        { status: 400 }
      )
    }

    // Check if token already used
    if (resetToken.usedAt) {
      return NextResponse.json(
        {
          success: false,
          message: "This reset token has already been used",
        },
        { status: 400 }
      )
    }

    // Check attempt limit
    if (resetToken.attempts >= 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many attempts. Please request a new reset link.",
        },
        { status: 400 }
      )
    }

    // Find user
    const user = await db.query.users.findFirst({
      where: eq(users.id, resetToken.userId),
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      )
    }

    // Hash new password
    const hashedPassword = await hashPassword(password)

    // Update user password
    await db
      .update(users)
      .set({
        password: hashedPassword,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id))

    // Mark token as used
    await db
      .update(passwordResetTokens)
      .set({
        usedAt: new Date(),
      })
      .where(eq(passwordResetTokens.id, resetToken.id))

    console.log("[Auth] Password reset successful:", {
      userId: user.id,
      email: user.email,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Password reset successfully",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during password reset",
      },
      { status: 500 }
    )
  }
}
