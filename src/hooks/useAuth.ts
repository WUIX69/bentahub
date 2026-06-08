"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AuthUser {
  userId: string
  email: string
  fullName: string
  role: string
  isEmailVerified: boolean
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Client-side authentication hook.
 *
 * On mount, calls GET /api/auth/verify to check the auth_token cookie.
 * - If valid → populates `user` and sets `isAuthenticated = true`.
 * - If invalid/missing → redirects to /login.
 *
 * Use this hook in any page or component that requires authentication.
 */
export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function verifyAuth() {
      try {
        const response = await fetch("/api/auth/verify", {
          method: "GET",
          credentials: "include",
        })

        if (!response.ok) {
          if (!cancelled) {
            setIsAuthenticated(false)
            setUser(null)
            router.push("/login")
          }
          return
        }

        const data = await response.json()

        if (!cancelled && data.success && data.data) {
          setUser(data.data)
          setIsAuthenticated(true)
        } else if (!cancelled) {
          setIsAuthenticated(false)
          setUser(null)
          router.push("/login")
        }
      } catch (error) {
        console.error("Auth verification error:", error)
        if (!cancelled) {
          setIsAuthenticated(false)
          setUser(null)
          router.push("/login")
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    verifyAuth()

    return () => {
      cancelled = true
    }
  }, [router])

  return { user, isAuthenticated, isLoading }
}
