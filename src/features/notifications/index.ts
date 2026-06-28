/**
 * Notifications Feature Slice
 *
 * Responsible for:
 * - Unified notification feed for all roles (admin, employee, customer)
 * - Notification read-state management
 * - Role-adaptive notification data
 *
 * Consumed by: src/app/(dashboard)/admin/, src/app/(dashboard)/employee/, src/app/(dashboard)/customer/
 */

export { NotificationsFeed } from "./components/notifications-feed"
export type { NotificationItem } from "./components/notifications-feed"
export { CustomerNotificationsFeed } from "./components/customer-notifications-feed"
export { EmployeeNotificationsFeed } from "./components/employee-notifications-feed"
export { AdminNotificationsFeed } from "./components/admin-notifications-feed"
