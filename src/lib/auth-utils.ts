import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import type { User } from "@/servers/schemas"

const SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export function generateId(): string {
  // Using a simple UUID-like generation since crypto.randomUUID might not be available in all environments
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(10)
  return bcryptjs.hash(password, salt)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(password, hash)
}

export function generateToken(userId: string, email: string, fullName: string): string {
  return jwt.sign({ userId, email, fullName }, SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string): { userId: string; email: string; fullName: string } | null {
  try {
    const decoded = jwt.verify(token, SECRET) as { userId: string; email: string; fullName: string }
    return decoded
  } catch (error) {
    console.error("[Auth] Token verification failed:", {
      error: error instanceof Error ? error.message : String(error),
      secretLength: SECRET.length,
      tokenPreview: token.substring(0, 20),
    })
    return null
  }
}
