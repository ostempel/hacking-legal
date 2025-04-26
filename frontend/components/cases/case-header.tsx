import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Share2, Users, Calendar, MapPin, Briefcase } from "lucide-react"

interface CaseHeaderProps {
  id: string
}

export function CaseHeader({ id }: CaseHeaderProps) {
  // In a real application, you would fetch the case data based on the ID
  const caseData = {
    id,
    name: id === "C-2023-002" ? "Patentstreit TechCorp" : "Falldetails",
    status: "Kritisch",
    date: "28.11.2023",
    jurisdiction: "EU",
    legalArea: "Patentrecht",
    assignedTo: "Dr. Schmidt, Anna Müller",
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{caseData.name}</h1>
          <p className="text-muted-foreground">{caseData.id}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Users className="mr-2 h-4 w-4" />
            Team
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Teilen
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportieren
          </Button>
          <Button size="sm">Bearbeiten</Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-1">
          <Badge variant="destructive">{caseData.status}</Badge>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{caseData.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{caseData.jurisdiction}</span>
        </div>
        <div className="flex items-center gap-1">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <span>{caseData.legalArea}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{caseData.assignedTo}</span>
        </div>
      </div>
    </div>
  )
}
