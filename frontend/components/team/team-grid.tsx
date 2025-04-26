import { TeamMemberCard } from "@/components/team/team-member-card"

const teamMembers = [
  {
    id: 1,
    name: "Dr. Julia Schmidt",
    role: "Leitende Rechtsanwältin",
    department: "Rechtsabteilung",
    email: "j.schmidt@evicase.com",
    phone: "+49 30 123456-01",
    bio: "Spezialisiert auf internationales Patentrecht mit über 15 Jahren Erfahrung in der Beratung von Technologieunternehmen.",
    expertise: ["Patentrecht", "Technologierecht", "Internationale Rechtsstreitigkeiten"],
    avatar: "/confident-professional.png",
    initials: "JS",
  },
  {
    id: 2,
    name: "Dr. Thomas Weber",
    role: "Senior Rechtsanwalt",
    department: "Patentrecht",
    email: "t.weber@evicase.com",
    phone: "+49 30 123456-02",
    bio: "Experte für Patentstreitigkeiten mit Schwerpunkt auf Technologie- und Pharmaunternehmen. Promovierte im Bereich des gewerblichen Rechtsschutzes.",
    expertise: ["Patentstreitigkeiten", "Gewerblicher Rechtsschutz", "Pharmarecht"],
    avatar: "/confident-businessman.png",
    initials: "TW",
  },
  {
    id: 3,
    name: "Anna Müller",
    role: "Rechtsanwältin",
    department: "Compliance",
    email: "a.mueller@evicase.com",
    phone: "+49 30 123456-03",
    bio: "Spezialisiert auf Compliance und Datenschutzrecht. Berät Unternehmen bei der Implementierung von Compliance-Systemen und bei datenschutzrechtlichen Fragen.",
    expertise: ["Compliance", "Datenschutzrecht", "Regulatorische Anforderungen"],
    avatar: "/confident-city-woman.png",
    initials: "AM",
  },
  {
    id: 4,
    name: "Markus Becker",
    role: "Rechtsanalyst",
    department: "Analyse",
    email: "m.becker@evicase.com",
    phone: "+49 30 123456-04",
    bio: "Experte für die Analyse komplexer Rechtsdokumente und die Identifizierung von Risiken und Inkonsistenzen. Spezialisiert auf KI-gestützte Rechtsanalyse.",
    expertise: ["Dokumentenanalyse", "Risikoidentifikation", "KI-gestützte Analyse"],
    avatar: "/focused-professional.png",
    initials: "MB",
  },
  {
    id: 5,
    name: "Dr. Sarah Hoffmann",
    role: "Fachanwältin für Arbeitsrecht",
    department: "Rechtsabteilung",
    email: "s.hoffmann@evicase.com",
    phone: "+49 30 123456-05",
    bio: "Spezialisiert auf Arbeitsrecht und Compliance im Personalbereich. Berät Unternehmen bei arbeitsrechtlichen Fragestellungen und Restrukturierungen.",
    expertise: ["Arbeitsrecht", "Compliance", "Restrukturierung"],
    avatar: "/confident-professional.png",
    initials: "SH",
  },
  {
    id: 6,
    name: "Michael Schneider",
    role: "Patentanwalt",
    department: "Patentrecht",
    email: "m.schneider@evicase.com",
    phone: "+49 30 123456-06",
    bio: "Patentanwalt mit technischem Hintergrund in Elektrotechnik. Spezialisiert auf die Anmeldung und Durchsetzung von Patenten im Bereich der Elektronik und Software.",
    expertise: ["Patentanmeldungen", "Technische Schutzrechte", "Softwarepatente"],
    avatar: "/confident-businessman.png",
    initials: "MS",
  },
  {
    id: 7,
    name: "Laura Fischer",
    role: "Compliance Spezialistin",
    department: "Compliance",
    email: "l.fischer@evicase.com",
    phone: "+49 30 123456-07",
    bio: "Spezialisiert auf internationale Compliance-Anforderungen und Risikomanagement. Erfahrung in der Implementierung von Compliance-Programmen in multinationalen Unternehmen.",
    expertise: ["Internationale Compliance", "Risikomanagement", "Unternehmensethik"],
    avatar: "/confident-blonde-professional.png",
    initials: "LF",
  },
  {
    id: 8,
    name: "Dr. Robert Wagner",
    role: "Leiter Analyse",
    department: "Analyse",
    email: "r.wagner@evicase.com",
    phone: "+49 30 123456-08",
    bio: "Leitet das Analyseteam mit Fokus auf die Entwicklung innovativer Methoden zur rechtlichen Dokumentenanalyse. Promovierte im Bereich der Rechtsinformatik.",
    expertise: ["Rechtsinformatik", "Dokumentenanalyse", "Legal Tech"],
    avatar: "/thoughtful-bearded-professional.png",
    initials: "RW",
  },
]

export function TeamGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {teamMembers.map((member) => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
    </div>
  )
}
