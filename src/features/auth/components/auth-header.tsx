import { APP_NAME } from "@/config"
import { Store } from "lucide-react"
import { cn } from "@/lib/utils"

interface AuthHeaderProps {
  subtitle?: string
  className?: string
}

export function AuthHeader({ subtitle, className }: AuthHeaderProps) {
  return (
    <div className={cn("flex flex-col items-center mb-6", className)}>
      <div className="bg-primary text-primary-foreground w-12 h-12 rounded-lg flex items-center justify-center mb-2 shadow-sm">
        <Store className="size-7" />
      </div>
      <h1 className="text-2xl font-bold text-primary">{APP_NAME}</h1>
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-1 text-center">{subtitle}</p>
      )}
    </div>
  )
}
