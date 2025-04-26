"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowUpDown, Eye, FileText, BarChart, Calendar, MapPin, Briefcase, Users, Clock } from "lucide-react"

type SortField = "id" | "name" | "status" | "date" | "jurisdiction" | "legalArea"
type SortDirection = "asc" | "desc"

const cases = [
  {
    id: "C-2024-006",
    name: "Copyright Review",
    status: "Not Started Yet",
    date: "2024-03-15",
    jurisdiction: "Germany",
    legalArea: "Copyright Law",
    riskLevel: "low",
    documents: 12,
  },
  {
    id: "C-2024-007",
    name: "Merger Compliance",
    status: "Not Started Yet",
    date: "2024-03-18",
    jurisdiction: "EU",
    legalArea: "Corporate Law",
    riskLevel: "medium",
    documents: 8,
  },
  {
    id: "C-2023-001",
    name: "Product Liability XYZ Corp",
    status: "In Progress",
    date: "2023-12-15",
    jurisdiction: "Germany",
    legalArea: "Product Liability",
    riskLevel: "medium",
    documents: 24,
  },
  {
    id: "C-2023-002",
    name: "Patent Dispute TechCorp",
    status: "Critical",
    date: "2023-11-28",
    jurisdiction: "EU",
    legalArea: "Patent Law",
    riskLevel: "high",
    documents: 56,
  },
  {
    id: "C-2023-003",
    name: "Labor Law Compliance",
    status: "Completed",
    date: "2023-10-05",
    jurisdiction: "Germany",
    legalArea: "Labor Law",
    riskLevel: "low",
    documents: 18,
  },
  {
    id: "C-2024-001",
    name: "Data Protection Audit",
    status: "In Progress",
    date: "2024-01-10",
    jurisdiction: "Germany",
    legalArea: "Data Protection",
    riskLevel: "medium",
    documents: 32,
  },
  {
    id: "C-2024-002",
    name: "Supplier Contract Analysis",
    status: "In Progress",
    date: "2024-02-01",
    jurisdiction: "International",
    legalArea: "Contract Law",
    riskLevel: "medium",
    documents: 41,
  },
  {
    id: "C-2024-003",
    name: "Trademark Infringement",
    status: "Critical",
    date: "2024-02-15",
    jurisdiction: "USA",
    legalArea: "Trademark Law",
    riskLevel: "high",
    documents: 27,
  },
  {
    id: "C-2024-004",
    name: "Compliance Audit",
    status: "In Progress",
    date: "2024-03-01",
    jurisdiction: "EU",
    legalArea: "Compliance",
    riskLevel: "medium",
    documents: 53,
  },
  {
    id: "C-2024-005",
    name: "Antitrust Review",
    status: "In Progress",
    date: "2024-03-10",
    jurisdiction: "Germany",
    legalArea: "Antitrust Law",
    riskLevel: "medium",
    documents: 38,
  },
]

const getStatusBadge = (status: string, riskLevel: string) => {
  if (status === "Critical") {
    return <Badge variant="destructive">{status}</Badge>
  } else if (status === "Completed") {
    return (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
        {status}
      </Badge>
    )
  } else if (status === "Not Started Yet") {
    return (
      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
        {status}
      </Badge>
    )
  } else {
    if (riskLevel === "high") {
      return (
        <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200">
          {status}
        </Badge>
      )
    }
    return <Badge variant="secondary">{status}</Badge>
  }
}

