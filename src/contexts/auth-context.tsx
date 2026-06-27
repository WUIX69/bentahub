"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import { logoutAction, verifySessionAction } from "@/server/actions/auth"

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
  /** True when a valid user session exists. */
  isAuthenticated: boolean
  /** Set or clear the current user (used after login / verify-email). */
  setUser: (user: AuthUser | null) => void
  /** Log out — clears local state and removes the stored token. */
  logout: () => Promise<void>
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const AuthContext = createContext<AuthContextValue | null>(null)

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface AuthProviderProps {
  children: React.ReactNode
}

/**
 * Wraps the application with authentication state.
 *
 * On mount it executes verifySessionAction to check the secure HTTP-only
 * cookie and hydrate the user session state.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const isAuthenticated = Boolean(user)

  // --- Hydrate session from secure HTTP-only cookie on mount -----------------

  useEffect(() => {
    let cancelled = false
    let isChecking = false

    async function checkSession() {
      if (isChecking) return
      isChecking = true

      try {
        const result = await verifySessionAction()

        if (!cancelled) {
          if (result.success && result.data) {
            setUser(result.data as AuthUser)
          } else {
            setUser(null)
          }
        }
      } catch (err) {
        console.error("Error during auth verification:", err)
        if (!cancelled) {
          setUser(null)
        }
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
      await logoutAction()
    } catch (err) {
      console.error("Error during logout action:", err)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, setUser, logout }}>
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

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
