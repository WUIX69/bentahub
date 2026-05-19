"use client"

import React, { useState } from "react"
import { UserPlus, X, Eye, EyeOff } from "lucide-react"

interface AddUserModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd?: (user: {
    name: string
    email: string
    role: "Admin" | "Cashier" | "Staff" | "Customer"
    branch: string
  }) => void
}

export function AddUserModal({ isOpen, onClose, onAdd }: AddUserModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"Admin" | "Cashier" | "Staff" | "Customer">("Admin")
  const [branch, setBranch] = useState("All Branches")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) return
    onAdd?.({ name, email, role, branch })
    // Reset state & close
    setName("")
    setEmail("")
    setPassword("")
    setRole("Admin")
    setBranch("All Branches")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-border animate-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <UserPlus className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-foreground">Add New User</h2>
          </div>
          <button
            className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Full Name</label>
                <input
                  className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                  placeholder="e.g. Robert Fox"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
                <input
                  className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                  placeholder="robert.fox@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Password</label>
                <div className="relative">
                  <input
                    className="w-full h-11 pl-4 pr-12 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Two Columns: Role & Branch */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Role</label>
                  <select
                    className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                    value={role}
                    onChange={(e) => setRole(e.target.value as "Admin" | "Cashier" | "Staff" | "Customer")}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Cashier">Cashier</option>
                    <option value="Staff">Staff</option>
                    <option value="Customer">Customer</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Branch Assignment</label>
                  <select
                    className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  >
                    <option value="All Branches">All Branches</option>
                    <option value="Manila Central">Manila Central</option>
                    <option value="Quezon City Hub">Quezon City Hub</option>
                    <option value="Davao Regional">Davao Regional</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-muted/20 flex items-center justify-end gap-3 border-t border-border">
            <button
              type="button"
              className="h-11 px-6 rounded-lg text-sm font-bold text-muted-foreground hover:bg-muted transition-all"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-11 px-8 bg-primary text-primary-foreground rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-95 active:scale-[0.98] transition-all"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
