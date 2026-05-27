"use client"

import React from "react"
import { Trash2 } from "lucide-react"

interface DeleteUserModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  userName?: string
}

export function DeleteUserModal({ isOpen, onClose, onConfirm, userName }: DeleteUserModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-border animate-in zoom-in duration-200">
        <div className="p-6 flex flex-col items-center text-center">
          {/* Warning Icon */}
          <div className="w-16 h-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-6">
            <Trash2 className="h-8 w-8" />
          </div>

          {/* Dialog Title */}
          <h2 className="text-xl font-bold text-foreground mb-2">Delete User</h2>
          
          {/* Dialog Description */}
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Are you sure you want to delete {userName ? <strong className="text-foreground">{userName}</strong> : "this user"}? This action cannot be undone and will remove all associated data.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full">
            <button
              type="button"
              className="flex-1 h-12 px-4 rounded-lg border border-border text-foreground font-bold text-sm hover:bg-muted transition-all"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex-1 h-12 px-4 rounded-lg bg-destructive text-destructive-foreground font-bold text-sm shadow-lg shadow-destructive/20 hover:opacity-90 active:scale-[0.98] transition-all"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
