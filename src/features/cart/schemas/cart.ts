import { z } from "zod"

export const addToCartSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  branch: z.string().optional(),
})

export const removeCartItemSchema = z.object({
  itemId: z.string().min(1, "Item ID is required"),
})

export const updateCartItemSchema = z.object({
  itemId: z.string().min(1, "Item ID is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
})
