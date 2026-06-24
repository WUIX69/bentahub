export const APP_NAME = "BentaHub" as const

export const USER_ROLES = ["admin", "employee", "customer"] as const
export type UserRole = (typeof USER_ROLES)[number]

export const PAYMENT_METHODS = ["cash", "gcash"] as const
export type PaymentMethod = (typeof PAYMENT_METHODS)[number]

export const BRANCHES = {
  MAIN: "main",
  BRANCH_1: "branch-1",
  BRANCH_2: "branch-2",
} as const
