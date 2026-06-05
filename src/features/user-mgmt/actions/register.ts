"use server"

import { db } from "@/servers/db"
import { users, emailVerificationCodes } from "@/servers/schemas"
import { eq } from "drizzle-orm"
import { generateId, generateVerificationCode, hashPassword } from "@/lib/auth-utils"
import { sendVerificationEmail } from "@/lib/email-service"
import type { AuthResponse, RegisterPayload } from "@/types/auth"

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  try {
    // Validation
    if (!payload.email || !payload.password || !payload.fullName) {
      return {
        success: false,
        message: "Email, password, and full name are required",
      }
    }

    if (payload.password !== payload.confirmPassword) {
      return {
        success: false,
        message: "Passwords do not match",
      }
    }

    if (payload.password.length < 8) {
      return {
        success: false,
        message: "Password must be at least 8 characters long",
      }
    }

    // Check if email already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, payload.email),
    })

    if (existingUser) {
      return {
        success: false,
        message: "Email already registered",
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(payload.password)

    // Create user
    const userId = generateId()
    await db.insert(users).values({
      id: userId,
      email: payload.email,
      password: hashedPassword,
      fullName: payload.fullName,
      role: "customer",
    })

    // Generate verification code
    const verificationCode = generateVerificationCode()
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

    const verificationId = generateId()
    await db.insert(emailVerificationCodes).values({
      id: verificationId,
      userId,
      code: verificationCode,
      email: payload.email,
      expiresAt,
    })

    // Send verification email
    const emailSent = await sendVerificationEmail(payload.email, verificationCode, payload.fullName)

    if (!emailSent) {
      return {
        success: false,
        message: "Failed to send verification email",
      }
    }

    return {
      success: true,
      message: "Registration successful. Please check your email for the verification code.",
      data: {
        userId,
        email: payload.email,
        requiresEmailVerification: true,
      },
    }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      message: "An error occurred during registration",
    }
  }
}
