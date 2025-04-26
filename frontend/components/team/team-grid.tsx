import { TeamMemberCard } from "@/components/team/team-member-card"

const teamMembers = [
  {
    id: 1,
    name: "Dr. Julia Schmidt",
    role: "Lead Attorney",
    department: "Legal Department",
    email: "j.schmidt@evicase.com",
    phone: "+49 30 123456-01",
    bio: "Specialized in international patent law with over 15 years of experience advising technology companies.",
    expertise: ["Patent Law", "Technology Law", "International Litigation"],
    avatar: "/confident-blonde-professional.png",
    initials: "JS",
  },
  {
    id: 2,
    name: "Dr. Thomas Weber",
    role: "Senior Attorney",
    department: "Patent Law",
    email: "t.weber@evicase.com",
    phone: "+49 30 123456-02",
    bio: "Expert in patent disputes with a focus on technology and pharmaceutical companies. PhD in intellectual property law.",
    expertise: ["Patent Litigation", "Intellectual Property", "Pharmaceutical Law"],
    avatar: "/male-lawyer-with-scale.png",
    initials: "TW",
  },
  {
    id: 3,
    name: "Anna Miller",
    role: "Attorney",
    department: "Compliance",
    email: "a.miller@evicase.com",
    phone: "+49 30 123456-03",
    bio: "Specialized in compliance and data protection law. Advises companies on implementing compliance systems and data protection issues.",
    expertise: ["Compliance", "Data Protection Law", "Regulatory Requirements"],
    avatar: "/female-lawyer-with-books.png",
    initials: "AM",
  },
  {
    id: 4,
    name: "Mark Baker",
    role: "Legal Analyst",
    department: "Analysis",
    email: "m.baker@evicase.com",
    phone: "+49 30 123456-04",
    bio: "Expert in analyzing complex legal documents and identifying risks and inconsistencies. Specialized in AI-assisted legal analysis.",
    expertise: ["Document Analysis", "Risk Identification", "AI-assisted Analysis"],
    avatar: "/male-lawyer-with-books.png",
    initials: "MB",
  },
  {
    id: 5,
    name: "Dr. Sandro Hoffman",
    role: "Employment Law Specialist",
    department: "Legal Department",
    email: "s.hoffman@evicase.com",
    phone: "+49 30 123456-05",
    bio: "Specialized in employment law and HR compliance. Advises companies on employment law issues and restructuring.",
    expertise: ["Employment Law", "Compliance", "Restructuring"],
    avatar: "/confident-professional.png",
    initials: "SH",
  },
  {
    id: 6,
    name: "Michael Schneider",
    role: "Patent Attorney",
    department: "Patent Law",
    email: "m.schneider@evicase.com",
    phone: "+49 30 123456-06",
    bio: "Patent attorney with technical background in electrical engineering. Specialized in filing and enforcing patents in electronics and software.",
    expertise: ["Patent Applications", "Technical IP Rights", "Software Patents"],
    avatar: "/thoughtful-bearded-professional.png",
    initials: "MS",
  },
  {
    id: 7,
    name: "Laura Fischer",
    role: "Compliance Specialist",
    department: "Compliance",
    email: "l.fischer@evicase.com",
    phone: "+49 30 123456-07",
    bio: "Specialized in international compliance requirements and risk management. Experience in implementing compliance programs in multinational companies.",
    expertise: ["International Compliance", "Risk Management", "Corporate Ethics"],
    avatar: "/confident-professional.png",
    initials: "LF",
  },
  {
    id: 8,
    name: "Dr. Robert Wagner",
    role: "Head of Analysis",
    department: "Analysis",
    email: "r.wagner@evicase.com",
    phone: "+49 30 123456-08",
    bio: "Leads the analysis team with a focus on developing innovative methods for legal document analysis. PhD in legal informatics.",
    expertise: ["Legal Informatics", "Document Analysis", "Legal Tech"],
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
