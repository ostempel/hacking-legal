import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, User } from "lucide-react"

export default function RecentCases() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Smith v. Johnson</CardTitle>
            <Badge>Active</Badge>
          </div>
          <CardDescription>Case #2023-0142</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Last updated: 3 days ago</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <User className="mr-2 h-4 w-4" />
              <span>Client: John Smith</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <FileText className="mr-2 h-4 w-4" />
              <span>Type: Personal Injury</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Estate of Williams</CardTitle>
            <Badge>Active</Badge>
          </div>
          <CardDescription>Case #2023-0156</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Last updated: 1 week ago</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <User className="mr-2 h-4 w-4" />
              <span>Client: Estate of R. Williams</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <FileText className="mr-2 h-4 w-4" />
              <span>Type: Probate</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Doe v. City of Springfield</CardTitle>
            <Badge variant="outline">Pending</Badge>
          </div>
          <CardDescription>Case #2022-0394</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Last updated: 2 weeks ago</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <User className="mr-2 h-4 w-4" />
              <span>Client: Jane Doe</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <FileText className="mr-2 h-4 w-4" />
              <span>Type: Municipal Liability</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
