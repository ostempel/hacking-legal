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
          <CardTitle>Logout</CardTitle>
          <CardDescription>Log out and return to the start page</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              When you log out, you will be redirected to the start page and will need to select your mode again.
            </p>
            <Button onClick={handleLogout} className="w-full sm:w-auto">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
