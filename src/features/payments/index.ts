/**
 * Payments Feature Slice
 *
 * Responsible for:
 * - Admin: payment metrics + all payments table with filtering
 * - Employee: payment summary cards + payment validation table
 *
 * Consumed by: src/app/admin/, src/app/employee/
 */

export * from "./components/payments-manager"
export * from "./server/db/get-payments"
export { PaymentSummaryCards } from "./components/payment-summary-cards"
export { PaymentsTable } from "./components/payments-table"
export { PaymentDetailsModal } from "./components/payment-details-modal"
export { PaymentMetrics } from "./components/payment-metrics"
export { PaymentTable } from "./components/payment-table"
export { payments } from "./data/payments"
