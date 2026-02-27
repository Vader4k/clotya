"use client"
import { useEffect, useState } from "react"

export function useDebounce<T>(value: T, delay: number): T {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    //timer to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    //clean up the timer if value or delay changes before timer finishes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debounceValue;
}
