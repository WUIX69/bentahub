import { NextRequest, NextResponse } from "next/server"
import { db } from "@/servers/db"
import { users, emailVerificationCodes } from "@/servers/schemas"
import { eq, and } from "drizzle-orm"
import { generateToken } from "@/lib/auth-utils"
import type { AuthResponse, VerifyEmailPayload } from "@/types/auth"

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body: VerifyEmailPayload = await request.json()

    // Validation
    if (!body.email || !body.code) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and verification code are required",
        },
        { status: 400 }
      )
    }

    // Find the user
    const user = await db.query.users.findFirst({
      where: eq(users.email, body.email),
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

    // Check if already verified
    if (user.isEmailVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already verified",
        },
        { status: 400 }
      )
    }

    // Find the verification code
    const verification = await db.query.emailVerificationCodes.findFirst({
      where: and(
        eq(emailVerificationCodes.userId, user.id),
        eq(emailVerificationCodes.code, body.code),
        eq(emailVerificationCodes.email, body.email)
      ),
    })

    if (!verification) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid verification code",
        },
        { status: 400 }
      )
    }

    // Check if code is expired
    if (new Date() > verification.expiresAt) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification code has expired",
        },
        { status: 400 }
      )
    }

    // Check attempt limit
    if (verification.attempts >= 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many attempts. Please request a new code.",
        },
        { status: 400 }
      )
    }

    // Verify email and update user
    await db
      .update(users)
      .set({
        isEmailVerified: true,
      })
      .where(eq(users.id, user.id))

    // Delete used verification code
    await db.delete(emailVerificationCodes).where(eq(emailVerificationCodes.id, verification.id))

    // Generate auth token
    const token = generateToken(user.id, user.email, user.fullName)

    // Create response with cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Email verified successfully",
        data: {
          userId: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          token,
        },
      },
      { status: 200 }
    )

    // Set HTTP-only cookie for token
    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during verification",
      },
      { status: 500 }
    )
  }
}

// Resend verification code
export async function PUT(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body = await request.json()

    if (!body.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      )
    }

    // Find the user
    const user = await db.query.users.findFirst({
      where: eq(users.email, body.email),
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

    if (user.isEmailVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already verified",
        },
        { status: 400 }
      )
    }

    // Delete old verification codes
    await db.delete(emailVerificationCodes).where(eq(emailVerificationCodes.userId, user.id))

    // Generate new code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

    const verificationId = generateId()

    await db.insert(emailVerificationCodes).values({
      id: verificationId,
      userId: user.id,
      code: verificationCode,
      email: body.email,
      expiresAt,
    })

    // Send email
    const { sendVerificationEmail } = await import("@/lib/email-service")
    const emailSent = await sendVerificationEmail(body.email, verificationCode, user.fullName)

    if (!emailSent) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send verification email",
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Verification code sent successfully",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Resend verification error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while resending verification code",
      },
      { status: 500 }
    )
  }
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
