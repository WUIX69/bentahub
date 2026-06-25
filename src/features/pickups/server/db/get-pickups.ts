export interface GetPickupsParams {
  role: "admin" | "employee"
  branchId?: string
  status?: "all" | "ready" | "completed" | "delayed"
  search?: string
  offset?: number
  limit?: number
}

export interface PickupOrder {
  id: string
  customerName: string
  customerEmail?: string
  branch: string
  items: string
  itemsList: { name: string; qty: string; price: string }[]
  scheduledDate: string
  status: "ready" | "completed" | "delayed"
  code?: string
  transactionId?: string
}

export interface GetPickupsResult {
  pickups: PickupOrder[]
  total: number
  hasMore: boolean
}

export async function getPickups(
  _params: GetPickupsParams,
): Promise<GetPickupsResult> {
  void _params;
  return {
    pickups: [],
    total: 0,
    hasMore: false,
  }
}
