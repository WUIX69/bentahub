"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function EmployeePickupRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace("/shared/pickups") }, [router])
  return null
}
