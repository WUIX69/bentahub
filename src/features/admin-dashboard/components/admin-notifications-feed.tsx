"use client"

import { useState } from "react"
import {
  AlertTriangle, Package, Users, Bell, UserPlus, RefreshCw,
  Cloud, MoreHorizontal, ChevronDown
} from "lucide-react"

interface NotificationItem {
  id: string
  title: string
  description?: string
  category: string
  categoryStyle: "error" | "primary" | "success" | "secondary"
  severity: "critical" | "info" | "success" | "neutral"
  timestamp: string
  isRead: boolean
  icon: React.ReactNode
  actionLabel?: string
  actionHref?: string
}

const mockNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Low Stock Alert: Kopiko Blanca Twin (5 items remaining)",
    category: "Inventory",
    categoryStyle: "error",
    severity: "critical",
    timestamp: "2 mins ago",
    isRead: false,
    icon: <AlertTriangle className="w-5 h-5" />,
    actionLabel: "Manage Inventory",
  },
  {
    id: "n2",
    title: "New Staff Registration: Ron Lim",
    description: "A new administrator account has been provisioned. Access rights pending secondary verification.",
    category: "User Activity",
    categoryStyle: "primary",
    severity: "info",
    timestamp: "45 mins ago",
    isRead: false,
    icon: <UserPlus className="w-5 h-5" />,
    actionLabel: "Review Profile",
  },
  {
    id: "n3",
    title: "System Update: v2.4.1 successfully deployed",
    description: "The latest kernel patch has been applied to Node-01 and Node-02. Performance optimizations for DB queries are now live.",
    category: "System",
    categoryStyle: "success",
    severity: "success",
    timestamp: "3 hours ago",
    isRead: false,
    icon: <RefreshCw className="w-5 h-5" />,
  },
  {
    id: "n4",
    title: "Weekly Database Backup Completed",
    description: "Full system snapshot archived to AWS S3 (Bucket: bentahub-backups-main). Integrity check: 100%.",
    category: "System",
    categoryStyle: "secondary",
    severity: "neutral",
    timestamp: "6 hours ago",
    isRead: true,
    icon: <Cloud className="w-5 h-5" />,
    actionLabel: "Download",
  },
]

const borderColorMap: Record<string, string> = {
  critical: "border-l-error",
  info: "border-l-primary",
  success: "border-l-green-600",
  neutral: "border-l-secondary",
}

const badgeColorMap: Record<string, string> = {
  error: "bg-error-container text-error",
  primary: "bg-primary-fixed text-primary",
  success: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  secondary: "bg-secondary-container text-on-secondary-container",
}

const iconColorMap: Record<string, string> = {
  critical: "text-error",
  info: "text-primary",
  success: "text-green-600",
  neutral: "text-on-surface-variant",
}

export function AdminNotificationsFeed() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const handleMarkRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    )
  }

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage and review recent system, inventory, and user activities.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <span className="p-2 rounded-lg bg-error-container text-error">
              <AlertTriangle className="w-5 h-5 fill-current" />
            </span>
            <span className="text-xs font-bold text-error">+2 since 1h</span>
          </div>
          <div className="text-3xl font-black text-foreground">12</div>
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1">
            Critical Alerts
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <span className="p-2 rounded-lg bg-primary/10 text-primary">
              <Package className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-primary">Stable</span>
          </div>
          <div className="text-3xl font-black text-foreground">48</div>
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1">
            Inventory Updates
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <span className="p-2 rounded-lg bg-tertiary/10 text-tertiary">
              <Users className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-tertiary">Peak usage</span>
          </div>
          <div className="text-3xl font-black text-foreground">156</div>
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1">
            Active Users
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">
            Recent Activity
          </h3>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-xs font-bold text-primary hover:underline transition-all"
            >
              Mark all as read
            </button>
          )}
        </div>

        {notifications.map((n) => {
          const borderClass = borderColorMap[n.severity]
          const badgeClass = badgeColorMap[n.categoryStyle]
          const iconClass = iconColorMap[n.severity]

          return (
            <div
              key={n.id}
              className={`group flex items-start gap-4 p-5 bg-card border-l-4 ${borderClass} border-y border-r border-border rounded-r-lg shadow-sm hover:bg-muted/30 transition-all ${!n.isRead ? "ring-1 ring-primary/5" : ""}`}
            >
              <div className={`flex-shrink-0 mt-0.5 ${iconClass}`}>
                {n.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-4">
                  <div className="min-w-0">
                    <h4 className={`text-sm ${n.isRead ? "font-medium" : "font-bold"} text-foreground`}>
                      {n.title}
                    </h4>
                    {n.description && (
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                        {n.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${badgeClass}`}>
                        {n.category}
                      </span>
                      <span className="text-[11px] text-muted-foreground font-mono">{n.timestamp}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {n.actionLabel ? (
                      <button className="px-3 py-1.5 bg-primary text-primary-foreground text-[11px] font-bold rounded-lg hover:brightness-110 transition-all shadow-sm whitespace-nowrap">
                        {n.actionLabel}
                      </button>
                    ) : (
                      <button className="p-1.5 rounded-lg hover:bg-surface-variant text-muted-foreground transition-colors">
                        <MoreHorizontal className="w-[18px] h-[18px]" />
                      </button>
                    )}
                    <button
                      onClick={() => handleMarkRead(n.id)}
                      className={`p-1.5 rounded-lg transition-colors ${!n.isRead ? "text-primary hover:bg-primary/10" : "text-muted-foreground/30 cursor-default"}`}
                      disabled={n.isRead}
                      title="Mark as read"
                    >
                      <Bell className="w-[18px] h-[18px]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </section>

      <div className="flex justify-center pt-2">
        <button className="flex items-center gap-2 px-6 py-2.5 border border-border rounded-full text-xs font-bold text-muted-foreground hover:bg-surface-container transition-all">
          <span>Load older notifications</span>
          <ChevronDown className="w-[18px] h-[18px]" />
        </button>
      </div>
    </div>
  )
}
