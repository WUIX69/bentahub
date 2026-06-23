import { NextRequest, NextResponse } from "next/server"
import { db } from "@/servers/db"
import { products } from "@/servers/schemas"
import { eq } from "drizzle-orm"

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

/**
 * GET /api/customer/products/[id]
 * Retrieve a single product by ID
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params

    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1)

    if (!product || product.length === 0) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      )
    }

    const p = product[0]
    const formattedProduct = {
      ...p,
      price: Number(p.price),
      bulkPrice: p.bulkPrice ? Number(p.bulkPrice) : undefined,
    }

    return NextResponse.json(formattedProduct, { status: 200 })
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch product" },
      { status: 500 }
    )
  }
}
