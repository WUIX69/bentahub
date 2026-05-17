"use client"

import { cn } from "@/lib/utils"

export function CategorySidebar() {
  const categories = [
    { name: "All Products", count: 24, active: true },
    { name: "Grains & Rice", count: 5, active: false },
    { name: "Fresh Produce", count: 8, active: false },
    { name: "Canned Goods", count: 6, active: false },
    { name: "Dairy & Eggs", count: 3, active: false },
    { name: "Snacks", count: 4, active: false },
  ]

  return (
    <div className="w-56 shrink-0 hidden md:flex flex-col gap-6 p-4 border-r border-border min-h-[calc(100vh-8rem)]">
      {/* Categories */}
      <div>
        <h3 className="text-xs font-bold tracking-widest text-muted-foreground mb-3 uppercase">
          Categories
        </h3>
        <div className="flex flex-col gap-1">
          {categories.map((category) => (
            <button
              key={category.name}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                category.active
                  ? "bg-accent text-primary font-bold"
                  : "text-foreground hover:bg-muted"
              )}
            >
              <span>{category.name}</span>
              <span className={cn(
                "text-xs px-1.5 py-0.5 rounded-full",
                category.active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              )}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Availability */}
      <div>
        <h3 className="text-xs font-bold tracking-widest text-muted-foreground mb-3 uppercase">
          Availability
        </h3>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input 
              type="checkbox" 
              defaultChecked 
              className="rounded text-primary focus:ring-primary h-4 w-4 border-border bg-background"
            />
            <span className="text-foreground">In Stock Only</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input 
              type="checkbox" 
              className="rounded text-primary focus:ring-primary h-4 w-4 border-border bg-background"
            />
            <span className="text-foreground">Fast Delivery</span>
          </label>
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Price Range placeholder */}
      <div>
        <h3 className="text-xs font-bold tracking-widest text-muted-foreground mb-3 uppercase">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            placeholder="Min" 
            className="w-full h-8 text-sm border border-border rounded-lg px-2 bg-transparent"
          />
          <span className="text-muted-foreground">-</span>
          <input 
            type="text" 
            placeholder="Max" 
            className="w-full h-8 text-sm border border-border rounded-lg px-2 bg-transparent"
          />
        </div>
      </div>
    </div>
  )
}
