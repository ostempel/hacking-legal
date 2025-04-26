import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MessageSquare } from "lucide-react"

interface TeamMember {
  id: number
  name: string
  role: string
  department: string
  email: string
  phone: string
  bio: string
  expertise: string[]
  avatar: string
  initials: string
}

interface TeamMemberCardProps {
  member: TeamMember
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card>
      <div className="aspect-square relative overflow-hidden">
        <Avatar className="h-full w-full rounded-none">
          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} className="object-cover" />
          <AvatarFallback className="text-4xl rounded-none h-full">{member.initials}</AvatarFallback>
        </Avatar>
      </div>
      <CardHeader className="p-4">
        <div className="space-y-1">
          <h3 className="font-bold text-lg">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.role}</p>
          <Badge variant="outline">{member.department}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        <p className="text-sm line-clamp-3">{member.bio}</p>
        <div className="flex flex-wrap gap-1">
          {member.expertise.map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground truncate">{member.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{member.phone}</span>
        </div>
        <div className="flex gap-2 mt-2">
          <Button variant="outline" size="sm" className="w-full">
            <Mail className="h-4 w-4 mr-2" />
            E-Mail
          </Button>
          <Button variant="outline" size="sm" className="w-full">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
