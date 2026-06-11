"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TOKEN_STORAGE_KEY = "bentahub_token"

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

/** Build headers with the JWT Bearer token for API calls. */
function authHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Client-side authentication hook.
 *
 * On mount, reads the JWT from localStorage and calls GET /api/auth/verify
 * to validate it.
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
      const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY)

      if (!storedToken) {
        if (!cancelled) {
          setIsAuthenticated(false)
          setUser(null)
          router.push("/login")
        }
        return
      }

      try {
        const response = await fetch("/api/auth/verify", {
          method: "GET",
          headers: authHeaders(storedToken),
        })

        if (!response.ok) {
          if (!cancelled) {
            setIsAuthenticated(false)
            setUser(null)
            localStorage.removeItem(TOKEN_STORAGE_KEY)
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
          localStorage.removeItem(TOKEN_STORAGE_KEY)
          router.push("/login")
        }
      } catch (error) {
        console.error("Auth verification error:", error)
        if (!cancelled) {
          setIsAuthenticated(false)
          setUser(null)
          localStorage.removeItem(TOKEN_STORAGE_KEY)
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
