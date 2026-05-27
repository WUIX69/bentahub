"use client"

import { Search, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"

interface AdminTopbarProps {
  pathname?: string
}

export function AdminTopbar({ pathname = "/admin" }: AdminTopbarProps) {
  let title = "Dashboard Overview"
  let subtitle = ""

  if (pathname.includes("/admin/monitoring")) {
    title = "Centralized Monitoring"
    subtitle = "View inventory and sales across all branches in real-time"
  } else if (pathname.includes("/admin/sales")) {
    title = "Sales Report"
    subtitle = "View daily sales and transaction records across all branches."
  } else if (pathname.includes("/admin/reservations")) {
    title = "Reservation Management"
    subtitle = "Monitor and manage all customer reservations across branches with detailed tracking."
  } else if (pathname.includes("/admin/users")) {
    title = "User Management"
    subtitle = "The admin allow to Add, Edit, Remove, and manage users"
  } else if (pathname.includes("/admin/payments")) {
    title = "Payment Management"
    subtitle = "Review and verify payments via cash and GCash"
  } else if (pathname.includes("/admin/history")) {
    title = "Transaction History"
    subtitle = "Review all past transactions from every branch, ensuring accurate record tracking and verification of sales."
  } else if (pathname.includes("/admin/pickups")) {
    title = "Pickup Management"
    subtitle = "Monitor and confirm pickups across all branches in real-time."
  } else if (pathname.includes("/admin/settings")) {
    title = "Settings"
  }

  return (
    <header className="sticky top-0 z-30 bg-background border-b border-border h-20 flex items-center justify-between px-6">
      {/* Left side */}
      <div className="flex flex-col justify-center">
        <h1 className="text-xl font-bold text-foreground leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative w-[300px] hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search anything..."
            className="pl-10 bg-muted/50 border-transparent focus-visible:border-border rounded-lg"
          />
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 size-2 bg-destructive rounded-full" />
          <span className="sr-only">Notifications</span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-accent p-1.5 rounded-lg transition-colors">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&auto=format&fit=crop"
              alt="Admin"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex flex-col items-start hidden sm:flex">
            <span className="text-sm font-medium text-foreground">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  )
}
