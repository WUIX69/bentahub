import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), ".data")
const DB_FILE = path.join(DATA_DIR, "db.json")

function generateId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// ---- Data Definitions ----

const BRANCHES = [
  { id: generateId(), name: "Lourdes Main Branch", location: "123 Main St, Lourdes", capacity: 500 },
  { id: generateId(), name: "Lourdes Second Branch", location: "456 Oak Ave, Lourdes", capacity: 400 },
  { id: generateId(), name: "Lourdes Third Branch", location: "789 Pine Rd, Lourdes", capacity: 350 },
]

const CATEGORIES = ["Beverages", "Snacks", "Canned Goods", "Rice & Noodles", "Personal Care", "Household", "Dairy", "Frozen"]

const PRODUCTS = [
  { name: "Coca-Cola 1.5L", sku: "BEV-001", price: 55.00, category: "Beverages" },
  { name: "Sprite 1.5L", sku: "BEV-002", price: 55.00, category: "Beverages" },
  { name: "Royal 1.5L", sku: "BEV-003", price: 55.00, category: "Beverages" },
  { name: "Mountain Dew 1.5L", sku: "BEV-004", price: 55.00, category: "Beverages" },
  { name: "Bottled Water 500ml", sku: "BEV-005", price: 12.00, category: "Beverages" },
  { name: "Sting Energy Drink", sku: "BEV-006", price: 15.00, category: "Beverages" },
  { name: "Piattos Sour Cream", sku: "SNK-001", price: 25.00, category: "Snacks" },
  { name: "Oishi Prawn Crackers", sku: "SNK-002", price: 10.00, category: "Snacks" },
  { name: "Nova Country Cheddar", sku: "SNK-003", price: 25.00, category: "Snacks" },
  { name: "Chippy Barbecue", sku: "SNK-004", price: 10.00, category: "Snacks" },
  { name: "Cornick Chili", sku: "SNK-005", price: 12.00, category: "Snacks" },
  { name: "Canned Corned Beef", sku: "CND-001", price: 45.00, category: "Canned Goods" },
  { name: "Canned Sardines", sku: "CND-002", price: 25.00, category: "Canned Goods" },
  { name: "Canned Tuna", sku: "CND-003", price: 35.00, category: "Canned Goods" },
  { name: "Canned Pork & Beans", sku: "CND-004", price: 28.00, category: "Canned Goods" },
  { name: "5kg Rice", sku: "RIC-001", price: 150.00, category: "Rice & Noodles" },
  { name: "Pancit Canton", sku: "RIC-002", price: 18.00, category: "Rice & Noodles" },
  { name: "Instant Noodles (Cup)", sku: "RIC-003", price: 20.00, category: "Rice & Noodles" },
  { name: "Instant Noodles (Packet)", sku: "RIC-004", price: 12.00, category: "Rice & Noodles" },
  { name: "Bar Soap", sku: "PCR-001", price: 15.00, category: "Personal Care" },
  { name: "Shampoo Sachet", sku: "PCR-002", price: 7.00, category: "Personal Care" },
  { name: "Toothpaste", sku: "PCR-003", price: 35.00, category: "Personal Care" },
  { name: "Dishwashing Liquid", sku: "HSE-001", price: 30.00, category: "Household" },
  { name: "Laundry Detergent", sku: "HSE-002", price: 25.00, category: "Household" },
  { name: "Fresh Milk 1L", sku: "DRY-001", price: 85.00, category: "Dairy" },
  { name: "Powdered Milk 400g", sku: "DRY-002", price: 55.00, category: "Dairy" },
  { name: "Ice Cream 1L", sku: "FRZ-001", price: 120.00, category: "Frozen" },
  { name: "Frozen Chicken 1kg", sku: "FRZ-002", price: 180.00, category: "Frozen" },
]

const productIds = PRODUCTS.map(() => generateId())

function seedData(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }

  const now = new Date()

  const branchRecords = BRANCHES.map((b) => ({
    id: b.id,
    name: b.name,
    location: b.location,
    capacity: b.capacity,
    isActive: true,
    createdAt: new Date(now.getFullYear() - 1, 0, 1).toISOString(),
    updatedAt: now.toISOString(),
  }))

  const productRecords = PRODUCTS.map((p, i) => ({
    id: productIds[i],
    name: p.name,
    sku: p.sku,
    price: p.price.toFixed(2),
    category: p.category,
    isActive: true,
    createdAt: new Date(now.getFullYear() - 1, 0, 1).toISOString(),
    updatedAt: now.toISOString(),
  }))

  const inventoryRecords: Array<{
    id: string
    branchId: string
    productId: string
    quantity: number
    lowStockThreshold: number
    updatedAt: string
  }> = []

  for (const branch of BRANCHES) {
    for (let i = 0; i < PRODUCTS.length; i++) {
      const product = PRODUCTS[i]
      const pid = productIds[i]
      const isLowStock = Math.random() < 0.2
      const quantity = isLowStock
        ? Math.floor(Math.random() * 8) + 1
        : Math.floor(Math.random() * 40) + 15

      const threshold = product.category === "Frozen"
        ? 5
        : product.category === "Dairy"
          ? 8
          : product.category === "Beverages"
            ? 15
            : 10

      inventoryRecords.push({
        id: generateId(),
        branchId: branch.id,
        productId: pid,
        quantity,
        lowStockThreshold: threshold,
        updatedAt: now.toISOString(),
      })
    }
  }

  const transactionRecords: Array<{
    id: string
    branchId: string
    totalAmount: string
    paymentMethod: string
    status: string
    createdAt: string
  }> = []

  for (const branch of BRANCHES) {
    const branchMultiplier = branch.name === "Lourdes Main Branch" ? 1.5 : branch.name === "Lourdes Second Branch" ? 1.0 : 0.7

    for (let month = 0; month < 12; month++) {
      const transactionsPerMonth = Math.floor((Math.random() * 15 + 20) * branchMultiplier)

      for (let t = 0; t < transactionsPerMonth; t++) {
        const day = Math.floor(Math.random() * 28) + 1
        const hour = Math.floor(Math.random() * 12) + 8
        const minute = Math.floor(Math.random() * 60)
        const amount = Math.floor(Math.random() * 800 + 50) + Math.random()

        const transactionDate = new Date(now.getFullYear(), now.getMonth() - 11 + month, day, hour, minute)

        if (transactionDate > now) continue

        transactionRecords.push({
          id: generateId(),
          branchId: branch.id,
          totalAmount: amount.toFixed(2),
          paymentMethod: Math.random() < 0.6 ? "cash" : "gcash",
          status: Math.random() < 0.05 ? "cancelled" : "completed",
          createdAt: transactionDate.toISOString(),
        })
      }
    }
  }

  const db = {
    users: [],
    email_verification_codes: [],
    password_reset_tokens: [],
    branches: branchRecords,
    products: productRecords,
    branch_inventory: inventoryRecords,
    transactions: transactionRecords,
  }

  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))
  console.log(`✅ Seeded admin overview data:`)
  console.log(`   - ${branchRecords.length} branches`)
  console.log(`   - ${productRecords.length} products`)
  console.log(`   - ${inventoryRecords.length} inventory records`)
  console.log(`   - ${transactionRecords.length} transactions`)
  console.log(`\nFile: ${DB_FILE}`)
}

seedData()
