import { NextRequest, NextResponse } from "next/server"
import { extractToken, verifyToken } from "@/lib/auth-utils"
import { getOrders } from "@/features/orders/server/db/get-orders"
import { createOrder } from "@/features/orders/server/actions/create-order"

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

    const data = await getOrders(userId)

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
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
    const { paymentMethod, branch, notes } = body

    const result = await createOrder(userId, { paymentMethod, branch, notes })

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      )
    }

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      { success: false, message: "Failed to create order" },
      { status: 500 }
    )
  }
}
