import { cn } from "@/lib/utils"

interface AuthDividerProps {
  className?: string
}

export function AuthDivider({ className }: AuthDividerProps) {
  return (
    <div className={cn("relative my-6", className)}>
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-xs uppercase tracking-wider">
        <span className="bg-card px-3 text-muted-foreground font-mono">
          or continue with
        </span>
      </div>
    </div>
  )
}
