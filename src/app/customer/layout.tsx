"use client"

import { usePathname } from "next/navigation"
import { 
  DashboardSidebar, 
  DashboardTopbar, 
  DashboardMobileNav 
} from "@/features/customer-dashboard"

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - Fixed on desktop */}
      <DashboardSidebar activePath={pathname} />

      {/* Main Content Area */}
      <div className="md:ml-64 flex flex-col min-h-screen">
        {/* Topbar - Sticky */}
        <DashboardTopbar />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6">
          {children}
        </main>

        {/* Mobile Bottom Nav */}
        <DashboardMobileNav activePath={pathname} />
      </div>
    </div>
  )
}
