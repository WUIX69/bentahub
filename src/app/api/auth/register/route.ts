import { NextRequest, NextResponse } from "next/server"
import { db } from "@/servers/db"
import { users, emailVerificationCodes } from "@/servers/schemas"
import { eq } from "drizzle-orm"
import { generateId, generateVerificationCode, hashPassword } from "@/lib/auth-utils"
import { sendVerificationEmail } from "@/lib/email-service"
import type { AuthResponse, RegisterPayload } from "@/types/auth"

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body: RegisterPayload = await request.json()

    // Validation
    if (!body.email || !body.password || !body.fullName) {
      return NextResponse.json(
        {
          success: false,
          message: "Email, password, and full name are required",
        },
        { status: 400 }
      )
    }

    if (body.password !== body.confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Passwords do not match",
        },
        { status: 400 }
      )
    }

    if (body.password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters long",
        },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, body.email),
    })

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already registered",
        },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(body.password)

    // Create user
    const userId = generateId()
    const newUser = await db.insert(users).values({
      id: userId,
      email: body.email,
      password: hashedPassword,
      fullName: body.fullName,
      role: "customer", // Default role
    })

    // Generate verification code
    const verificationCode = generateVerificationCode()
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

    const verificationId = generateId()
    await db.insert(emailVerificationCodes).values({
      id: verificationId,
      userId,
      code: verificationCode,
      email: body.email,
      expiresAt,
    })

    // Send verification email
    const emailSent = await sendVerificationEmail(body.email, verificationCode, body.fullName)

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
      {
        success: false,
        message: "An error occurred during registration",
      },
      { status: 500 }
    )
  }
}
