/**
 * Settings Feature Slice
 *
 * Responsible for:
 * - Admin: placeholder with theme/session management
 * - Customer: full profile management (name, email, role, verification, sign out)
 *
 * Consumed by: src/app/admin/, src/app/customer/
 */

export * from "./components/settings-panel"
export * from "./server/db/get-settings"
