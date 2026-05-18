"use client"

import { usePathname } from "next/navigation"
import { AdminSidebar, AdminTopbar } from "@/features/admin-dashboard"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - Fixed on desktop */}
      <AdminSidebar activePath={pathname} />

      {/* Main Content Area */}
      <div className="ml-[280px] flex flex-col min-h-screen">
        {/* Topbar - Sticky */}
        <AdminTopbar />

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
