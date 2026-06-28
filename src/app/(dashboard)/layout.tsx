"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  LayoutGrid, Activity, Bell, PackageSearch, History, CheckCircle2,
  LogOut, X, Monitor, Coins, ClipboardList, Settings, ShoppingCart,
  CreditCard, BarChart3, Users, Menu, Store, Search, LayoutDashboard
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"
import { DashboardMobileNav } from "@/components/layout/customer-mobile-nav"

type NavLink = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

type NavSection = {
  category: string
  links: NavLink[]
}

const ROLE_NAV_ITEMS: Record<string, NavSection[]> = {
  admin: [
    {
      category: "Overview",
      links: [
        { href: "/admin", label: "Dashboard Overview", icon: LayoutDashboard },
      ],
    },
    {
      category: "Management",
      links: [
        { href: "/shared/monitoring", label: "Monitoring", icon: Activity },
        { href: "/shared/notifications", label: "Notifications", icon: Bell },
        { href: "/admin/sales", label: "Sales", icon: BarChart3 },
        { href: "/shared/reservations", label: "Reservations", icon: ShoppingCart },
        { href: "/admin/users", label: "User Management", icon: Users },
      ],
    },
    {
      category: "Operations",
      links: [
        { href: "/shared/payments", label: "Payments", icon: CreditCard },
        { href: "/shared/history", label: "Transaction History", icon: History },
        { href: "/shared/pickups", label: "Pickups", icon: CheckCircle2 },
      ],
    },
  ],
  employee: [
    {
      category: "Overview",
      links: [
        { href: "/employee", label: "Dashboard Overview", icon: LayoutGrid },
      ],
    },
    {
      category: "POS & Sales",
      links: [
        { href: "/employee/pos", label: "POS System", icon: Monitor },
        { href: "/shared/payments", label: "Payments", icon: Coins },
        { href: "/shared/transactions", label: "POS Transactions", icon: History },
      ],
    },
    {
      category: "Inventory & Fulfillment",
      links: [
        { href: "/employee/inventory", label: "Inventory Stock", icon: PackageSearch },
        { href: "/shared/pickups", label: "Payments & Pickups", icon: CheckCircle2 },
        { href: "/employee/stock-check", label: "Stock Check", icon: ClipboardList },
        { href: "/shared/monitoring", label: "Live Monitoring", icon: Activity },
        { href: "/shared/notifications", label: "Notifications", icon: Bell },
      ],
    },
  ],
  customer: [
    {
      category: "Overview",
      links: [
        { href: "/customer", label: "Home", icon: LayoutDashboard },
      ],
    },
    {
      category: "Shopping",
      links: [
        { href: "/customer/catalog", label: "Browse Catalog", icon: Store },
        { href: "/customer/cart", label: "Cart", icon: ShoppingCart },
        { href: "/shared/transactions", label: "Transaction History", icon: History },
      ],
    },
    {
      category: "Account",
      links: [
        { href: "/shared/reservations", label: "Reservations", icon: CheckCircle2 },
        { href: "/shared/notifications", label: "Notifications", icon: Bell },
      ],
    },
  ],
}

const ROLE_TITLES: Record<string, string> = {
  admin: "Admin Panel",
  employee: "Employee Panel",
  customer: "Customer Portal",
}

