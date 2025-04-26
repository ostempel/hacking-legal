import { Button } from "@/components/ui/button"
import { Plus, UserPlus } from "lucide-react"

export function TeamHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">Team</h1>
        <p className="text-muted-foreground">Our expert team for legal analysis and case processing</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <UserPlus className="mr-2 h-4 w-4" />
          Invite
        </Button>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>
    </div>
  )
}
