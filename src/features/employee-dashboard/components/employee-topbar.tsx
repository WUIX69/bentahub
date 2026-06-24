"use client"

import { usePathname, useRouter } from "next/navigation"
import { Bell, Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/hooks/useAuth"

const ROUTE_TITLES: Record<string, string> = {
  "/employee": "Dashboard Overview",
  "/employee/pos": "POS System",
  "/employee/payments": "Payments History",
  "/employee/transactions": "Transaction History",
  "/employee/inventory": "Inventory Stock",
  "/employee/pickup": "Payments & Pickups",
  "/employee/stock-check": "Stock Checking",
  "/employee/monitoring": "Live Monitoring",
  "/employee/notifications": "Notifications",
}

interface EmployeeTopbarProps {
  onToggleSidebar?: () => void
}

export function EmployeeTopbar({ onToggleSidebar }: EmployeeTopbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuth()

  const title = ROUTE_TITLES[pathname] || "Employee Dashboard"
  const fullName = user?.fullName || "Employee User"
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase() || "EM"

  return (
    <header className="bg-card border-b border-border px-4 md:px-6 sticky top-0 z-30 flex justify-between items-center h-[80px] w-full">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors md:hidden flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-foreground truncate">{title}</h1>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        {/* Theme Toggle */}
        <ThemeToggle />

        <button
          onClick={() => router.push("/employee/notifications")}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors border border-border relative flex-shrink-0"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-card"></span>
        </button>

        <div className="h-8 w-px bg-border hidden sm:block"></div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/20 select-none flex-shrink-0">
            {initials}
          </div>
          <div className="flex-col hidden sm:flex">
            <span className="text-sm font-bold text-foreground leading-tight">{fullName}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
              Store Employee
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
