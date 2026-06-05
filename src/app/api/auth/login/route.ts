import { NextRequest, NextResponse } from "next/server"
import { db } from "@/servers/db"
import { users } from "@/servers/schemas"
import { eq } from "drizzle-orm"
import { verifyPassword, generateToken } from "@/lib/auth-utils"
import type { AuthResponse } from "@/types/auth"

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      )
    }

    // Check if email is verified (skip in development)
    if (!user.isEmailVerified && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          success: false,
          message: "Please verify your email first",
        },
        { status: 403 }
      )
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      )
    }

    // Generate token
    const token = generateToken(user.id, user.email, user.fullName)
    console.log("[Auth] Token generated:", {
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      tokenPreview: token.substring(0, 30),
    })

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: {
          userId: user.id,
          email: user.email,
          fullName: user.fullName,
          token,
        },
      },
      { status: 200 }
    )

    // Set auth token cookie
    const isProduction = process.env.NODE_ENV === "production"
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "lax" : "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during login",
      },
      { status: 500 }
    )
  }
}
