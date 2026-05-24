"use client"

import { useState } from "react"
import { X, Plus } from "lucide-react"

interface ProductForm {
  name: string
  sku: string
  category: string
  stock: number
  reorderLevel: number
  unit: string
  price: number
}

interface AddStockModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: ProductForm) => void
}

const CATEGORIES = ["Groceries", "Beverages", "Household", "Pharmacy", "Snacks", "Bakery"]

export function AddStockModal({ isOpen, onClose, onSave }: AddStockModalProps) {
  const [form, setForm] = useState<ProductForm>({
    name: "", sku: "", category: "Groceries", stock: 0, reorderLevel: 10, unit: "pcs", price: 0,
  })

  if (!isOpen) return null

  const handleSave = () => {
    if (!form.name.trim() || !form.sku.trim()) return
    onSave(form)
    setForm({ name: "", sku: "", category: "Groceries", stock: 0, reorderLevel: 10, unit: "pcs", price: 0 })
    onClose()
  }

  const isValid = form.name.trim() && form.sku.trim()

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-border flex flex-col max-h-[90vh] animate-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/20">
          <h2 className="text-lg font-bold text-foreground">Add New Stock</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Product Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Premium Jasmine Rice"
                className="w-full h-11 px-4 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">SKU</label>
              <input
                type="text"
                value={form.sku}
                onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value.toUpperCase() }))}
                placeholder="e.g. GRA-001"
                className="w-full h-11 px-4 bg-background border border-border rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full h-11 px-4 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              >
                {CATEGORIES.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Stock Quantity</label>
              <input
                type="number"
                min={0}
                value={form.stock}
                onChange={(e) => setForm((f) => ({ ...f, stock: Math.max(0, parseInt(e.target.value) || 0) }))}
                className="w-full h-11 px-4 bg-background border border-border rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Unit</label>
              <select
                value={form.unit}
                onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
                className="w-full h-11 px-4 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              >
                {["pcs", "bag", "pack", "bottle", "box", "jar", "loaf"].map((u) => (<option key={u} value={u}>{u}</option>))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Price (₱)</label>
              <input
                type="number"
                min={0}
                step={0.5}
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: Math.max(0, parseFloat(e.target.value) || 0) }))}
                className="w-full h-11 px-4 bg-background border border-border rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Reorder Threshold</label>
              <input
                type="number"
                min={0}
                value={form.reorderLevel}
                onChange={(e) => setForm((f) => ({ ...f, reorderLevel: Math.max(0, parseInt(e.target.value) || 0) }))}
                className="w-full h-11 px-4 bg-background border border-border rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border bg-muted/20 flex justify-end gap-3">
          <button onClick={onClose} className="h-11 px-6 border border-border text-muted-foreground hover:bg-muted rounded-lg text-sm font-bold transition-all">Cancel</button>
          <button
            disabled={!isValid}
            onClick={handleSave}
            className="inline-flex items-center gap-2 h-11 px-6 bg-primary text-primary-foreground rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/95 disabled:opacity-40 disabled:pointer-events-none transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>
    </div>
  )
}
