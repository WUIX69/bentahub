"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import {
  Bell,
  AlertTriangle,
  ShoppingCart,
  RefreshCw,
  Clock,
  Filter,
  ChevronDown,
  CheckCircle,
  Package,
  Users,
  UserPlus,
  Wallet,
  Percent,
  MoreHorizontal,
  Info,
} from "lucide-react"

export interface NotificationItem {
  id: string
  title: string
  description?: string
  type: "order" | "payment" | "system"
  icon: React.ReactNode
  iconBg: string
  iconColor: string
  borderColor: string
  timestamp: string
  isRead: boolean
  badgeText?: string
  badgeClass?: string
  metadata?: { label: string; value: string }[]
  actions?: { label: string; variant: "primary" | "outline" | "ghost"; onClick?: () => void }[]
}

type FilterTab = "all" | "orders" | "payments" | "system"

function buildAdminNotifications(): NotificationItem[] {
  return [
    {
      id: "a1",
      title: "Low Stock Alert: Kopiko Blanca Twin (5 left)",
      description: "Branch B001 is running critically low. Suggested reorder qty: 24 units.",
      type: "system",
      icon: <AlertTriangle className="w-5 h-5" />,
      iconBg: "bg-error-container",
      iconColor: "text-error",
      borderColor: "border-l-error",
      timestamp: "2 min ago",
      isRead: false,
      badgeText: "Critical",
      badgeClass: "bg-error-container text-error",
      metadata: [
        { label: "Branch", value: "B001 - Main" },
        { label: "SKU", value: "KOP-BLC-001" },
        { label: "Category", value: "Beverages" },
      ],
      actions: [
        { label: "Manage Inventory", variant: "primary", onClick: () => {} },
      ],
    },
    {
      id: "a2",
      title: "New Staff Registered: Ron Lim",
      description: "Account provisioned as employee for Branch B003. Pending admin verification.",
      type: "system",
      icon: <UserPlus className="w-5 h-5" />,
      iconBg: "bg-primary-fixed",
      iconColor: "text-primary",
      borderColor: "border-l-primary",
      timestamp: "45 min ago",
      isRead: false,
      badgeText: "New User",
      badgeClass: "bg-primary-fixed text-primary",
      metadata: [
        { label: "Email", value: "ron.lim@email.com" },
        { label: "Branch", value: "B003 - Laguna" },
        { label: "Role", value: "Employee" },
      ],
      actions: [
        { label: "Review", variant: "primary", onClick: () => {} },
      ],
    },
    {
      id: "a3",
      title: "Branch B002: Pickup Completed #BH-88102",
      description: "Customer Maria Santos picked up 3 items. Total: ₱1,245.00.",
      type: "order",
      icon: <ShoppingCart className="w-5 h-5" />,
      iconBg: "bg-accent",
      iconColor: "text-primary",
      borderColor: "border-l-primary",
      timestamp: "1h ago",
      isRead: false,
      badgeText: "Completed",
      badgeClass: "bg-success-container text-success",
      metadata: [
        { label: "Customer", value: "Maria Santos" },
        { label: "Items", value: "3" },
        { label: "Total", value: "₱1,245.00" },
      ],
    },
    {
      id: "a4",
      title: "System v2.4.1 Deployed",
      description: "Kernel patch applied to all nodes. DB query performance +12%.",
      type: "system",
      icon: <RefreshCw className="w-5 h-5" />,
      iconBg: "bg-surface-container",
      iconColor: "text-on-surface-variant",
      borderColor: "border-l-outline",
      timestamp: "3h ago",
      isRead: true,
      badgeText: "Deployed",
      badgeClass: "bg-secondary-container text-on-secondary-container",
      metadata: [
        { label: "Version", value: "v2.4.1" },
        { label: "Nodes", value: "3/3" },
      ],
      actions: [
        { label: "Release Notes", variant: "outline", onClick: () => {} },
      ],
    },
    {
      id: "a5",
      title: "GCash Settlement #PAY-8821 Processed",
      description: "Week 24 settlement batch distributed. Batch ID: BT-X992-K.",
      type: "payment",
      icon: <Wallet className="w-5 h-5" />,
      iconBg: "bg-success-container",
      iconColor: "text-success",
      borderColor: "border-l-success",
      timestamp: "5h ago",
      isRead: true,
      badgeText: "Settled",
      badgeClass: "bg-success-container text-success",
      metadata: [
        { label: "Amount", value: "₱28,450.00" },
        { label: "Batch", value: "BT-X992-K" },
        { label: "Transactions", value: "142" },
      ],
      actions: [
        { label: "Export Report", variant: "primary", onClick: () => {} },
      ],
    },
    {
      id: "a6",
      title: "Weekly DB Backup Completed",
      description: "Full snapshot archived to S3 (bentahub-backups-main). Integrity: 100%.",
      type: "system",
      icon: <Package className="w-5 h-5" />,
      iconBg: "bg-tertiary-container",
      iconColor: "text-on-tertiary-container",
      borderColor: "border-l-tertiary",
      timestamp: "6h ago",
      isRead: true,
      metadata: [
        { label: "Size", value: "2.4 GB" },
        { label: "Duration", value: "18 min" },
      ],
      actions: [
        { label: "Download", variant: "outline", onClick: () => {} },
      ],
    },
    {
      id: "a7",
      title: "156 Active Users Across Branches",
      description: "Peak usage detected across all branches. 12 concurrent checkouts.",
      type: "system",
      icon: <Users className="w-5 h-5" />,
      iconBg: "bg-tertiary-fixed",
      iconColor: "text-tertiary",
      borderColor: "border-l-tertiary",
      timestamp: "8h ago",
      isRead: true,
      badgeText: "Peak",
      badgeClass: "bg-tertiary-container text-on-tertiary-container",
    },
  ]
}

