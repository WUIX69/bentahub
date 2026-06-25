"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function EmployeeNotificationsRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace("/shared/notifications") }, [router])
  return null
}
