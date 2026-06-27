import { Suspense } from "react"
import { ResetPasswordForm } from "@/features/auth"

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-[440px] flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
}

