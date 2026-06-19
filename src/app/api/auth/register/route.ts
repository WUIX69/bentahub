import { NextRequest, NextResponse } from "next/server"
import { db } from "@/servers/db"
import { users, emailVerificationCodes } from "@/servers/schemas"
import { eq } from "drizzle-orm"
import { generateId, generateVerificationCode, hashPassword } from "@/lib/auth-utils"
import { sendVerificationEmail } from "@/lib/email-service"
import type { AuthResponse, RegisterPayload } from "@/types/auth"

/** Minimum password length enforced at registration. */
const MIN_PASSWORD_LENGTH = 8

/** Verification code expiry in minutes. */
const VERIFICATION_CODE_EXPIRY_MINUTES = 15

/**
 * POST /api/auth/register
 *
 * Creates a new customer account and sends a 6-digit email verification code.
 * The user must verify their email before they can log in (enforced in production).
 */
export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body: RegisterPayload = await request.json()

    // --- Input validation ---------------------------------------------------

    if (!body.email || !body.password || !body.fullName) {
      return NextResponse.json(
        { success: false, message: "Email, password, and full name are required" },
        { status: 400 }
      )
    }

    if (body.password !== body.confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Passwords do not match" },
        { status: 400 }
      )
    }

    if (body.password.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
        },
        { status: 400 }
      )
    }

    // --- Check email uniqueness ---------------------------------------------

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, body.email),
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 409 }
      )
    }

    // --- Create user --------------------------------------------------------

    const hashedPassword = await hashPassword(body.password)
    const userId = generateId()

    await db.insert(users).values({
      id: userId,
      email: body.email,
      password: hashedPassword,
      fullName: body.fullName,
      role: "customer",
    })

    // --- Generate & store verification code ---------------------------------

    const verificationCode = generateVerificationCode()
    const expiresAt = new Date(Date.now() + VERIFICATION_CODE_EXPIRY_MINUTES * 60 * 1000)

    await db.insert(emailVerificationCodes).values({
      id: generateId(),
      userId,
      code: verificationCode,
      email: body.email,
      expiresAt,
    })

    // --- Send verification email --------------------------------------------

    const emailSent = await sendVerificationEmail(body.email, verificationCode, body.fullName)

    if (!emailSent) {
      return NextResponse.json(
        { success: false, message: "Failed to send verification email" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful. Please check your email for the verification code.",
        data: {
          userId,
          email: body.email,
          requiresEmailVerification: true,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred during registration" },
      { status: 500 }
    )
  }
}
