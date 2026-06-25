"use client"

import { useState, useMemo } from "react"
import {
  CalendarCheck, Clock, CheckCircle2, XCircle,
  Search, Eye, Pencil, ChevronLeft, ChevronRight,
  Calendar, MapPin, Package, Download,
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"

type CustomerTab = "all" | "processing" | "ready" | "completed"

interface ReservationData {
  id: string
  customerName?: string
  title?: string
  description?: string
  branch?: string
  itemsCount?: number
  pickupDate?: string
  status: "processing" | "ready" | "completed" | "cancelled"
  image?: string
  initials?: string
  avatarBg?: string
  avatarText?: string
}

const mockReservations: ReservationData[] = [
  { id: "#BH-7821", customerName: "Juan Dela Cruz", title: "Rice & Sardines Order", branch: "Quezon City Main", itemsCount: 5, pickupDate: "Oct 24, 2026 • 14:30", status: "processing", initials: "JD", avatarBg: "bg-accent/40", avatarText: "text-primary" },
  { id: "#BH-7822", customerName: "Maria Santos", title: "Weekly Groceries", branch: "Makati Business Hub", itemsCount: 2, pickupDate: "Oct 24, 2026 • 11:00", status: "completed", initials: "MS", avatarBg: "bg-muted/80", avatarText: "text-muted-foreground" },
  { id: "#BH-7823", customerName: "Antonio Luna", title: "Bulk Rice Order", branch: "Cebu IT Park", itemsCount: 12, pickupDate: "Oct 25, 2026 • 09:00", status: "ready", initials: "AL", avatarBg: "bg-primary/10", avatarText: "text-primary" },
  { id: "#BH-7824", customerName: "Elena Reyes", title: "Canned Goods Bundle", branch: "Davao City Branch", itemsCount: 1, pickupDate: "Oct 23, 2026 • 17:45", status: "cancelled", initials: "ER", avatarBg: "bg-destructive/10", avatarText: "text-destructive" },
  { id: "#BH-7825", customerName: "Pedro Santos", title: "Snacks & Beverages", branch: "Quezon City Main", itemsCount: 8, pickupDate: "Oct 26, 2026 • 16:00", status: "processing", initials: "PS", avatarBg: "bg-amber-500/10", avatarText: "text-amber-600" },
  { id: "#BH-7826", customerName: "Liza Morales", title: "Household Essentials", branch: "Makati Business Hub", itemsCount: 3, pickupDate: "Oct 25, 2026 • 13:00", status: "ready", initials: "LM", avatarBg: "bg-emerald-500/10", avatarText: "text-emerald-600" },
]

const statusStyles: Record<string, string> = {
  processing: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  ready: "bg-primary/10 text-primary",
  completed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  cancelled: "bg-destructive/10 text-destructive",
}

const statusLabels: Record<string, string> = {
  processing: "Processing",
  ready: "Ready for Pickup",
  completed: "Completed",
  cancelled: "Cancelled",
}

export function ReservationsManager() {
  const { user, isLoading } = useAuth()
  const role = user?.role ?? "customer"

  const [customerTab, setCustomerTab] = useState<CustomerTab>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(() => {
    let result = mockReservations
    if (role === "customer") {
      if (customerTab !== "all") {
        result = result.filter((r) => r.status === customerTab)
      }
    }
    const q = searchQuery.toLowerCase()
    if (q) {
      result = result.filter((r) =>
        r.id.toLowerCase().includes(q) ||
        (r.customerName?.toLowerCase().includes(q) ?? false) ||
        (r.title?.toLowerCase().includes(q) ?? false),
      )
    }
    return result
  }, [customerTab, searchQuery, role])

  const totalItems = filtered.length
  const itemsPerPage = role === "admin" ? 5 : 4
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1
  const safePage = Math.min(currentPage, totalPages)
  const paginated = useMemo(
    () => filtered.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage),
    [filtered, safePage, itemsPerPage],
  )

  const summary = useMemo(() => {
    const all = mockReservations.length
    const ready = mockReservations.filter((r) => r.status === "ready").length
    const processing = mockReservations.filter((r) => r.status === "processing").length
    const completed = mockReservations.filter((r) => r.status === "completed").length
    return { all, ready, processing, completed }
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading reservations...</p>
      </div>
    )
  }

  // --- Admin View ---
  if (role === "admin") {
    const totalReservations = mockReservations.length
    const pendingCount = mockReservations.filter((r) => r.status === "processing").length
    const completedCount = mockReservations.filter((r) => r.status === "completed").length
    const cancelledCount = mockReservations.filter((r) => r.status === "cancelled").length

    return (
      <div className="space-y-6">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between group hover:border-primary transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <CalendarCheck className="h-6 w-6" />
              </div>
              <span className="flex items-center text-primary font-bold text-[11px] bg-primary/10 px-3 py-1 rounded-full">+12%</span>
            </div>
            <div className="mt-8">
              <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Total Reservations</p>
              <h3 className="text-3xl font-bold text-foreground tracking-tight">{totalReservations}</h3>
            </div>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between group hover:border-amber-500 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-amber-500/10 rounded-lg text-amber-500">
                <Clock className="h-6 w-6" />
              </div>
              <span className="flex items-center text-amber-600 dark:text-amber-400 font-bold text-[11px] bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full">Active</span>
            </div>
            <div className="mt-8">
              <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Processing</p>
              <h3 className="text-3xl font-bold text-foreground tracking-tight">{pendingCount}</h3>
            </div>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between group hover:border-emerald-500 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-500">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-[11px] bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                {totalReservations > 0 ? Math.round((completedCount / totalReservations) * 100) : 0}% Success
              </span>
            </div>
            <div className="mt-8">
              <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Completed</p>
              <h3 className="text-3xl font-bold text-foreground tracking-tight">{completedCount}</h3>
            </div>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between group hover:border-destructive transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-destructive/10 rounded-lg text-destructive">
                <XCircle className="h-6 w-6" />
              </div>
              <span className="flex items-center text-destructive font-bold text-[11px] bg-destructive/10 px-3 py-1 rounded-full">Flagged</span>
            </div>
            <div className="mt-8">
              <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Cancelled</p>
              <h3 className="text-3xl font-bold text-foreground tracking-tight">{cancelledCount}</h3>
            </div>
          </div>
        </div>

        {/* Filters */}
        <section className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-3 bg-muted/20 border-b border-border">
            <h3 className="text-sm font-bold text-foreground">Filter Reservations</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            <div>
              <label className="block text-xs font-bold mb-2 text-muted-foreground ml-1">Status</label>
              <select className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none">
                <option>All Status</option>
                <option>Processing</option>
                <option>Ready</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-2 text-muted-foreground ml-1">Branch</label>
              <select className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none">
                <option>All Branches</option>
                <option>Quezon City Main</option>
                <option>Makati Business Hub</option>
                <option>Cebu IT Park</option>
                <option>Davao City Branch</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-2 text-muted-foreground ml-1">Date Range</label>
              <input className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" type="date" />
            </div>
            <div>
              <button className="w-full bg-primary hover:bg-primary/95 text-primary-foreground h-[42px] px-6 rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95">
                <Download className="h-[18px] w-[18px]" />
                Export Data
              </button>
            </div>
          </div>
        </section>

        {/* Admin Table */}
        <section className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/5">
            <h4 className="text-base font-bold text-foreground">All Reservations</h4>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search ID or Customer..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                className="w-full pl-9 pr-4 py-1.5 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-muted/10 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Reservation ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Branch</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Items</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Pickup Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginated.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-8 text-center text-xs text-muted-foreground">No reservations found</td></tr>
                ) : (
                  paginated.map((r) => (
                    <tr key={r.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4 font-mono text-sm text-primary font-bold">{r.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs", r.avatarBg, r.avatarText)}>
                            {r.initials}
                          </div>
                          <span className="text-sm font-medium text-foreground">{r.customerName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{r.branch}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{r.itemsCount} {r.itemsCount === 1 ? "Item" : "Items"}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{r.pickupDate}</td>
                      <td className="px-6 py-4">
                        <span className={cn("inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", statusStyles[r.status])}>
                          {statusLabels[r.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-muted rounded text-primary transition-colors" title="View Details">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors" title="Edit">
                            <Pencil className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-muted/5 border-t border-border flex justify-between items-center">
            <p className="text-xs text-muted-foreground font-medium">Showing {paginated.length} of {totalItems} results</p>
            <div className="flex items-center gap-2">
              <button disabled={safePage === 1} onClick={() => setCurrentPage((c) => c - 1)}
                className="p-1.5 border border-border rounded hover:bg-muted transition-colors text-muted-foreground disabled:opacity-30">
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => setCurrentPage(page)}
                  className={cn("px-3 py-1 rounded text-xs font-bold", page === safePage ? "bg-primary text-primary-foreground" : "hover:bg-muted")}>
                  {page}
                </button>
              ))}
              <button disabled={safePage === totalPages} onClick={() => setCurrentPage((c) => c + 1)}
                className="p-1.5 border border-border rounded hover:bg-muted transition-colors text-muted-foreground disabled:opacity-30">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // --- Customer View ---

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="flex divide-x divide-border">
          {(["all", "processing", "ready", "completed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { setCustomerTab(tab); setCurrentPage(1) }}
              className={cn(
                "flex-1 px-4 py-3 text-sm font-bold transition-colors relative",
                customerTab === tab
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/20",
              )}
            >
              {tab === "all" ? "All" : statusLabels[tab]}
              {customerTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* Cards Grid */}
        <div className="grid gap-4 auto-rows-min">
          {paginated.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-12 shadow-sm text-center col-span-full">
              <Package className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
              <p className="text-sm text-muted-foreground">No reservations found</p>
            </div>
          ) : (
            paginated.map((r) => (
              <div key={r.id} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4 flex items-start gap-4">
                  <div className="size-16 bg-muted rounded-lg overflow-hidden shrink-0 flex items-center justify-center text-muted-foreground">
                    <Package className="h-8 w-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-mono text-xs text-muted-foreground">{r.id}</span>
                        <h3 className="font-heading text-base font-bold text-foreground mt-0.5 truncate">{r.title}</h3>
                      </div>
                      <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold", statusStyles[r.status])}>
                        {statusLabels[r.status]}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        {r.pickupDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {r.branch}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Pagination */}
          {totalItems > itemsPerPage && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-muted-foreground">
                Showing {(safePage - 1) * itemsPerPage + 1}-{Math.min(totalItems, safePage * itemsPerPage)} of {totalItems}
              </p>
              <div className="flex items-center gap-1.5">
                <button disabled={safePage === 1} onClick={() => setCurrentPage((c) => c - 1)}
                  className="p-1.5 border border-border rounded hover:bg-muted transition-colors text-muted-foreground disabled:opacity-30">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-xs font-bold text-muted-foreground px-1">Page {safePage}</span>
                <button disabled={safePage === totalPages} onClick={() => setCurrentPage((c) => c + 1)}
                  className="p-1.5 border border-border rounded hover:bg-muted transition-colors text-muted-foreground disabled:opacity-30">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-xs font-bold tracking-widest text-muted-foreground mb-4 uppercase">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Ready for Pickup</span>
                <span className="font-bold text-primary">{summary.ready}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Processing</span>
                <span className="font-bold text-foreground">{summary.processing}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Completed</span>
                <span className="font-bold text-foreground">{summary.completed}</span>
              </div>
              <div className="border-t border-border pt-3 mt-3">
                <div className="flex items-center justify-between text-base font-bold">
                  <span className="text-foreground">Total Reservations</span>
                  <span className="text-primary">{summary.all}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
