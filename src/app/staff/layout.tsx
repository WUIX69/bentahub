import { StaffSidebar } from "@/features/staff-dashboard/components/staff-sidebar"
import { StaffTopbar } from "@/features/staff-dashboard/components/staff-topbar"

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex overflow-hidden">
      <StaffSidebar />
      <div className="flex-1 flex flex-col min-h-screen ml-[280px] overflow-hidden">
        <StaffTopbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