function CaseDetailDialog({ isOpen, onClose, caseItem }) {
  if (!caseItem) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{caseItem.name}</DialogTitle>
          <DialogDescription>{caseItem.id}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1">{getStatusBadge(caseItem.status, caseItem.riskLevel)}</div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{new Date(caseItem.date).toLocaleDateString("en-US")}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{caseItem.jurisdiction}</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span>{caseItem.legalArea}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Case Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span>{new Date(caseItem.date).toLocaleDateString("en-US")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span>{new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString("en-US")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Documents:</span>
                  <span>{caseItem.documents}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Risk Level:</span>
                  <span
                    className={`font-medium ${
                      caseItem.riskLevel === "high"
                        ? "text-red-500"
                        : caseItem.riskLevel === "medium"
                          ? "text-amber-500"
                          : "text-green-500"
                    }`}
                  >
                    {caseItem.riskLevel.charAt(0).toUpperCase() + caseItem.riskLevel.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">Team</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Assigned Team</p>
                    <p className="text-sm text-muted-foreground">Dr. Julia Schmidt, Anna Miller</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Next Deadline</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(Date.now() + Math.random() * 10000000000).toLocaleDateString("en-US")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Description</h3>
            <p className="text-sm text-muted-foreground">
              {caseItem.legalArea === "Patent Law"
                ? "This case involves a patent dispute with TechCorp regarding their data processing technology. The client claims that TechCorp has infringed on their patent for a similar technology. Initial analysis shows potential merit to the claim, but further investigation is needed."
                : caseItem.legalArea === "Labor Law"
                  ? "This case involves compliance with labor regulations and employee rights. The client is seeking to ensure their policies are in line with current labor laws and to address potential issues before they escalate."
                  : "This case requires legal analysis and strategic planning. The team is currently reviewing all relevant documents and preparing a comprehensive strategy based on the jurisdiction and legal area involved."}
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button asChild>
              <Link href={`/cases/${caseItem.id}`}>View Full Details</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function CaseList() {
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [selectedCase, setSelectedCase] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const openCaseDetails = (caseItem) => {
    setSelectedCase(caseItem)
    setDialogOpen(true)
  }

  const closeCaseDetails = () => {
    setDialogOpen(false)
  }

  const sortedCases = [...cases].sort((a, b) => {
    const direction = sortDirection === "asc" ? 1 : -1

    if (sortField === "date") {
      return direction * (new Date(a.date).getTime() - new Date(b.date).getTime())
    }

    if (a[sortField] < b[sortField]) return -1 * direction
    if (a[sortField] > b[sortField]) return 1 * direction
    return 0
  })

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Button
                variant="ghost"
                onClick={() => handleSort("id")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Case ID
                {sortField === "id" && <ArrowUpDown className="h-3 w-3" />}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("name")}
                className="flex items-center gap-1 p-0 h-auto font-medium text-left"
              >
                Name
                {sortField === "name" && <ArrowUpDown className="h-3 w-3" />}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("status")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Status
                {sortField === "status" && <ArrowUpDown className="h-3 w-3" />}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("date")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Date
                {sortField === "date" && <ArrowUpDown className="h-3 w-3" />}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("jurisdiction")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Jurisdiction
                {sortField === "jurisdiction" && <ArrowUpDown className="h-3 w-3" />}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("legalArea")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Legal Area
                {sortField === "legalArea" && <ArrowUpDown className="h-3 w-3" />}
              </Button>
            </TableHead>
            <TableHead className="text-right">Documents</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCases.map((caseItem) => (
            <TableRow key={caseItem.id}>
              <TableCell className="font-medium">
                <Link href={`/cases/${caseItem.id}`} className="hover:underline">
                  {caseItem.id}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/cases/${caseItem.id}`} className="hover:underline">
                  {caseItem.name}
                </Link>
              </TableCell>
              <TableCell>{getStatusBadge(caseItem.status, caseItem.riskLevel)}</TableCell>
              <TableCell>{new Date(caseItem.date).toLocaleDateString("en-US")}</TableCell>
              <TableCell>{caseItem.jurisdiction}</TableCell>
              <TableCell>{caseItem.legalArea}</TableCell>
              <TableCell className="text-right">{caseItem.documents}</TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openCaseDetails(caseItem)} title="Quick View">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Quick view</span>
                  </Button>
                  <Button variant="ghost" size="icon" asChild title="Documents">
                    <Link href={`/cases/${caseItem.id}?tab=documents`}>
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Documents</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild title="Analysis">
                    <Link href={`/cases/${caseItem.id}?tab=analysis`}>
                      <BarChart className="h-4 w-4" />
                      <span className="sr-only">Analysis</span>
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CaseDetailDialog isOpen={dialogOpen} onClose={closeCaseDetails} caseItem={selectedCase} />
    </Card>
  )
}
