"use client"

import { Search, Bell, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"

interface AdminTopbarProps {
  title?: string
}

export function AdminTopbar({ title = "Dashboard Overview" }: AdminTopbarProps) {
  // Use a static date or dynamic date. Dynamic date might cause hydration mismatch if not handled.
  // Let's use a static string or handle it in useEffect.
  // For now, let's use a static string to avoid hydration mismatch, or just omit the day name.
  const currentDate = "Monday, May 19, 2025" // Matching prototype or I can use dynamic with mounted check.
  
  return (
    <header className="sticky top-0 z-30 bg-background border-b border-border h-16 flex items-center justify-between px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-foreground">{title}</h1>
        <span className="text-sm text-muted-foreground hidden md:inline">{currentDate}</span>
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
