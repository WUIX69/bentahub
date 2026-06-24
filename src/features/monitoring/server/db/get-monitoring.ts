import { db } from "@/drizzle/db"
import { eq } from "drizzle-orm"
import { transactions } from "@/drizzle/schema/transactions"
import { branchInventory } from "@/drizzle/schema/branch-inventory"

export interface MonitoringSummary {
  totalStockValue: string
  lowStockItems: number
  pendingReservations: number
  todayRevenue: number
  voidedCount: number
  alerts: { type: "critical" | "warning" | "success"; title: string; description: string }[]
}

export async function getMonitoring(branchId?: string): Promise<MonitoringSummary> {
  const allTxns = branchId
    ? await db.select().from(transactions).where(eq(transactions.branchId, branchId))
    : await db.select().from(transactions)

  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const todayTxns = allTxns.filter((t) => new Date(t.createdAt) >= todayStart)

  const todayRevenue = todayTxns
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + parseFloat(t.totalAmount), 0)

  const voidedCount = todayTxns.filter((t) => t.status === "cancelled").length

  const pendingReservations = allTxns.filter((t) => t.status === "pending").length

  const inventory = branchId
    ? await db.select().from(branchInventory).where(eq(branchInventory.branchId, branchId))
    : await db.select().from(branchInventory)

  const lowStockItems = inventory.filter((i) => i.quantity < i.lowStockThreshold).length

  const alerts: { type: "critical" | "warning" | "success"; title: string; description: string }[] = []

  if (lowStockItems > 10) {
    alerts.push({ type: "critical", title: "Critical Stock Levels", description: `${lowStockItems} items below threshold.` })
  } else if (lowStockItems > 0) {
    alerts.push({ type: "warning", title: "Low Stock Warning", description: `${lowStockItems} items running low.` })
  }

  alerts.push({ type: "success", title: "System Healthy", description: "All systems operational." })

  return {
    totalStockValue: "₱0.00",
    lowStockItems,
    pendingReservations,
    todayRevenue,
    voidedCount,
    alerts,
  }
}
