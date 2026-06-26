import { NextRequest, NextResponse } from "next/server"
import { getProducts } from "@/features/products/server/db/get-products"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category") || undefined
    const branch = searchParams.get("branch") || undefined

    const formattedProducts = await getProducts({ category, branch })

    return NextResponse.json(formattedProducts, { status: 200 })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    )
  }
}
