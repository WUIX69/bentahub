import { db } from "@/drizzle/db"
import { orders, orderItems, cartItems } from "@/drizzle/schema"
import { eq, and } from "drizzle-orm"

export async function getOrderByIdAndUserId(orderId: string, userId: string) {
  const result = await db
    .select()
    .from(orders)
    .where(
      and(
        eq(orders.id, orderId),
        eq(orders.userId, userId)
      )
    )
    .limit(1)
  return result[0] || null
}

export async function cancelOrderById(orderId: string) {
  await db
    .update(orders)
    .set({ status: "cancelled" })
    .where(eq(orders.id, orderId))
}

export async function getCartItemsByUserId(userId: string) {
  return db
    .select()
    .from(cartItems)
    .where(eq(cartItems.userId, userId))
}

export async function createOrderTransaction(
  orderData: typeof orders.$inferInsert,
  itemsData: (typeof orderItems.$inferInsert)[]
) {
  return db.transaction(async (tx) => {
    const createdOrder = await tx
      .insert(orders)
      .values(orderData)
      .returning()

    if (itemsData.length > 0) {
      await tx.insert(orderItems).values(itemsData)
    }

    await tx.delete(cartItems).where(eq(cartItems.userId, orderData.userId))

    return createdOrder[0]
  })
}
