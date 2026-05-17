import { Globe, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SocialAuthButtons() {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <Button
        variant="outline"
        type="button"
        className="flex items-center justify-center gap-2"
      >
        <Globe className="size-5" />
        Google
      </Button>
      <Button
        variant="outline"
        type="button"
        className="flex items-center justify-center gap-2"
      >
        <Terminal className="size-5" />
        Github
      </Button>
    </div>
  )
}
