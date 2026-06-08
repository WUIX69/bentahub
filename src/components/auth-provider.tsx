"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"

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

interface AuthContextValue {
  /** The current authenticated user, or null if not logged in. */
  user: AuthUser | null
  /** True while the initial session check is in-flight. */
  isLoading: boolean
  /** Set or clear the current user (used after login / verify-email). */
  setUser: (user: AuthUser | null) => void
  /** Log out — clears local state and calls the logout API. */
  logout: () => Promise<void>
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  setUser: () => {},
  logout: async () => {},
})

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface AuthProviderProps {
  children: React.ReactNode
}

/**
 * Wraps the application with authentication state.
 *
 * On mount it calls GET /api/auth/verify to check whether the user has a
 * valid `auth_token` cookie. If so, the user data is hydrated into context
 * so that a page refresh does not lose the session.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // --- Hydrate session from cookie on mount --------------------------------

  useEffect(() => {
    let cancelled = false

    async function checkSession() {
      try {
        const response = await fetch("/api/auth/verify", { credentials: "same-origin" })
        const data = await response.json()

        if (!cancelled && data.success && data.data) {
          setUser(data.data)
        }
      } catch {
        // No valid session — user stays null
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    checkSession()

    return () => {
      cancelled = true
    }
  }, [])

  // --- Logout --------------------------------------------------------------

  const logout = useCallback(async () => {
    setUser(null)

    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" })
    } catch {
      // Cookie will expire on its own even if the request fails
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/** Access the auth context. Must be used inside an <AuthProvider>. */
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
