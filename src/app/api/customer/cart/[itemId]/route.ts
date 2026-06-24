import { NextRequest, NextResponse } from "next/server"
import { db } from "@/drizzle/db"
import { cartItems } from "@/drizzle/schema"
import { eq, and } from "drizzle-orm"
import { extractToken, verifyToken } from "@/lib/auth-utils"

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

/**
 * PUT /api/customer/cart/[itemId]
 * Update cart item quantity
 * Body: { quantity: number }
 */
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

    if (quantity === undefined || quantity < 1) {
      return NextResponse.json(
        { success: false, message: "Invalid quantity" },
        { status: 400 }
      )
    }

    // Fetch cart item to verify ownership
    const item = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.id, itemId),
          eq(cartItems.userId, userId)
        )
      )
      .limit(1)

    if (!item.length) {
      return NextResponse.json(
        { success: false, message: "Cart item not found" },
        { status: 404 }
      )
    }

    const cartItem = item[0]
    const newSubtotal = (Number(cartItem.price) * quantity).toFixed(2)

    const updated = await db
      .update(cartItems)
      .set({
        quantity,
        subtotal: newSubtotal,
      })
      .where(eq(cartItems.id, itemId))
      .returning()

    return NextResponse.json(
      {
        success: true,
        message: "Cart item updated",
        data: updated[0],
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error updating cart item:", error)
    return NextResponse.json(
      { success: false, message: "Failed to update cart item" },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/customer/cart/[itemId]
 * Remove item from cart
 */
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

    // Verify ownership before deleting
    const item = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.id, itemId),
          eq(cartItems.userId, userId)
        )
      )
      .limit(1)

    if (!item.length) {
      return NextResponse.json(
        { success: false, message: "Cart item not found" },
        { status: 404 }
      )
    }

    await db.delete(cartItems).where(eq(cartItems.id, itemId))

    return NextResponse.json(
      {
        success: true,
        message: "Cart item removed",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting cart item:", error)
    return NextResponse.json(
      { success: false, message: "Failed to remove cart item" },
      { status: 500 }
    )
  }
}
