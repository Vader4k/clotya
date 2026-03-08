"use client"

import { useMe } from "../hooks/auth.hooks"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


const AdminAuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, error } = useMe()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!data || data.user.role !== "admin") {
        router.push("/")
      }
    }
  }, [data, isLoading])

  if (isLoading) return null
  return children
}

export default AdminAuthGuard