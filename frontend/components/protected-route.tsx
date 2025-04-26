"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermission?: string
}

export default function ProtectedRoute({ children, requiredPermission }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasPermission } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/login?returnUrl=${encodeURIComponent(pathname || "/dashboard")}`)
    }

    if (!isLoading && isAuthenticated && requiredPermission && !hasPermission(requiredPermission)) {
      router.push("/unauthorized")
    }
  }, [isLoading, isAuthenticated, router, pathname, requiredPermission, hasPermission])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="sr-only">Loading</span>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return null
  }

  return <>{children}</>
}
