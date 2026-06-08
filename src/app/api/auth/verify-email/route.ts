import { NextRequest, NextResponse } from "next/server"
import { db } from "@/servers/db"
import { users, emailVerificationCodes } from "@/servers/schemas"
import { eq, and } from "drizzle-orm"
import { generateId, generateToken, generateVerificationCode } from "@/lib/auth-utils"
import { sendVerificationEmail } from "@/lib/email-service"
import { buildAuthCookie } from "@/lib/cookie-utils"
import type { AuthResponse, VerifyEmailPayload } from "@/types/auth"

/** Maximum number of verification attempts before a new code must be requested. */
const MAX_VERIFICATION_ATTEMPTS = 5

// ---------------------------------------------------------------------------
// POST /api/auth/verify-email — Verify a 6-digit email code
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body: VerifyEmailPayload = await request.json()

    // --- Input validation ---------------------------------------------------

    if (!body.email || !body.code) {
      return NextResponse.json(
        { success: false, message: "Email and verification code are required" },
        { status: 400 }
      )
    }

    // --- Lookup user --------------------------------------------------------

    const user = await db.query.users.findFirst({
      where: eq(users.email, body.email),
    })

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      )
    }

    if (user.isEmailVerified) {
      return NextResponse.json(
        { success: false, message: "Email already verified" },
        { status: 400 }
      )
    }

    // --- Find matching verification code ------------------------------------

    const verification = await db.query.emailVerificationCodes.findFirst({
      where: and(
        eq(emailVerificationCodes.userId, user.id),
        eq(emailVerificationCodes.code, body.code),
        eq(emailVerificationCodes.email, body.email)
      ),
    })

    if (!verification) {
      return NextResponse.json(
        { success: false, message: "Invalid verification code" },
        { status: 400 }
      )
    }

    // --- Check expiry -------------------------------------------------------

    if (new Date() > verification.expiresAt) {
      return NextResponse.json(
        { success: false, message: "Verification code has expired" },
        { status: 400 }
      )
    }

    // --- Check & increment attempt counter ----------------------------------

    if (verification.attempts >= MAX_VERIFICATION_ATTEMPTS) {
      return NextResponse.json(
        { success: false, message: "Too many attempts. Please request a new code." },
        { status: 400 }
      )
    }

    // Increment attempt count BEFORE checking validity so brute-force is bounded
    await db
      .update(emailVerificationCodes)
      .set({ attempts: verification.attempts + 1 })
      .where(eq(emailVerificationCodes.id, verification.id))

    // --- Mark email as verified ---------------------------------------------

    await db
      .update(users)
      .set({ isEmailVerified: true })
      .where(eq(users.id, user.id))

    // Clean up used verification code
    await db
      .delete(emailVerificationCodes)
      .where(eq(emailVerificationCodes.id, verification.id))

    // --- Issue JWT (cookie only — never in the response body) ---------------

    const token = generateToken({
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    })

    const response = NextResponse.json(
      {
        success: true,
        message: "Email verified successfully",
        data: {
          userId: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
      },
      { status: 200 }
    )

    response.cookies.set(buildAuthCookie(token))

    return response
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred during verification" },
      { status: 500 }
    )
  }
}

// ---------------------------------------------------------------------------
// PUT /api/auth/verify-email — Resend verification code
// ---------------------------------------------------------------------------

export async function PUT(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body = await request.json()

    if (!body.email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      )
    }

    // --- Lookup user --------------------------------------------------------

    const user = await db.query.users.findFirst({
      where: eq(users.email, body.email),
    })

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      )
    }

    if (user.isEmailVerified) {
      return NextResponse.json(
        { success: false, message: "Email already verified" },
        { status: 400 }
      )
    }

    // --- Invalidate old codes and issue a new one ---------------------------

    await db
      .delete(emailVerificationCodes)
      .where(eq(emailVerificationCodes.userId, user.id))

    const code = generateVerificationCode()
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

    await db.insert(emailVerificationCodes).values({
      id: generateId(),
      userId: user.id,
      code,
      email: body.email,
      expiresAt,
    })

    // --- Send email ---------------------------------------------------------

    const emailSent = await sendVerificationEmail(body.email, code, user.fullName)

    if (!emailSent) {
      return NextResponse.json(
        { success: false, message: "Failed to send verification email" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: "Verification code sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Resend verification error:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while resending verification code" },
      { status: 500 }
    )
  }
}
