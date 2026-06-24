import { pgTable, varchar, text, numeric, integer, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const productStockStatusEnum = pgEnum("product_stock_status", ["in-stock", "low-stock", "out-of-stock"])

export const products = pgTable("products", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  bulkPrice: numeric("bulk_price", { precision: 10, scale: 2 }),
  weight: varchar("weight", { length: 50 }),
  image: varchar("image", { length: 500 }),
  stockStatus: productStockStatusEnum("stock_status").default("in-stock").notNull(),
  quantity: integer("quantity").default(0).notNull(),
  branch: varchar("branch", { length: 100 }).notNull(),
  sku: varchar("sku", { length: 100 }).unique(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})

export const insertProductSchema = createInsertSchema(products).omit({ id: true, createdAt: true, updatedAt: true })
export const selectProductSchema = createSelectSchema(products)

export type Product = typeof products.$inferSelect
export type InsertProduct = typeof products.$inferInsert
