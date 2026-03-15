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
        title="Article Not Found"
        message="We couldn't load the requested blog post. It might have been moved or deleted."
        onRetry={() => reset()}
      />
    </main>
  )
}
