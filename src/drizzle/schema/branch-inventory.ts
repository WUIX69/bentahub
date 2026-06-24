import { pgTable, timestamp, varchar, integer } from "drizzle-orm/pg-core"
import { branches } from "./branches"
import { products } from "./products"
import { relations } from "drizzle-orm"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const branchInventory = pgTable("branch_inventory", {
  id: varchar("id", { length: 36 }).primaryKey(),
  branchId: varchar("branch_id", { length: 36 })
    .notNull()
    .references(() => branches.id, { onDelete: "cascade" }),
  productId: varchar("product_id", { length: 36 })
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  quantity: integer("quantity").default(0).notNull(),
  lowStockThreshold: integer("low_stock_threshold").default(10).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})

export const branchInventoryRelations = relations(branchInventory, ({ one }) => ({
  branch: one(branches, {
    fields: [branchInventory.branchId],
    references: [branches.id],
  }),
  product: one(products, {
    fields: [branchInventory.productId],
    references: [products.id],
  }),
}))

export const insertBranchInventorySchema = createInsertSchema(branchInventory).omit({
  id: true,
  updatedAt: true,
})
export const selectBranchInventorySchema = createSelectSchema(branchInventory)

export type BranchInventory = typeof branchInventory.$inferSelect
export type InsertBranchInventory = typeof branchInventory.$inferInsert
