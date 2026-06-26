import { NextRequest, NextResponse } from "next/server"
import { extractToken, verifyToken } from "@/lib/auth-utils"
import { updateCartItem } from "@/features/cart/server/actions/update-cart-item"
import { removeCartItem } from "@/features/cart/server/actions/remove-cart-item"

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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    const userId = await getUserIdFromToken(request)

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    const { itemId } = await params
    const body = await request.json()
    const { quantity } = body

    const result = await updateCartItem(itemId, userId, quantity)

    if (!result.success) {
      const status = result.message === "Cart item not found" ? 404 : 400
      return NextResponse.json(result, { status })
    }

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error("Error updating cart item:", error)
    return NextResponse.json(
      { success: false, message: "Failed to update cart item" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    const userId = await getUserIdFromToken(request)

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    const { itemId } = await params

    const result = await removeCartItem(itemId, userId)

    if (!result.success) {
      return NextResponse.json(result, { status: 404 })
    }

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error("Error deleting cart item:", error)
    return NextResponse.json(
      { success: false, message: "Failed to remove cart item" },
      { status: 500 }
    )
  }
}
