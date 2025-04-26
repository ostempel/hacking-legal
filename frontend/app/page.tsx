"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Gavel, Briefcase, Scale } from "lucide-react"

export default function SelectModePage() {
  const router = useRouter()

  const handleModeSelect = (mode: "legal" | "business") => {
    // Store the selected mode in localStorage
    localStorage.setItem("userMode", mode)

    // Redirect to the appropriate page based on mode
    if (mode === "legal") {
      router.push("/dashboard")
    } else {
      router.push("/portal")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Scale className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Paragrafenbändiger</h1>
          <p className="mt-2 text-xl text-muted-foreground">Legal Evidence Analysis Platform</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card
            className="cursor-pointer transition-all hover:border-primary/50"
            onClick={() => handleModeSelect("legal")}
          >
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <Gavel className="h-10 w-10 text-primary" />
              </div>
              <CardTitle>Legal Professional</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              <p>For attorneys, legal analysts, and compliance specialists</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                variant="default"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation()
                  handleModeSelect("legal") 
                }}
              >
                Continue
              </Button>
            </CardFooter>
          </Card>

          <Card
            className="cursor-pointer transition-all hover:border-primary/50"
            onClick={() => handleModeSelect("business")}
          >
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <Briefcase className="h-10 w-10 text-primary" />
              </div>
              <CardTitle>Other Employee</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              <p>For business stakeholders, managers, and non-legal staff</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                variant="default"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation()
                  handleModeSelect("business")
                }}
              >
                Continue
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
