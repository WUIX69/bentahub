/**
 * Transaction data access stub.
 *
 * Will be replaced with real Drizzle queries once the API layer is wired.
 * Currently returns empty arrays — the UI uses inline mock data.
 */

import type { Transaction } from "@/types/employee"

export interface GetTransactionsParams {
  branchId?: string
  userId?: string
  role: "employee" | "customer"
  search?: string
  status?: string
  paymentMethod?: string
  page?: number
  limit?: number
}

export interface GetTransactionsResult {
  transactions: Transaction[]
  total: number
  page: number
  totalPages: number
}

export async function getTransactions(
  _params: GetTransactionsParams
): Promise<GetTransactionsResult> {
  // TODO: implement Drizzle query with role-based filtering
  // - employee: filter by branchId, show all
  // - customer: filter by userId, show own only
  return {
    transactions: [],
    total: 0,
    page: _params.page ?? 1,
    totalPages: 0,
  }
}
