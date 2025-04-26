"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { CaseOverview } from "@/components/dashboard/case-overview"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { StatCards } from "@/components/dashboard/stat-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Folder, FileText } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [userMode, setUserMode] = useState<"legal" | "business" | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get the user mode from localStorage
    const storedMode = localStorage.getItem("userMode") as "legal" | "business" | null
    setUserMode(storedMode)
    setLoading(false)
  }, [])

  // Show loading state while checking user mode
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  // If no mode is selected, redirect to selection page
  if (!userMode) {
    redirect("/")
  }

  // Legal dashboard (original)
  if (userMode === "legal") {
    return (
      <div className="container mx-auto p-6 space-y-8">
        <DashboardHeader />
        <StatCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CaseOverview />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    )
  }

  // Other Employee dashboard (empty/simplified)
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Employee Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the Paragrafenbändiger platform</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5 text-primary" />
              Case Portal
            </CardTitle>
            <CardDescription>Submit cases and upload documents</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Submit new cases or upload documents to existing cases in our unified portal.
            </p>
            <Button asChild className="w-full">
              <Link href="/portal">Open Case Portal</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Add Notes
            </CardTitle>
            <CardDescription>Provide additional information</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Add comments, observations, or additional context to your cases.
            </p>
            <Button asChild className="w-full">
              <Link href="/notes">Add Notes</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Cases</CardTitle>
          <CardDescription>You have no active cases at the moment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Folder className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium mb-2">No cases found</h3>
            <p className="text-sm text-muted-foreground max-w-md mb-6">
              You don't have any active legal cases at the moment. Submit a new case to get started with our legal
              analysis services.
            </p>
            <Button asChild>
              <Link href="/portal">Open Case Portal</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
