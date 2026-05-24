"use client"

import { usePathname } from "next/navigation"
import { Bell, Menu } from "lucide-react"

interface CashierTopbarProps {
  onToggleSidebar?: () => void
}

export function CashierTopbar({ onToggleSidebar }: CashierTopbarProps) {
  const pathname = usePathname()

  let title = "POS System"
  if (pathname === "/cashier/stock-check") {
    title = "Stock Check"
  } else if (pathname === "/cashier/payments") {
    title = "Validate Payments"
  } else if (pathname === "/cashier/transactions") {
    title = "Transaction History"
  }

  return (
    <header className="bg-white border-b border-slate-200 px-4 md:px-6 sticky top-0 z-30 flex justify-between items-center h-[80px] w-full">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors md:hidden flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-slate-800 truncate">{title}</h1>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        {/* Notification Bell */}
        <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-colors border border-slate-200 relative flex-shrink-0">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* Vertical Divider */}
        <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

        {/* User Pill */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/20 select-none flex-shrink-0">
            RL
          </div>
          <div className="flex-col hidden sm:flex">
            <span className="text-sm font-bold text-slate-800 leading-tight">Ron Lim</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Cashier
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
