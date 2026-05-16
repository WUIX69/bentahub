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
