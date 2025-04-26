import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"
import Link from "next/link"

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center space-y-6">
        <ShieldAlert className="mx-auto h-24 w-24 text-destructive opacity-80" />
        <h1 className="text-4xl font-bold">Access Denied</h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          You don&apos;t have permission to access this resource.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild>
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
