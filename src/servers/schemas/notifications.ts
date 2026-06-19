import { pgTable, varchar, text, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core"
import { users } from "./users"
import { relations } from "drizzle-orm"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const notificationTypeEnum = pgEnum("notification_type", [
  "order-status",
  "order-ready",
  "order-completed",
  "payment-received",
  "low-stock",
  "new-product",
  "promotion",
  "system",
])

export const notifications = pgTable("notifications", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: notificationTypeEnum("type").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  relatedOrderId: varchar("related_order_id", { length: 36 }),
  relatedProductId: varchar("related_product_id", { length: 36 }),
  isRead: boolean("is_read").default(false).notNull(),
  readAt: timestamp("read_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
})

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}))

export const insertNotificationSchema = createInsertSchema(notifications).omit({ id: true, createdAt: true })
export const selectNotificationSchema = createSelectSchema(notifications)

export type Notification = typeof notifications.$inferSelect
export type InsertNotification = typeof notifications.$inferInsert
