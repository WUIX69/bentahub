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
