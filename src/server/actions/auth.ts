"use server"

import { cookies } from "next/headers"
import { extractToken, verifyToken } from "@/lib/auth-utils"
import { getSharedUserById } from "@/server/db/users"
import type { AuthResponse } from "@/types/auth"

export async function logoutAction(): Promise<{ success: boolean; message: string }> {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("auth_token")
    return { success: true, message: "Logged out successfully" }
  } catch (error) {
    console.error("Logout action error:", error)
    return { success: false, message: "An error occurred during logout" }
  }
}

export async function verifySessionAction(): Promise<AuthResponse> {
  try {
    const cookieStore = await cookies()
    const token = extractToken({ cookies: cookieStore })

    if (!token) {
      return { success: false, message: "No token provided" }
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return { success: false, message: "Invalid or expired token" }
    }

    const user = await getSharedUserById(decoded.userId)

    if (!user || !user.isActive) {
      return { success: false, message: "User not found or deactivated" }
    }

    return {
      success: true,
      message: "Token is valid",
      data: {
        userId: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
    }
  } catch (error) {
    console.error("Session verification action error:", error)
    return { success: false, message: "An error occurred during verification" }
  }
}
