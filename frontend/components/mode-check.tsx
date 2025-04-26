"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export function ModeCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Skip check on the root page (mode selection page)
    if (pathname === "/") {
      return
    }

    // Check if user has selected a mode
    const userMode = localStorage.getItem("userMode")

    // If no mode is selected, redirect to the mode selection page
    if (!userMode) {
      router.push("/")
    }
  }, [pathname, router])

  return <>{children}</>
}
