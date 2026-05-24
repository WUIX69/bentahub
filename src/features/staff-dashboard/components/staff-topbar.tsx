"use client"

import { usePathname } from "next/navigation"
import { Bell } from "lucide-react"

const ROUTE_TITLES: Record<string, string> = {
  "/staff": "Dashboard Overview",
  "/staff/monitoring": "Transaction Monitoring",
  "/staff/inventory": "Inventory Updating",
  "/staff/history": "Transaction History",
  "/staff/pickup": "Payments & Pickup",
}

export function StaffTopbar() {
  const pathname = usePathname()
  const title = ROUTE_TITLES[pathname] || "Staff Dashboard"

  return (
    <header className="bg-white border-b border-border px-6 sticky top-0 z-30 flex justify-between items-center h-[80px] w-full">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-foreground">{title}</h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors border border-border relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>
        </div>

        <div className="h-8 w-px bg-border"></div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/20 select-none">
            DC
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground leading-tight">Dolly Cruz</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
              Branch Staff
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
