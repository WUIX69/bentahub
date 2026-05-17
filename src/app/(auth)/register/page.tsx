"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Mail, Phone, User } from "lucide-react"
import { AuthHeader, PasswordInput, RoleToggle, Role } from "@/features/user-mgmt"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function RegisterPage() {
  const [role, setRole] = React.useState<Role>("customer")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Stub for now
  }

  return (
    <div className="w-full max-w-[520px] animate-in fade-in slide-in-from-bottom-4 duration-700">
      <AuthHeader />
      
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold">Create an account</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Join our neighborhood partner ecosystem today.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="full_name" className="text-xs uppercase tracking-wider text-muted-foreground">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
                <Input
                  id="full_name"
                  type="text"
                  placeholder="John Doe"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs uppercase tracking-wider text-muted-foreground">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Role
              </Label>
              <RoleToggle value={role} onChange={setRole} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground">
                Password
              </Label>
              <PasswordInput id="password" required />
              <p className="text-xs text-muted-foreground mt-1">
                Minimum 8 characters with one special symbol.
              </p>
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full flex items-center justify-center gap-2">
                Sign Up
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Sign in instead
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