function buildEmployeeNotifications(): NotificationItem[] {
  return [
    {
      id: "e1",
      title: "New Reservation: #BH-99128 Ready for Prep",
      description: "Reservation ready for in-store checkout and processing.",
      type: "order",
      icon: <ShoppingCart className="w-5 h-5" />,
      iconBg: "bg-primary-fixed",
      iconColor: "text-primary",
      borderColor: "border-l-primary",
      timestamp: "Just now",
      isRead: false,
      badgeText: "New Order",
      badgeClass: "bg-accent text-primary",
      metadata: [
        { label: "Customer", value: "Sarah Johnson" },
        { label: "Item", value: "Dual-Core Processing Unit (x4)" },
        { label: "Station", value: "B-12" },
      ],
      actions: [
        { label: "Process", variant: "primary", onClick: () => {} },
        { label: "View Details", variant: "outline", onClick: () => {} },
      ],
    },
    {
      id: "e2",
      title: "Pickup Overdue: James Smith (#BH-72805)",
      description: "Slot ended at 09:00 AM. Item remains in Locker Cluster C-04.",
      type: "order",
      icon: <AlertTriangle className="w-5 h-5" />,
      iconBg: "bg-error-container",
      iconColor: "text-error",
      borderColor: "border-l-error",
      timestamp: "14m overdue",
      isRead: false,
      badgeText: "Overdue",
      badgeClass: "bg-error-container text-error",
      actions: [
        { label: "Call Customer", variant: "primary", onClick: () => {} },
        { label: "Dismiss", variant: "ghost", onClick: () => {} },
      ],
    },
    {
      id: "e3",
      title: "GCash Payment Verified",
      description: "Reference #987216354 completed successfully.",
      type: "payment",
      icon: <CheckCircle className="w-5 h-5" />,
      iconBg: "bg-success-container",
      iconColor: "text-success",
      borderColor: "border-l-success",
      timestamp: "8m ago",
      isRead: false,
      badgeText: "Logged",
      badgeClass: "bg-success-container text-success",
      metadata: [
        { label: "Amount", value: "₱385.00" },
        { label: "Ref", value: "987216354" },
        { label: "ID", value: "PAY-5002" },
      ],
      actions: [
        { label: "View Transaction", variant: "outline", onClick: () => {} },
      ],
    },
    {
      id: "e4",
      title: "Low Stock: Mineral Water 500mL",
      description: "Inventory below safety threshold. 5 units remaining.",
      type: "system",
      icon: <AlertTriangle className="w-5 h-5" />,
      iconBg: "bg-error-container",
      iconColor: "text-error",
      borderColor: "border-l-error",
      timestamp: "1h ago",
      isRead: false,
      badgeText: "5 left",
      badgeClass: "bg-error-container text-error",
      metadata: [
        { label: "Product", value: "Mineral Water 500mL" },
        { label: "SKU", value: "BEV-WAT-002" },
        { label: "Current", value: "5 Bottles" },
      ],
      actions: [
        { label: "Restock Now", variant: "primary", onClick: () => {} },
      ],
    },
    {
      id: "e5",
      title: "Stock Sync: Branch B001 Updated",
      description: "450 SKUs synced. 2 discrepancies in 'Peripherals'.",
      type: "system",
      icon: <RefreshCw className="w-5 h-5" />,
      iconBg: "bg-surface-container",
      iconColor: "text-on-surface-variant",
      borderColor: "border-l-outline",
      timestamp: "2h ago",
      isRead: true,
      actions: [
        { label: "Review", variant: "outline", onClick: () => {} },
      ],
    },
    {
      id: "e6",
      title: "POS v1.2.4 Applied",
      description: "Automatic patch applied. Improved checkout speed + printer alignment fix.",
      type: "system",
      icon: <RefreshCw className="w-5 h-5" />,
      iconBg: "bg-secondary-container",
      iconColor: "text-on-secondary-container",
      borderColor: "border-l-secondary",
      timestamp: "4h ago",
      isRead: true,
      badgeText: "Patch",
      badgeClass: "bg-secondary-container text-on-secondary-container",
      actions: [
        { label: "Release Notes", variant: "outline", onClick: () => {} },
      ],
    },
  ]
}

