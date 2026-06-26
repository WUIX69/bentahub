import { NextRequest, NextResponse } from "next/server"
import { extractToken, verifyToken } from "@/lib/auth-utils"
import { getCart } from "@/features/cart/server/db/get-cart"
import { addToCart } from "@/features/cart/server/actions/add-to-cart"

async function getUserIdFromToken(request: NextRequest): Promise<string | null> {
  const token = extractToken(request)

  if (!token) {
    return null
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return null
  }

  return decoded.userId
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromToken(request)

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    const data = await getCart(userId)

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch cart" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromToken(request)

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { productId, quantity, branch } = body

    const result = await addToCart(userId, { productId, quantity, branch })

    if (!result.success) {
      const status = result.message === "Product not found" ? 404 : 400
      return NextResponse.json(result, { status })
    }

    return NextResponse.json(result, { status: result.message === "Item added to cart" ? 201 : 200 })
  } catch (error) {
    console.error("Error adding to cart:", error)
    return NextResponse.json(
      { success: false, message: "Failed to add item to cart" },
      { status: 500 }
    )
  }
}
