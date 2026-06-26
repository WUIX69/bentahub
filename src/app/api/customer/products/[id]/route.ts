import { NextRequest, NextResponse } from "next/server"
import { getProductById } from "@/features/products/server/db/get-products"

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    const product = await getProductById(id)

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(product, { status: 200 })
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch product" },
      { status: 500 }
    )
  }
}
