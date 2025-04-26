"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function LogoutSettings() {
  const router = useRouter()

  const handleLogout = () => {
    // Clear user mode from localStorage
    localStorage.removeItem("userMode")

    // Redirect to the front page
    router.push("/")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Abmelden</CardTitle>
          <CardDescription>Melden Sie sich ab und kehren Sie zur Startseite zurück</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Wenn Sie sich abmelden, werden Sie zur Startseite weitergeleitet und müssen Ihren Modus erneut auswählen.
            </p>
            <Button onClick={handleLogout} className="w-full sm:w-auto">
              <LogOut className="mr-2 h-4 w-4" />
              Abmelden
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
