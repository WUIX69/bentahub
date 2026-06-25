"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  LayoutGrid, Activity, Bell, PackageSearch, History, CheckCircle2,
  LogOut, X, Monitor, Coins, ClipboardList, Settings, ShoppingCart,
  CreditCard, BarChart3, Users, Menu, Store
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { ThemeToggle } from "@/components/theme-toggle"

type NavSection = { category: string; links: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[] }
const ROLE_NAV_ITEMS: Record<string, NavSection[]> = {
  admin: [
    {
      category: "Overview",
      links: [
        { href: "/admin", label: "Dashboard Overview", icon: LayoutGrid },
      ],
    },
    {
      category: "Shared",
      links: [
        { href: "/shared/monitoring", label: "Monitoring", icon: Activity },
        { href: "/shared/notifications", label: "Notifications", icon: Bell },
        { href: "/shared/history", label: "History", icon: History },
        { href: "/shared/payments", label: "Payments", icon: CreditCard },
        { href: "/shared/pickups", label: "Pickups", icon: CheckCircle2 },
        { href: "/shared/reservations", label: "Reservations", icon: ShoppingCart },
        { href: "/shared/settings", label: "Settings", icon: Settings },
      ],
    },
    {
      category: "Management",
      links: [
        { href: "/admin/(management)/sales", label: "Sales", icon: BarChart3 },
        { href: "/admin/(management)/users", label: "Users", icon: Users },
      ],
    },
  ],
  employee: [
    {
      category: "Overview",
      links: [
        { href: "/employee", label: "Dashboard", icon: LayoutGrid },
      ],
    },
    {
      category: "POS & Sales",
      links: [
        { href: "/employee/pos", label: "POS System", icon: Monitor },
        { href: "/shared/payments", label: "Payments", icon: Coins },
        { href: "/shared/transactions", label: "Transactions", icon: History },
      ],
    },
    {
      category: "Inventory & Fulfillment",
      links: [
        { href: "/employee/inventory", label: "Inventory", icon: PackageSearch },
        { href: "/shared/pickups", label: "Payments & Pickups", icon: CheckCircle2 },
        { href: "/employee/stock-check", label: "Stock Check", icon: ClipboardList },
        { href: "/shared/monitoring", label: "Live Monitoring", icon: Activity },
        { href: "/shared/notifications", label: "Notifications", icon: Bell },
        { href: "/shared/settings", label: "Settings", icon: Settings },
      ],
    },
  ],
  customer: [
    {
      category: "Overview",
      links: [
        { href: "/customer", label: "Dashboard", icon: LayoutGrid },
      ],
    },
    {
      category: "Shopping",
      links: [
        { href: "/customer/catalog", label: "Catalog", icon: Store },
        { href: "/customer/cart", label: "Cart", icon: ShoppingCart },
        { href: "/shared/transactions", label: "Transactions", icon: History },
      ],
    },
    {
      category: "Account",
      links: [
        { href: "/shared/reservations", label: "Reservations", icon: CheckCircle2 },
        { href: "/shared/notifications", label: "Notifications", icon: Bell },
        { href: "/shared/settings", label: "Settings", icon: Settings },
      ],
    },
  ],
}

const ROLE_TITLES: Record<string, string> = {
  admin: "Admin Panel",
  employee: "Employee Panel",
  customer: "Customer Portal",
}

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isLoading, isAuthenticated } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying session...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) return null

  const role = user.role as string
  const navItems = ROLE_NAV_ITEMS[role] || ROLE_NAV_ITEMS.customer
  const panelTitle = ROLE_TITLES[role] || "Dashboard"
  const fullName = user.fullName || "User"
  const initials = fullName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()

  const title = pathname.split("/").pop()?.replace(/-/g, " ") || "Dashboard"
  const pageTitle = title.charAt(0).toUpperCase() + title.slice(1)

  return (
    <div className="min-h-screen bg-background">
      {/* Overlay */}
      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-30 md:hidden" />}

      {/* Sidebar */}
      <aside className={cn(
        "w-[280px] bg-[#0c1221] text-white flex flex-col fixed inset-y-0 left-0 z-40 border-r border-slate-900",
        "transition-transform duration-300 ease-in-out md:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="px-6 py-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/30 flex-shrink-0">
            <LayoutGrid className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-bold text-lg tracking-tight truncate">BentaHub</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">{panelTitle}</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors md:hidden flex-shrink-0">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 px-4 overflow-y-auto space-y-6">
          {navItems.map((group) => (
            <div key={group.category} className="space-y-2">
              <p className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">{group.category}</p>
              <nav className="space-y-1">
                {group.links.map((link) => {
                  const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                        isActive
                          ? "bg-blue-600/20 text-white font-semibold border-l-4 border-blue-600"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                      )}
                    >
                      <Icon className={cn("w-5 h-5", isActive ? "text-blue-500" : "text-slate-400")} />
                      <span>{link.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>

        <div className="p-4 mt-auto border-t border-slate-800/80">
          <nav className="space-y-1">
            <button
              onClick={async () => {
                try { await fetch("/api/auth/logout", { method: "POST" }) } catch { /* proceed */ }
                router.push("/login")
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 w-full text-left"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-[280px] overflow-hidden">
        {/* Topbar */}
        <header className="bg-card border-b border-border px-4 md:px-6 sticky top-0 z-30 flex justify-between items-center h-[80px] w-full">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors md:hidden flex-shrink-0"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-foreground truncate">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <ThemeToggle />
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/20 select-none flex-shrink-0">
                {initials}
              </div>
              <div className="flex-col hidden sm:flex">
                <span className="text-sm font-bold text-foreground leading-tight">{fullName}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{panelTitle}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
