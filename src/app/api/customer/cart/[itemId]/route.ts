import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import * as jwt from "jsonwebtoken"
import { db } from "@/servers/db"
import { cartItems } from "@/servers/schemas"
import { eq, and } from "drizzle-orm"

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key-change-in-production"

async function getUserIdFromToken(): Promise<string | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    return decoded.userId
  } catch (error) {
    return null
  }
}

/**
 * PUT /api/customer/cart/[itemId]
 * Update cart item quantity
 * Body: { quantity: number }
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    const userId = await getUserIdFromToken()

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    const { itemId } = params
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
  { params }: { params: { itemId: string } }
) {
  try {
    const userId = await getUserIdFromToken()

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    const { itemId } = params

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
