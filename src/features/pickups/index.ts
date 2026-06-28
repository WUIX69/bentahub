/**
 * Pickups Feature Slice
 *
 * Responsible for:
 * - Admin: pickup metrics + all pending pickups table
 * - Employee: payment verification + pickup completion flow
 *
 * Consumed by: src/app/admin/, src/app/employee/
 */

export * from "./components/pickups-manager"
export * from "./server/db/get-pickups"
export { PaymentPickupList } from "./components/payment-pickup-list"
export { VerifyPickupModal } from "./components/verify-pickup-modal"
export { ConfirmPickupModal } from "./components/confirm-pickup-modal"
export { PickupDetailsModal } from "./components/pickup-details-modal"
export { PickupMetrics } from "./components/pickup-metrics"
export { PickupTable } from "./components/pickup-table"
