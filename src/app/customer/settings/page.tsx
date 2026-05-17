"use client"

import { Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
          Profile & Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your account preferences and profile details.
        </p>
      </div>

      {/* Placeholder Card */}
      <div className="bg-card border border-border rounded-xl p-12 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="size-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Settings className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="font-heading text-lg font-bold text-foreground mb-1">
          Settings Coming Soon
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          We are working on this feature. Soon you&apos;ll be able to update your profile, change password, and manage notifications here.
        </p>
      </div>
    </div>
  )
}