function buildCustomerNotifications(): NotificationItem[] {
  return [
    {
      id: "c1",
      title: "Reservation Approved!",
      description: "Your Kopiko Blanca Twin is ready for pickup at BentaHub Branch A.",
      type: "order",
      icon: <CheckCircle className="w-5 h-5" />,
      iconBg: "bg-success-container",
      iconColor: "text-success",
      borderColor: "border-l-success",
      timestamp: "2m ago",
      isRead: false,
      badgeText: "Ready",
      badgeClass: "bg-success-container text-success",
      metadata: [
        { label: "Branch", value: "BentaHub Branch A" },
        { label: "Order", value: "#BH-99128" },
        { label: "Items", value: "1 item" },
      ],
      actions: [
        { label: "View Details", variant: "primary", onClick: () => {} },
      ],
    },
    {
      id: "c2",
      title: "Payment Verified",
      description: "Reference #TXN-00042 processed. Wallet balance updated.",
      type: "payment",
      icon: <Wallet className="w-5 h-5" />,
      iconBg: "bg-primary-fixed",
      iconColor: "text-primary",
      borderColor: "border-l-primary",
      timestamp: "1h ago",
      isRead: false,
      metadata: [
        { label: "Amount", value: "₱385.00" },
        { label: "Ref", value: "TXN-00042" },
      ],
    },
    {
      id: "c3",
      title: "Flash Sale: 10% Off Grains & Rice",
      description: "Stock up now! Offer valid for the next 4 hours.",
      type: "system",
      icon: <Percent className="w-5 h-5" />,
      iconBg: "bg-tertiary-container",
      iconColor: "text-on-tertiary-container",
      borderColor: "border-l-tertiary",
      timestamp: "3h ago",
      isRead: false,
      badgeText: "Hot Deal",
      badgeClass: "bg-tertiary-container text-on-tertiary-container",
      actions: [
        { label: "Shop Now", variant: "primary", onClick: () => {} },
      ],
    },
    {
      id: "c4",
      title: "Low Stock Alert: Canned Goods",
      description: "Below 15% at your favorite branch. Consider restocking soon.",
      type: "system",
      icon: <AlertTriangle className="w-5 h-5" />,
      iconBg: "bg-error-container",
      iconColor: "text-error",
      borderColor: "border-l-error",
      timestamp: "Yesterday",
      isRead: true,
      badgeText: "Alert",
      badgeClass: "bg-error-container text-error",
    },
    {
      id: "c5",
      title: "Reservation Confirmed: #BH-88102",
      description: "Your order has been received and is being prepared.",
      type: "order",
      icon: <ShoppingCart className="w-5 h-5" />,
      iconBg: "bg-accent",
      iconColor: "text-primary",
      borderColor: "border-l-primary",
      timestamp: "Yesterday",
      isRead: true,
      metadata: [
        { label: "Items", value: "3 items" },
        { label: "Total", value: "₱1,245.00" },
      ],
    },
  ]
}

const roleToBuilder: Record<string, () => NotificationItem[]> = {
  admin: buildAdminNotifications,
  employee: buildEmployeeNotifications,
  customer: buildCustomerNotifications,
}

const roleLabels: Record<string, { title: string; subtitle: string }> = {
  admin: { title: "Notifications", subtitle: "Global system, inventory, and user activity alerts across all branches." },
  employee: { title: "Notifications", subtitle: "Branch operational alerts, payments, and system notices." },
  customer: { title: "Notifications", subtitle: "Stay updated with your latest orders, payments, and exclusive offers." },
}

