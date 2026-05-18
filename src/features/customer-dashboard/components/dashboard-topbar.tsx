"use client"

import { Search, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"

export function DashboardTopbar() {
  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border h-16 flex items-center justify-between px-4 md:px-6">
      {/* Search Bar - Hidden on small screens or adjust layout */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products, orders..."
            className="pl-10 bg-muted/50 border-transparent focus-visible:border-border rounded-lg"
          />
        </div>
      </div>

      {/* Mobile Search Icon placeholder or simple text */}
      <div className="md:hidden font-bold text-lg text-primary">
        BentaHub
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 size-2 bg-destructive rounded-full" />
          <span className="sr-only">Notifications</span>
        </button>

        {/* Vertical Separator */}
        <div className="h-6 w-px bg-border mx-2" />

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
            AR
          </div>
          <span className="text-sm font-medium hidden sm:inline-block text-foreground">Alex Rivera</span>
        </div>
      </div>
    </header>
  )
}

