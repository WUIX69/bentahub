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
