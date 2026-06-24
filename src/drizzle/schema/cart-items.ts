import { pgTable, varchar, integer, timestamp, numeric } from "drizzle-orm/pg-core"
import { users } from "./users"
import { relations } from "drizzle-orm"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const cartItems = pgTable("cart_items", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  productId: varchar("product_id", { length: 36 }).notNull(),
  productName: varchar("product_name", { length: 255 }).notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").notNull().default(1),
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
  image: varchar("image", { length: 500 }),
  category: varchar("category", { length: 100 }),
  branch: varchar("branch", { length: 100 }).notNull(),
  addedAt: timestamp("added_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  user: one(users, {
    fields: [cartItems.userId],
    references: [users.id],
  }),
}))

export const insertCartItemSchema = createInsertSchema(cartItems).omit({ id: true, addedAt: true, updatedAt: true })
export const selectCartItemSchema = createSelectSchema(cartItems)

export type CartItem = typeof cartItems.$inferSelect
export type InsertCartItem = typeof cartItems.$inferInsert
