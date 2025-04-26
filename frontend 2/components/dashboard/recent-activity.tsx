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
    action: "hat einen Kommentar hinzugefügt",
    target: "Fall #C-2023-002",
    time: "Vor 10 Minuten",
  },
  {
    id: 2,
    user: {
      name: "Anna Müller",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AM",
    },
    action: "hat 5 Dokumente hochgeladen",
    target: "Fall #C-2024-001",
    time: "Vor 45 Minuten",
  },
  {
    id: 3,
    user: {
      name: "Thomas Weber",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "TW",
    },
    action: "hat die Analyse abgeschlossen",
    target: "Fall #C-2023-003",
    time: "Vor 2 Stunden",
  },
  {
    id: 4,
    user: {
      name: "Julia Becker",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JB",
    },
    action: "hat einen neuen Fall erstellt",
    target: "Fall #C-2024-002",
    time: "Vor 3 Stunden",
  },
  {
    id: 5,
    user: {
      name: "System",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SY",
    },
    action: "hat eine Inkonsistenz erkannt",
    target: "Fall #C-2023-002",
    time: "Vor 5 Stunden",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Letzte Aktivitäten</CardTitle>
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
