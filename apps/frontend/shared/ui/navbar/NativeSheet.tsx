"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

interface NativeSheetProps {
  trigger: React.ReactNode
  children: React.ReactNode
  side?: "left" | "right"
  title?: string
  className?: string
  showCloseButton?: boolean
}

export function NativeSheet({
  trigger,
  children,
  side = "left",
  title,
  className,
  showCloseButton = true,
}: NativeSheetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sheetRef = useRef<HTMLDivElement>(null)

  const open = useCallback(() => {
    setIsVisible(true)
    // Force a reflow before applying the open state so the browser
    // registers the initial transform position and can transition from it
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsOpen(true)
      })
    })
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = "0"
      document.body.style.right = "0"
    } else {
      const scrollY = document.body.style.top
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.left = ""
      document.body.style.right = ""
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1)
      }
    }
  }, [isOpen])

  // Remove from visibility after close transition ends
  const handleTransitionEnd = useCallback(() => {
    if (!isOpen) {
      setIsVisible(false)
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, close])

  const translateClosed = side === "left" ? "-100%" : "100%"
  const translateOpen = "0%"

  return (
    <>
      {/* Trigger */}
      <div onClick={open} className="cursor-pointer">
        {trigger}
      </div>

      {/* Sheet + Overlay */}
      {isVisible && (
        <div className="fixed inset-0 z-50" onTransitionEnd={handleTransitionEnd}>
          {/* Overlay */}
          <div
            onClick={close}
            className="absolute inset-0 bg-black/50 transition-opacity duration-250 ease-out"
            style={{ opacity: isOpen ? 1 : 0 }}
          />

          {/* Sheet Panel */}
          <div
            ref={sheetRef}
            className={`absolute top-0 ${side === "left" ? "left-0" : "right-0"} h-full w-3/4 sm:max-w-80 bg-white shadow-lg flex flex-col transition-transform duration-250 ease-out ${className || ""}`}
            style={{
              transform: `translateX(${isOpen ? translateOpen : translateClosed})`,
              willChange: "transform",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 shrink-0">
              {title && (
                <h2 className="font-semibold text-base">{title}</h2>
              )}
              {showCloseButton && (
                <button
                  onClick={close}
                  className="ml-auto rounded-sm opacity-70 transition-opacity hover:opacity-100"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/**
 * A close trigger that can be placed inside NativeSheet content.
 * Walks up the DOM to find the sheet container and triggers close via its parent's onClick.
 */
export function NativeSheetClose({ children, className, onClick }: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    onClick?.()
    // Find the overlay (sibling of the sheet panel) and click it to close
    const sheetContainer = ref.current?.closest(".fixed.inset-0.z-50")
    if (sheetContainer) {
      const overlay = sheetContainer.querySelector("[class*='bg-black']") as HTMLElement
      overlay?.click()
    }
  }

  return (
    <div ref={ref} onClick={handleClick} className={className}>
      {children}
    </div>
  )
}
