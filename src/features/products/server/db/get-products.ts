"use server"

import { db } from "@/drizzle/db"
import { products } from "@/drizzle/schema"
import { eq, and } from "drizzle-orm"

export interface ProductFilters {
  category?: string
  branch?: string
}

export async function getProducts(filters?: ProductFilters) {
  const conditions = [eq(products.isActive, true)]

  if (filters?.category) {
    conditions.push(eq(products.category, filters.category))
  }

  if (filters?.branch) {
    conditions.push(eq(products.branch, filters.branch))
  }

  const allProducts = await db
    .select()
    .from(products)
    .where(conditions.length > 1 ? and(...conditions) : conditions[0])
    .orderBy(products.createdAt)

  return allProducts.map((p) => ({
    ...p,
    price: Number(p.price),
    bulkPrice: p.bulkPrice ? Number(p.bulkPrice) : undefined,
  }))
}

export async function getProductById(id: string) {
  const result = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1)

  if (!result || result.length === 0) return null

  const p = result[0]
  return {
    ...p,
    price: Number(p.price),
    bulkPrice: p.bulkPrice ? Number(p.bulkPrice) : undefined,
  }
}
