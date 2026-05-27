"use client"

import Link from "next/link"
import { 
  LayoutDashboard, 
  Activity, 
  Tag, 
  Calendar, 
  Users, 
  CreditCard, 
  History, 
  Truck, 
  Settings, 
  LogOut,
  Store
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminSidebarProps {
  activePath: string
}

export function AdminSidebar({ activePath }: AdminSidebarProps) {
  const sections = [
    {
      title: "Dashboard",
      items: [
        { label: "Overview", icon: LayoutDashboard, path: "/admin" },
      ]
    },
    {
      title: "Management",
      items: [
        { label: "Monitoring", icon: Activity, path: "/admin/monitoring" },
        { label: "Sales", icon: Tag, path: "/admin/sales" },
        { label: "Reservations", icon: Calendar, path: "/admin/reservations" },
        { label: "User Management", icon: Users, path: "/admin/users" },
      ]
    },
    {
      title: "Operations",
      items: [
        { label: "Payments", icon: CreditCard, path: "/admin/payments" },
        { label: "Transaction History", icon: History, path: "/admin/history" },
        { label: "Pickups", icon: Truck, path: "/admin/pickups" },
      ]
    }
  ]

  return (
    <aside className="w-[280px] bg-[#0c1221] text-white flex flex-col fixed h-full z-40">
      {/* Header */}
      <div className="px-6 py-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Store className="h-6 w-6 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg tracking-tight">BentaHub</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest">Admin Panel</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 overflow-y-auto custom-scrollbar">
        {sections.map((section) => (
          <div key={section.title} className="mb-6">
            <p className="px-4 mb-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {section.title}
            </p>
            <nav className="space-y-1">
              {section.items.map((item) => {
                const isActive = activePath === item.path
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm font-medium",
                      isActive
                        ? "bg-primary text-white"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 mt-auto">
        <nav className="space-y-1">
          <Link
            href="/admin/settings"
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm font-medium",
              activePath === "/admin/settings"
                ? "bg-primary text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            )}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
          <button className="flex items-center gap-3 px-4 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-all text-sm font-medium w-full text-left">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </aside>
  )
}
