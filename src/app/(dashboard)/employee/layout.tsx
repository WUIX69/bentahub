"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { EmployeeSidebar, EmployeeTopbar } from "@/features/employee-dashboard"

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, isLoading, isAuthenticated } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "employee")) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, user, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0c1221] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Verifying session...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== "employee") {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
      <EmployeeSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen md:ml-[280px] overflow-hidden">
        <EmployeeTopbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
