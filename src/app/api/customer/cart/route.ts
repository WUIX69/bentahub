import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import * as jwt from "jsonwebtoken"
import { db } from "@/servers/db"
import { cartItems, products } from "@/servers/schemas"
import { eq, and } from "drizzle-orm"
import { generateId } from "@/lib/auth-utils"

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
 * GET /api/customer/cart
 * Retrieve all cart items for the authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromToken()

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    const items = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.userId, userId))

    const total = items.reduce((sum, item) => sum + Number(item.subtotal), 0)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return NextResponse.json(
      {
        success: true,
        data: {
          items,
          itemCount,
          total: Number(total.toFixed(2)),
        },
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

/**
 * POST /api/customer/cart
 * Add a product to the cart
 * Body: { productId: string, quantity: number, branch: string }
 */
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromToken()

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { productId, quantity, branch } = body

    if (!productId || !quantity || quantity < 1) {
      return NextResponse.json(
        { success: false, message: "Invalid product ID or quantity" },
        { status: 400 }
      )
    }

    // Fetch product details
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1)

    if (!product.length) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      )
    }

    const productData = product[0]

    // Check if item already exists in cart
    const existingItem = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.userId, userId),
          eq(cartItems.productId, productId)
        )
      )
      .limit(1)

    const subtotal = (Number(productData.price) * quantity).toFixed(2)

    if (existingItem.length > 0) {
      // Update quantity
      const existingCartItem = existingItem[0]
      const newQuantity = existingCartItem.quantity + quantity
      const newSubtotal = (Number(productData.price) * newQuantity).toFixed(2)

      const updated = await db
        .update(cartItems)
        .set({
          quantity: newQuantity,
          subtotal: newSubtotal,
        })
        .where(eq(cartItems.id, existingCartItem.id))
        .returning()

      return NextResponse.json(
        {
          success: true,
          message: "Cart item updated",
          data: updated[0],
        },
        { status: 200 }
      )
    } else {
      // Add new item to cart
      const newCartItem = {
        id: generateId(),
        userId,
        productId,
        productName: productData.name,
        price: productData.price.toString(),
        quantity,
        subtotal,
        image: productData.image || "",
        category: productData.category,
        branch: branch || productData.branch,
      }

      const created = await db.insert(cartItems).values(newCartItem).returning()

      return NextResponse.json(
        {
          success: true,
          message: "Item added to cart",
          data: created[0],
        },
        { status: 201 }
      )
    }
  } catch (error) {
    console.error("Error adding to cart:", error)
    return NextResponse.json(
      { success: false, message: "Failed to add item to cart" },
      { status: 500 }
    )
  }
}
