export interface GetReservationsParams {
  role: "admin" | "customer"
  customerId?: string
  status?: "all" | "processing" | "ready" | "completed" | "cancelled"
  search?: string
  offset?: number
  limit?: number
}

export interface ReservationRecord {
  id: string
  customerName?: string
  customerEmail?: string
  title?: string
  description?: string
  branch?: string
  itemsCount?: number
  pickupDate?: string
  status: "processing" | "ready" | "completed" | "cancelled"
  image?: string
}

export interface GetReservationsResult {
  reservations: ReservationRecord[]
  total: number
  hasMore: boolean
}

export async function getReservations(
  _params: GetReservationsParams,
): Promise<GetReservationsResult> {
  return {
    reservations: [],
    total: 0,
    hasMore: false,
  }
}
