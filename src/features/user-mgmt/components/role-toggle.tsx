"use client"

import * as React from "react"
import { UserSearch, BadgeCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export type Role = "customer" | "staff"

interface RoleToggleProps {
  value: Role
  onChange: (value: Role) => void
  className?: string
}

export function RoleToggle({ value, onChange, className }: RoleToggleProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-1 p-1 bg-muted rounded-lg border border-border", className)}>
      <button
        type="button"
        onClick={() => onChange("customer")}
        className={cn(
          "flex items-center justify-center gap-2 py-2 rounded-md transition-all text-sm",
          value === "customer"
            ? "bg-card shadow-sm text-primary font-bold"
            : "text-muted-foreground hover:bg-background/50"
        )}
      >
        <UserSearch className="size-5" />
        Customer
      </button>
      <button
        type="button"
        onClick={() => onChange("staff")}
        className={cn(
          "flex items-center justify-center gap-2 py-2 rounded-md transition-all text-sm",
          value === "staff"
            ? "bg-card shadow-sm text-primary font-bold"
            : "text-muted-foreground hover:bg-background/50"
        )}
      >
        <BadgeCheck className="size-5" />
        Staff
      </button>
    </div>
  )
}
