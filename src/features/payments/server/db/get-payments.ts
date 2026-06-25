export interface GetPaymentsParams {
  role: "admin" | "employee"
  branchId?: string
  status?: "all" | "pending" | "verified" | "failed"
  search?: string
  offset?: number
  limit?: number
}

export interface PaymentRecord {
  id: string
  transactionId: string
  referenceNumber: string
  method: "cash" | "gcash"
  amount: number
  status: "pending" | "verified" | "failed"
  date: string
  customerName?: string
  branchName?: string
  verifiedAt?: string
  verifiedBy?: string
}

export interface GetPaymentsResult {
  payments: PaymentRecord[]
  total: number
  hasMore: boolean
}

export async function getPayments(
  _params: GetPaymentsParams,
): Promise<GetPaymentsResult> {
  void _params;
  return {
    payments: [],
    total: 0,
    hasMore: false,
  }
}
