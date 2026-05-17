"use client"

import * as React from "react"
import Link from "next/link"
import { LogIn, Mail } from "lucide-react"
import { AuthHeader, PasswordInput, AuthDivider, SocialAuthButtons } from "@/features/user-mgmt"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Stub for now
  }

  return (
    <div className="w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-4 duration-700">
      <AuthHeader subtitle="Your trusted neighborhood partner." />

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Password
                </Label>
                <Link href="#" className="text-xs text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <PasswordInput id="password" required />
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full flex items-center justify-center gap-2 p-5">
                Sign In
                <LogIn className="size-4" />
              </Button>
            </div>
          </form>

          <AuthDivider />
          <SocialAuthButtons />

          <p className="text-center text-sm text-muted-foreground mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