export function NotificationsFeed() {
  const { user } = useAuth()
  const role: string = user?.role ?? "customer"

  const [activeFilter, setActiveFilter] = useState<FilterTab>("all")
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const builder = roleToBuilder[role] ?? buildCustomerNotifications
    return builder()
  })
  const [showAll, setShowAll] = useState(false)

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications],
  )

  const filtered = useMemo(() => {
    if (activeFilter === "all") return notifications
    return notifications.filter((n) => n.type === activeFilter)
  }, [notifications, activeFilter])

  const displayed = showAll ? filtered : filtered.slice(0, 5)
  const hasMore = filtered.length > 5 && !showAll

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const handleMarkRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    )
  }

  const filters: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "orders", label: "Orders" },
    { key: "payments", label: "Payments" },
    { key: "system", label: "System" },
  ]

  const header = roleLabels[role] ?? roleLabels.customer

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold text-foreground">{header.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{header.subtitle}</p>
      </section>

      <section className="flex flex-wrap items-center gap-3">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-bold transition-colors",
              activeFilter === f.key
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-surface-container-highest text-muted-foreground hover:bg-surface-variant",
            )}
          >
            {f.label}
            {f.key === "all" && unreadCount > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-error text-[10px] font-bold text-error-foreground">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline transition-colors"
            >
              <Bell className="w-3.5 h-3.5" />
              Mark all read
            </button>
          )}
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-highest rounded-lg text-[11px] font-bold text-muted-foreground hover:bg-surface-variant transition-colors">
            <Filter className="w-3.5 h-3.5" />
            Filter
          </button>
        </div>
      </section>

      <section className="space-y-3">
        {displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-card border border-border rounded-2xl shadow-sm">
            <Info className="w-8 h-8 text-muted-foreground/40 mb-2" />
            <span className="text-sm font-semibold">No notifications</span>
            <span className="text-xs text-muted-foreground/60">Nothing to show for this filter.</span>
          </div>
        ) : (
          displayed.map((n) => (
            <div
              key={n.id}
              className={cn(
                "group flex items-start gap-4 p-5 bg-card border-l-4 rounded-r-xl border-y border-r border-border shadow-sm hover:shadow-md transition-all",
                n.borderColor,
                !n.isRead && "ring-1 ring-primary/5",
              )}
            >
              <div
                className={cn(
                  "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                  n.iconBg,
                  n.iconColor,
                )}
              >
                {n.icon}
              </div>

              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <div className="min-w-0 flex-1">
                    <h4
                      className={cn(
                        "text-sm leading-snug",
                        n.isRead ? "font-medium text-foreground" : "font-bold text-foreground",
                      )}
                    >
                      {n.title}
                    </h4>
                    {n.description && (
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                        {n.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {n.badgeText && (
                        <span
                          className={cn(
                            "px-1.5 py-0.5 rounded text-[10px] font-bold uppercase",
                            n.badgeClass,
                          )}
                        >
                          {n.badgeText}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground/60 font-mono">
                        <Clock className="w-3 h-3" />
                        {n.timestamp}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleMarkRead(n.id)}
                      disabled={n.isRead}
                      className={cn(
                        "p-1.5 rounded-lg transition-colors",
                        !n.isRead
                          ? "text-primary hover:bg-primary-fixed"
                          : "text-muted-foreground/20 cursor-default",
                      )}
                      title="Mark as read"
                    >
                      <Bell className="w-[16px] h-[16px]" />
                    </button>
                    <button className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-muted-foreground hover:bg-surface-container transition-colors">
                      <MoreHorizontal className="w-[16px] h-[16px]" />
                    </button>
                  </div>
                </div>

                {n.metadata && n.metadata.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-surface-container-low rounded-xl border border-border/40">
                    {n.metadata.map((m, i) => (
                      <div key={i} className="flex flex-col gap-0.5">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                          {m.label}
                        </span>
                        <span className="text-xs font-semibold text-foreground truncate">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {n.actions && n.actions.length > 0 && (
                  <div className="flex items-center gap-2 pt-1">
                    {n.actions.map((a, i) => (
                      <button
                        key={i}
                        onClick={a.onClick}
                        className={cn(
                          "px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all active:scale-[0.97]",
                          a.variant === "primary" &&
                            "bg-primary text-primary-foreground shadow-sm hover:opacity-90",
                          a.variant === "outline" &&
                            "border border-border text-foreground hover:bg-surface-container",
                          a.variant === "ghost" &&
                            "text-muted-foreground hover:text-foreground hover:underline",
                        )}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </section>

      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setShowAll(true)}
            className="flex items-center gap-2 px-6 py-2.5 border border-border rounded-full text-xs font-bold text-muted-foreground hover:bg-surface-container transition-all"
          >
            <span>Load older notifications</span>
            <ChevronDown className="w-[18px] h-[18px]" />
          </button>
        </div>
      )}
    </div>
  )
}
