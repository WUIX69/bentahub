import { NextRequest, NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { products } from "@/drizzle/schema"
import { eq, and } from "drizzle-orm"

/**
 * GET /api/customer/products
 * Retrieve all active products
 * Query params:
 * - category: filter by category
 * - branch: filter by branch
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const branch = searchParams.get("branch")

    const conditions = [eq(products.isActive, true)]

    if (category) {
      conditions.push(eq(products.category, category))
    }

    if (branch) {
      conditions.push(eq(products.branch, branch))
    }

    const allProducts = await db
      .select()
      .from(products)
      .where(conditions.length > 1 ? and(...conditions) : conditions[0])
      .orderBy(products.createdAt)

    // Format the response to return numeric prices
    const formattedProducts = allProducts.map((p) => ({
      ...p,
      price: Number(p.price),
      bulkPrice: p.bulkPrice ? Number(p.bulkPrice) : undefined,
    }))

    return NextResponse.json(formattedProducts, { status: 200 })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    )
  }
}
