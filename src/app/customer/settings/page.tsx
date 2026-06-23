"use client"

import { useMemo } from "react"
import { Settings, LogOut, User, Mail, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

export default function SettingsPage() {
  const { user, isLoading, logout } = useAuth()

  const statusLabel = useMemo(() => {
    if (!user) return "Not signed in"
    return user.isEmailVerified ? "Verified" : "Unverified"
  }, [user])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading account settings...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Please sign in to manage your account.</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-12 shadow-sm text-center">
          <p className="text-sm text-muted-foreground">No authenticated user was found. Return to login to continue.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Profile & Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences and profile details.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
              {user.fullName
                .split(" ")
                .map((part) => part.charAt(0).toUpperCase())
                .slice(0, 2)
                .join("")}
            </div>
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-[0.2em]">Account</p>
              <h2 className="text-2xl font-semibold text-foreground">{user.fullName}</h2>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-xl border border-border bg-muted p-4">
              <div className="flex items-center gap-3 text-muted-foreground mb-2">
                <User className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.2em]">Role</span>
              </div>
              <p className="text-sm text-foreground capitalize">{user.role}</p>
            </div>

            <div className="rounded-xl border border-border bg-muted p-4">
              <div className="flex items-center gap-3 text-muted-foreground mb-2">
                <Mail className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.2em]">Email</span>
              </div>
              <p className="text-sm text-foreground break-all">{user.email}</p>
            </div>

            <div className="rounded-xl border border-border bg-muted p-4">
              <div className="flex items-center gap-3 text-muted-foreground mb-2">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.2em]">Email status</span>
              </div>
              <p className="text-sm text-foreground">{statusLabel}</p>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Account actions</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Use the controls below to sign out of BentaHub and manage your session.
            </p>
            <Button
              variant="secondary"
              className="w-full gap-2"
              onClick={() => void logout()}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}
