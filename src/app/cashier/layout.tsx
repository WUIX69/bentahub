"use client"

import { useState } from "react"
import { CashierSidebar } from "@/features/cashier-dashboard/components/cashier-sidebar"
import { CashierTopbar } from "@/features/cashier-dashboard/components/cashier-topbar"

export default function CashierLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex overflow-hidden">
      <CashierSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen md:ml-[280px] overflow-hidden">
        <CashierTopbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-hidden flex flex-col">
          {children}
        </main>
      </div>
    </div>
  )
}
