"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function EmployeePaymentsRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace("/shared/payments") }, [router])
  return null
}
