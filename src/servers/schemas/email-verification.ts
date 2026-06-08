import { pgTable, timestamp, varchar, integer } from "drizzle-orm/pg-core"
import { users } from "./users"
import { relations } from "drizzle-orm"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const emailVerificationCodes = pgTable("email_verification_codes", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  code: varchar("code", { length: 6 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  attempts: integer("attempts").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

export const emailVerificationRelations = relations(emailVerificationCodes, ({ one }) => ({
  user: one(users, {
    fields: [emailVerificationCodes.userId],
    references: [users.id],
  }),
}))

export const insertEmailVerificationSchema = createInsertSchema(emailVerificationCodes).omit({
  id: true,
  createdAt: true,
})
export const selectEmailVerificationSchema = createSelectSchema(emailVerificationCodes)

export type EmailVerificationCode = typeof emailVerificationCodes.$inferSelect
export type InsertEmailVerificationCode = typeof emailVerificationCodes.$inferInsert
