import { z } from "zod"

export const createOrderSchema = z.object({
  paymentMethod: z.enum(["cash", "gcash"], {
    errorMap: () => ({ message: "Payment method must be cash or gcash" }),
  }),
  branch: z.string().min(1, "Branch is required"),
  notes: z.string().optional(),
})

export const cancelOrderSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
})
