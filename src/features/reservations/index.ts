/**
 * Reservations Feature Slice
 *
 * Responsible for:
 * - Admin: reservation metrics + filters + table
 * - Customer: reservation cards with tab filtering
 *
 * Consumed by: src/app/admin/, src/app/customer/
 */

export * from "./components/reservations-manager"
export * from "./server/db/get-reservations"
