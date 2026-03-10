"use client"

import { useMe } from "../hooks/auth.hooks"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


const AdminAuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, error } = useMe()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!data || error || data.role !== "admin") {
        router.push("/login")
      }
    }
  }, [data, isLoading, error, router])

  if (isLoading) return <div className="flex h-screen items-center justify-center">Loading...</div>
  return children
}

export default AdminAuthGuard