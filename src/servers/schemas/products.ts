import { pgTable, timestamp, varchar, boolean, numeric } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const products = pgTable("products", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  sku: varchar("sku", { length: 50 }).notNull().unique(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  category: varchar("category", { length: 100 }),
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
