"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import type { AuthContext as AuthContextType } from "@/types/auth"

interface AuthContextProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<{
  auth: AuthContextType | null
  isLoading: boolean
  setAuth: (auth: AuthContextType | null) => void
  logout: () => void
}>({
  auth: null,
  isLoading: false,
  setAuth: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [auth, setAuth] = useState<AuthContextType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const logout = useCallback(() => {
    setAuth(null)
    // Clear cookies via API
    fetch("/api/auth/logout", { method: "POST" })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        auth,
        isLoading,
        setAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