function getPageTitleAndSubtitle(pathname: string) {
  if (pathname.includes("/admin/sales")) {
    return {
      title: "Sales Report",
      subtitle: "View daily sales and transaction records across all branches."
    }
  }
  if (pathname.includes("/admin/users")) {
    return {
      title: "User Management",
      subtitle: "Add, Edit, Remove, and manage users."
    }
  }
  if (pathname.includes("/employee/pos")) {
    return {
      title: "POS System",
      subtitle: "Register and checkout walk-in customer orders."
    }
  }
  if (pathname.includes("/employee/inventory")) {
    return {
      title: "Inventory Management",
      subtitle: "Manage branch inventory stock and items."
    }
  }
  if (pathname.includes("/employee/stock-check")) {
    return {
      title: "Stock Check",
      subtitle: "Verify physical and digital store inventory."
    }
  }
  if (pathname.includes("/customer/catalog")) {
    return {
      title: "Product Catalog",
      subtitle: "Browse and reserve products for store pickup."
    }
  }
  if (pathname.includes("/customer/cart")) {
    return {
      title: "Shopping Cart",
      subtitle: "Review items in your cart."
    }
  }
  if (pathname.includes("/shared/monitoring")) {
    return {
      title: "Centralized Monitoring",
      subtitle: "View inventory status and live feeds across all branches."
    }
  }
  if (pathname.includes("/shared/notifications")) {
    return {
      title: "Notifications",
      subtitle: "System alerts, restocks, and activity logs."
    }
  }
  if (pathname.includes("/shared/history")) {
    return {
      title: "Transaction History",
      subtitle: "Review past branch and online order records."
    }
  }
  if (pathname.includes("/shared/payments")) {
    return {
      title: "Payments",
      subtitle: "Monitor and verify walk-in and digital GCash payments."
    }
  }
  if (pathname.includes("/shared/pickups")) {
    return {
      title: "Pickups",
      subtitle: "Manage customer order pickup and fulfillment status."
    }
  }
  if (pathname.includes("/shared/reservations")) {
    return {
      title: "Reservations",
      subtitle: "Manage customer online reservations and hold times."
    }
  }
  if (pathname.includes("/shared/settings")) {
    return {
      title: "Settings",
      subtitle: "Manage account details and display configurations."
    }
  }
  if (pathname.includes("/shared/transactions")) {
    return {
      title: "Transactions",
      subtitle: "View recent branch checkout and invoice records."
    }
  }
  
  if (pathname.startsWith("/admin")) {
    return { title: "Admin Panel", subtitle: "Global store chain administration" }
  }
  if (pathname.startsWith("/employee")) {
    return { title: "Employee Dashboard", subtitle: "Branch cashier and inventory terminal" }
  }
  if (pathname.startsWith("/customer")) {
    return { title: "Customer Portal", subtitle: "Explore catalog and track orders" }
  }
  return { title: "Dashboard Overview", subtitle: "" }
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isLoading, isAuthenticated, logout } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0c1221] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
          <p className="text-slate-400">Verifying session...</p>
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

  const { title: pageTitle, subtitle: pageSubtitle } = getPageTitleAndSubtitle(pathname)

  const handleLogout = async () => {
    try {
      await logout()
    } catch {
      // Proceed even if api throws
    }
    router.push("/login")
  }

  const isCustomer = role === "customer"

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* Unified Sidebar */}
      <aside
        className={cn(
          "w-[280px] bg-[#0c1221] text-white flex flex-col fixed inset-y-0 left-0 z-40 border-r border-slate-900",
          "transition-transform duration-300 ease-in-out md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="px-6 py-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/30">
            <Store className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-lg tracking-tight truncate">BentaHub</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
              {panelTitle}
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="ml-auto p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Categories */}
        <div className="flex-1 px-4 overflow-y-auto space-y-6">
          {navItems.map((section) => (
            <div key={section.category} className="space-y-2">
              <p className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {section.category}
              </p>
              <nav className="space-y-1">
                {section.links.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/admin" && link.href !== "/employee" && link.href !== "/customer" && pathname.startsWith(link.href + "/"))
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium",
                        isActive
                          ? "bg-primary text-white"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                      )}
                    >
                      <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-slate-400")} />
                      <span>{link.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Unified Sidebar Footer */}
        <div className="p-4 mt-auto border-t border-slate-800/80">
          <nav className="space-y-1">
            <Link
              href="/shared/settings"
              onClick={() => setIsSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-medium",
                pathname === "/shared/settings"
                  ? "bg-primary text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              )}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
            <button
              onClick={() => {
                handleLogout()
                setIsSidebarOpen(false)
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-sm font-medium w-full text-left"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main content frame */}
      <div className={cn(
        "flex-1 flex flex-col min-h-screen md:ml-[280px] overflow-hidden",
        isCustomer && "pb-16 md:pb-0" // Add padding on mobile for customer bottom nav
      )}>
        {/* Unified Topbar */}
        <header className="bg-card border-b border-border px-4 md:px-6 sticky top-0 z-30 flex justify-between items-center h-[80px] w-full">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors md:hidden flex-shrink-0"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex flex-col min-w-0">
              <h1 className="text-xl font-bold text-foreground leading-tight truncate">
                {pageTitle}
              </h1>
              {pageSubtitle && (
                <p className="text-xs text-muted-foreground mt-0.5 truncate hidden sm:block">
                  {pageSubtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {/* Search Bar - Hidden for customer portal */}
            {!isCustomer && (
              <div className="relative w-[180px] lg:w-[300px] hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search anything..."
                  className="pl-10 bg-muted/50 border-border focus-visible:ring-blue-500 rounded-lg text-sm"
                />
              </div>
            )}

            <ThemeToggle />

            {/* Notifications Button */}
            <button
              onClick={() => router.push("/shared/notifications")}
              className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-blue-600 transition-colors border border-border relative flex-shrink-0"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-background"></span>
            </button>

            <div className="h-8 w-px bg-border hidden sm:block" />

            {/* Profile Pill */}
            <div className="flex items-center gap-3 select-none">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/20 flex-shrink-0">
                {initials}
              </div>
              <div className="flex-col hidden sm:flex">
                <span className="text-sm font-bold text-foreground leading-tight">
                  {fullName}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                  {panelTitle}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Page Container */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>

        {/* Customer Mobile Navigation */}
        {isCustomer && <DashboardMobileNav activePath={pathname} />}
      </div>
    </div>
  )
}
