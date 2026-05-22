import { CashierSidebar } from "@/features/cashier-dashboard/components/cashier-sidebar"
import { CashierTopbar } from "@/features/cashier-dashboard/components/cashier-topbar"

export default function CashierLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex overflow-hidden">
      {/* Sidebar Nav */}
      <CashierSidebar />

      {/* Main content pane */}
      <div className="flex-1 flex flex-col min-h-screen ml-[280px] overflow-hidden">
        {/* Top Header */}
        <CashierTopbar />

        {/* Workspace content scroll container */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {children}
        </main>
      </div>
    </div>
  )
}
