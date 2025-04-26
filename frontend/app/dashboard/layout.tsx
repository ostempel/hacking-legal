import type { ReactNode } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import ProtectedRoute from "@/components/protected-route"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 md:p-8">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
