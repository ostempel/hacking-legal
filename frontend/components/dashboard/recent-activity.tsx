import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    user: {
      name: "Dr. Schmidt",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DS",
    },
    action: "added a comment",
    target: "Case #C-2023-002",
    time: "10 minutes ago",
  },
  {
    id: 2,
    user: {
      name: "Anna Miller",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AM",
    },
    action: "uploaded 5 documents",
    target: "Case #C-2024-001",
    time: "45 minutes ago",
  },
  {
    id: 3,
    user: {
      name: "Thomas Weber",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "TW",
    },
    action: "completed the analysis",
    target: "Case #C-2023-003",
    time: "2 hours ago",
  },
  {
    id: 4,
    user: {
      name: "Julia Baker",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JB",
    },
    action: "created a new case",
    target: "Case #C-2024-002",
    time: "3 hours ago",
  },
  {
    id: 5,
    user: {
      name: "System",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SY",
    },
    action: "detected an inconsistency",
    target: "Case #C-2023-002",
    time: "5 hours ago",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span> {activity.action} in{" "}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
