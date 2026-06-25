import { db } from "@/drizzle/db"
import { eq } from "drizzle-orm"
import { transactions } from "@/drizzle/schema/transactions"

export interface HistoryRecord {
  id: string
  branchId: string
  totalAmount: string
  paymentMethod: "cash" | "gcash"
  status: string
  createdAt: Date
}

export async function getHistory(branchId?: string): Promise<{
  records: HistoryRecord[]
  totals: { total: number; cash: number; gcash: number }
}> {
  const records = branchId
    ? await db.select().from(transactions).where(eq(transactions.branchId, branchId))
    : await db.select().from(transactions)

  const cash = records.filter((r) => r.paymentMethod === "cash").length
  const gcash = records.filter((r) => r.paymentMethod === "gcash").length

  return {
    records: records as HistoryRecord[],
    totals: { total: records.length, cash, gcash },
  }
}
