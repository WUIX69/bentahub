"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function EmployeeTransactionsRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace("/shared/transactions") }, [router])
  return null
}
