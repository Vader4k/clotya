"use client"

import { useEffect } from "react"
import AppErrorState from "@/shared/ui/AppErrorState"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="w-full max-w-7xl mx-auto my-20 px-4">
      <AppErrorState 
        title="Product Not Found"
        message="We couldn't find the product you're looking for, or there was an error loading it."
        onRetry={() => reset()}
      />
    </main>
  )
}
