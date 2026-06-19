"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { UserPlus, Mail, User } from "lucide-react"
import { AuthHeader, PasswordInput } from "@/features/user-mgmt"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { registerUser } from "@/features/user-mgmt/actions/register"
import type { RegisterPayload } from "@/types/auth"

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Client-side validation
      if (!formData.email || !formData.password || !formData.fullName) {
        setError("All fields are required")
        setIsLoading(false)
        return
      }

      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long")
        setIsLoading(false)
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        setIsLoading(false)
        return
      }

      // Call server action
      const result = await registerUser(formData as RegisterPayload)

      if (!result.success) {
        setError(result.message)
        setIsLoading(false)
        return
      }

      // Redirect to login page so user can sign in with their new account
      router.push("/login?registered=true")
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error(err)
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-4 duration-700">
      <AuthHeader subtitle="Create your BentaHub Account" />

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold">Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-xs uppercase tracking-wider text-muted-foreground">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  className="pl-10"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground">
                Password
              </Label>
              <PasswordInput
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
              <p className="text-xs text-muted-foreground">At least 8 characters</p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-xs uppercase tracking-wider text-muted-foreground">
                Confirm Password
              </Label>
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full flex items-center justify-center gap-2 p-5" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Register
                    <UserPlus className="size-4" />
                  </>
                )}
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
