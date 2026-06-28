import type { Product } from "@/types/employee"

export function getStockStatus(product: Product): "in-stock" | "low-stock" | "out-of-stock" {
  if (product.stock === 0) return "out-of-stock"
  if (product.stock <= product.reorderLevel) return "low-stock"
  return "in-stock"
}

const allProducts: Product[] = [
  { id: "prod-001", sku: "GRA-001", name: "Premium Jasmine Rice (5kg)", price: 345.0, category: "Groceries", stock: 48, reorderLevel: 10, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80", unit: "bag" },
  { id: "prod-002", sku: "SW-042", name: "Refined White Sugar (1kg)", price: 82.5, category: "Groceries", stock: 124, reorderLevel: 20, image: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=400&auto=format&fit=crop&q=80", unit: "pack" },
  { id: "prod-003", sku: "HYG-889", name: "Moisturizing Soap (135g)", price: 48.0, category: "Household", stock: 5, reorderLevel: 10, image: "https://images.unsplash.com/photo-1607006342411-92fc98e72242?w=400&auto=format&fit=crop&q=80", unit: "pcs" },
  { id: "prod-004", sku: "BAK-112", name: "Classic White Bread (600g)", price: 65.0, category: "Bakery", stock: 0, reorderLevel: 15, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80", unit: "loaf" },
  { id: "prod-005", sku: "BEV-201", name: "Instant Coffee Jar (200g)", price: 189.0, category: "Beverages", stock: 22, reorderLevel: 8, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop&q=80", unit: "jar" },
  { id: "prod-006", sku: "BEV-305", name: "Fresh Whole Milk (1L)", price: 98.0, category: "Beverages", stock: 31, reorderLevel: 10, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80", unit: "bottle" },
  { id: "prod-007", sku: "SNK-401", name: "Cheese Crackers (250g)", price: 56.0, category: "Snacks", stock: 67, reorderLevel: 15, image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400&auto=format&fit=crop&q=80", unit: "pack" },
  { id: "prod-008", sku: "GRA-015", name: "All-Purpose Flour (1kg)", price: 58.0, category: "Groceries", stock: 43, reorderLevel: 12, image: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=400&auto=format&fit=crop&q=80", unit: "pack" },
  { id: "prod-009", sku: "PHR-601", name: "Paracetamol Tablets (500mg x 20)", price: 42.0, category: "Pharmacy", stock: 89, reorderLevel: 20, image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&auto=format&fit=crop&q=80", unit: "box" },
  { id: "prod-010", sku: "HYG-445", name: "Shampoo Sachet (12ml x 12)", price: 72.0, category: "Household", stock: 3, reorderLevel: 10, image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&auto=format&fit=crop&q=80", unit: "pack" },
  { id: "prod-011", sku: "BEV-310", name: "Orange Juice (1L)", price: 125.0, category: "Beverages", stock: 18, reorderLevel: 8, image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&auto=format&fit=crop&q=80", unit: "bottle" },
  { id: "prod-012", sku: "SNK-420", name: "Potato Chips (150g)", price: 78.0, category: "Snacks", stock: 55, reorderLevel: 15, image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&auto=format&fit=crop&q=80", unit: "bag" },
  { id: "prod-013", sku: "GRA-022", name: "Soy Sauce (500ml)", price: 45.0, category: "Groceries", stock: 76, reorderLevel: 15, image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400&auto=format&fit=crop&q=80", unit: "bottle" },
  { id: "prod-014", sku: "BAK-118", name: "Pandesal (10pcs)", price: 55.0, category: "Bakery", stock: 30, reorderLevel: 10, image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&auto=format&fit=crop&q=80", unit: "pack" },
  { id: "prod-015", sku: "PHR-610", name: "Vitamin C (500mg x 30)", price: 135.0, category: "Pharmacy", stock: 41, reorderLevel: 10, image: "https://images.unsplash.com/photo-1616679911721-eff6eec18fcd?w=400&auto=format&fit=crop&q=80", unit: "box" },
  { id: "prod-016", sku: "HYG-460", name: "Dish Soap (500ml)", price: 68.0, category: "Household", stock: 37, reorderLevel: 10, image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&auto=format&fit=crop&q=80", unit: "bottle" },
]

export { allProducts as products, allProducts as employeeProducts }
