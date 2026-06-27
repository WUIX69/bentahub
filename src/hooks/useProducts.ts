import { useCallback } from "react"
import { useProductsStore, type Product } from "@/stores/productsStore"
import { getProducts, getProductById as fetchProductByIdFromDb } from "@/server/db/get-products"

export function useProducts() {
  const products = useProductsStore((s) => s.products)
  const currentProduct = useProductsStore((s) => s.currentProduct)
  const isLoading = useProductsStore((s) => s.isLoading)
  const error = useProductsStore((s) => s.error)

  const fetchProducts = useCallback(
    async (filters?: { category?: string; branch?: string }) => {
      const state = useProductsStore.getState()
      if (state.isLoading) return
      try {
        state.setLoading(true)
        state.setError(null)

        const data = await getProducts(filters)

        const products: Product[] = (data ?? []).map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description || "",
          category: p.category || "",
          price: Number(p.price),
          bulkPrice: p.bulkPrice ? Number(p.bulkPrice) : undefined,
          weight: p.weight || "",
          image: p.image || "",
          stockStatus: (p as { stockStatus?: string }).stockStatus as Product["stockStatus"] || "in_stock",
          quantity: Number((p as { quantity?: number }).quantity || 0),
          branch: p.branch || "",
          sku: p.sku || "",
          isActive: p.isActive,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
        }))

        state.setProducts(products)
        return products
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        state.setError(message)
        console.error("Failed to fetch products:", error)
        throw error
      } finally {
        state.setLoading(false)
      }
    },
    []
  )

  const fetchProductById = useCallback(
    async (id: string) => {
      const state = useProductsStore.getState()
      if (state.isLoading) return
      try {
        state.setLoading(true)
        state.setError(null)

        const data = await fetchProductByIdFromDb(id)

        if (!data) {
          throw new Error("Product not found")
        }

        const product: Product = {
          ...data,
          description: data.description || "",
          category: data.category || "",
          bulkPrice: data.bulkPrice ? Number(data.bulkPrice) : undefined,
          weight: data.weight || "",
          image: data.image || "",
          stockStatus: (data as { stockStatus?: string }).stockStatus as Product["stockStatus"] || "in_stock",
          quantity: Number((data as { quantity?: number }).quantity || 0),
          branch: data.branch || "",
          sku: data.sku || "",
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
        }

        state.setCurrentProduct(product)
        return product
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        state.setError(message)
        console.error("Failed to fetch product:", error)
        throw error
      } finally {
        state.setLoading(false)
      }
    },
    []
  )

  const getProductById = useCallback(
    (id: string) => {
      return useProductsStore.getState().getProductById(id)
    },
    []
  )

  return {
    products,
    currentProduct,
    isLoading,
    error,
    fetchProducts,
    fetchProductById,
    getProductById,
  }
}
