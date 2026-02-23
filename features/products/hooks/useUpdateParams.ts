import { useRouter, useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation'

export const useUpdateParams = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const updateParams = (
    updates: Record<string, string | null>,
    options?: { scroll?: boolean }
  ) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })

    // Reset pagination if filters change
    if (!("page" in updates)) {
      params.delete("page")
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: options?.scroll ?? false,
    })
  }

  return updateParams
}