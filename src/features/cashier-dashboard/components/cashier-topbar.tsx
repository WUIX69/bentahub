"use client"

import { usePathname } from "next/navigation"
import { Bell } from "lucide-react"

export function CashierTopbar() {
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
    <header className="bg-white border-b border-slate-200 px-6 sticky top-0 z-30 flex justify-between items-center h-[80px] w-full">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
      </div>
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-colors border border-slate-200 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>
        </div>

        {/* Vertical Divider */}
        <div className="h-8 w-px bg-slate-200"></div>

        {/* User Pill */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/20 select-none">
            RL
          </div>
          <div className="flex flex-col">
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
