"use client"

import { useState, useEffect, useCallback } from "react"
import { SalesFilters, SalesMetrics } from "@/features/analytics"
import { TransactionDetailsTable } from "@/features/transactions"
import type { SalesApiData } from "@/types/admin"
import { useAuth } from "@/hooks/useAuth"
import { getSalesData } from "@/features/analytics/server/db/get-sales"

export default function SalesPage() {
  const [data, setData] = useState<SalesApiData | null>(null)
  const [loading, setLoading] = useState(true)
  const [branchId, setBranchId] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [page, setPage] = useState(1)
  const { user } = useAuth()

  const fetchData = useCallback(async () => {
    if (!user) return
    setLoading(true)
    try {
      const filters = {
        page,
        pageSize: 15,
        branchId: branchId || undefined,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
      }

      const result = await getSalesData(filters)
      if (result) {
        setData(result)
      }
    } catch (error) {
      console.error("Failed to fetch sales data:", error)
    } finally {
      setLoading(false)
    }
  }, [branchId, dateFrom, dateTo, page, user])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData()
  }, [fetchData])

  const handleFilter = (fBranchId: string, fDateFrom: string, fDateTo: string) => {
    setBranchId(fBranchId)
    setDateFrom(fDateFrom)
    setDateTo(fDateTo)
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <SalesFilters
          branches={data?.branches || []}
          onFilter={handleFilter}
          branchId={branchId}
          dateFrom={dateFrom}
          dateTo={dateTo}
        />
        <SalesMetrics overview={data?.overview || null} loading={loading} />
      </div>
      <TransactionDetailsTable
        transactions={data?.transactions || []}
        totalCount={data?.totalCount || 0}
        page={page}
        pageSize={15}
        onPageChange={setPage}
        loading={loading}
      />
    </div>
  )
}
