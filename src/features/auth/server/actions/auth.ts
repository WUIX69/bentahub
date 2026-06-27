"use server"

import { cookies } from "next/headers"
import { db } from "@/drizzle/db"
import { users } from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { verifyPassword, generateToken } from "@/lib/auth-utils"
import { loginSchema } from "@/features/auth/schemas/auth"
import type { AuthResponse, LoginResponseData } from "@/types/auth"

export async function loginAction(payload: Record<string, string>): Promise<AuthResponse<LoginResponseData>> {
  try {
    const parsed = loginSchema.safeParse(payload)
    if (!parsed.success) {
      const errorMap = parsed.error.flatten().fieldErrors
      const firstError = Object.values(errorMap)[0]?.[0] || "Validation failed"
      return { success: false, message: firstError }
    }

    const { email, password } = parsed.data

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (!user) {
      return { success: false, message: "Invalid email or password" }
    }

    if (!user.isEmailVerified && process.env.NODE_ENV === "production") {
      return { success: false, message: "Please verify your email first" }
    }

    const isPasswordValid = await verifyPassword(password, user.password)
    if (!isPasswordValid) {
      return { success: false, message: "Invalid email or password" }
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    })

    const cookieStore = await cookies()
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return {
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          userId: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
        },
      },
    }
  } catch (error) {
    console.error("Login action error:", error)
    return { success: false, message: "An error occurred during login" }
  }
}
