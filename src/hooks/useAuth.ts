"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthUser {
  userId: string
  email: string
  fullName: string
}

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          method: "GET",
          credentials: "include",
        })

        if (!response.ok) {
          setIsAuthenticated(false)
          setUser(null)
          router.push("/login")
          return
        }

        const data = await response.json()
        if (data.success && data.data) {
          setUser(data.data)
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          setUser(null)
          router.push("/login")
        }
      } catch (error) {
        console.error("Auth verification error:", error)
        setIsAuthenticated(false)
        setUser(null)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    verifyAuth()
  }, [router])

  return {
    user,
    isAuthenticated,
    isLoading,
  }
}
