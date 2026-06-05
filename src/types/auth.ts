import type { UserRole } from "@/config/constants"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  branchId: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Session {
  user: User
  expiresAt: Date
}

export interface AuthContext {
  userId: string
  email: string
  role: UserRole
  isEmailVerified: boolean
}

export interface AuthResponse<T = any> {
  success: boolean
  message: string
  data?: T
}

export interface RegisterPayload {
  email: string
  password: string
  confirmPassword: string
  fullName: string
}

export interface VerifyEmailPayload {
  email: string
  code: string
}

export interface LoginPayload {
  email: string
  password: string
}
