import { NextRequest, NextResponse } from "next/server"
import { db } from "@/servers/db"
import { users } from "@/servers/schemas"
import { eq } from "drizzle-orm"
import { verifyPassword, generateToken } from "@/lib/auth-utils"
import { buildAuthCookie } from "@/lib/cookie-utils"
import type { AuthResponse } from "@/types/auth"

/**
 * POST /api/auth/login
 *
 * Authenticates a customer with email + password.
 * On success, sets an httpOnly auth_token cookie — the token is NOT
 * returned in the response body to prevent XSS exposure.
 */
export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body = await request.json()
    const { email, password } = body

    // --- Input validation ---------------------------------------------------

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      )
    }

    // --- Lookup user --------------------------------------------------------

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      )
    }

    // --- Email verification gate (enforced in production) -------------------

    if (!user.isEmailVerified && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { success: false, message: "Please verify your email first" },
        { status: 403 }
      )
    }

    // --- Password check -----------------------------------------------------

    const isPasswordValid = await verifyPassword(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      )
    }

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
        message: "Login successful",
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
    console.error("Login error:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred during login" },
      { status: 500 }
    )
  }
}
