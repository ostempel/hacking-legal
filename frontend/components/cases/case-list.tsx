"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Eye, FileText, BarChart } from "lucide-react"

type SortField = "id" | "name" | "status" | "date" | "jurisdiction" | "legalArea"
type SortDirection = "asc" | "desc"

const cases = [
  {
    id: "C-2023-001",
    name: "Produkthaftung XYZ GmbH",
    status: "In Bearbeitung",
    date: "2023-12-15",
    jurisdiction: "Deutschland",
    legalArea: "Produkthaftung",
    riskLevel: "medium",
    documents: 24,
  },
  {
    id: "C-2023-002",
    name: "Patentstreit TechCorp",
    status: "Kritisch",
    date: "2023-11-28",
    jurisdiction: "EU",
    legalArea: "Patentrecht",
    riskLevel: "high",
    documents: 56,
  },
  {
    id: "C-2023-003",
    name: "Arbeitsrecht Compliance",
    status: "Abgeschlossen",
    date: "2023-10-05",
    jurisdiction: "Deutschland",
    legalArea: "Arbeitsrecht",
    riskLevel: "low",
    documents: 18,
  },
  {
    id: "C-2024-001",
    name: "Datenschutzprüfung",
    status: "In Bearbeitung",
    date: "2024-01-10",
    jurisdiction: "Deutschland",
    legalArea: "Datenschutz",
    riskLevel: "medium",
    documents: 32,
  },
  {
    id: "C-2024-002",
    name: "Vertragsanalyse Lieferanten",
    status: "In Bearbeitung",
    date: "2024-02-01",
    jurisdiction: "International",
    legalArea: "Vertragsrecht",
    riskLevel: "medium",
    documents: 41,
  },
  {
    id: "C-2024-003",
    name: "Markenrechtsverletzung",
    status: "Kritisch",
    date: "2024-02-15",
    jurisdiction: "USA",
    legalArea: "Markenrecht",
    riskLevel: "high",
    documents: 27,
  },
  {
    id: "C-2024-004",
    name: "Compliance Audit",
    status: "In Bearbeitung",
    date: "2024-03-01",
    jurisdiction: "EU",
    legalArea: "Compliance",
    riskLevel: "medium",
    documents: 53,
  },
  {
    id: "C-2024-005",
    name: "Kartellrechtliche Prüfung",
    status: "In Bearbeitung",
    date: "2024-03-10",
    jurisdiction: "Deutschland",
    legalArea: "Kartellrecht",
    riskLevel: "medium",
    documents: 38,
  },
]

export function CaseList() {
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
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

  const getStatusBadge = (status: string, riskLevel: string) => {
    if (status === "Kritisch") {
      return <Badge variant="destructive">{status}</Badge>
    } else if (status === "Abgeschlossen") {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
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
                Fall-ID
                {sortField === "id" && <ArrowUpDown className="h-3 w-3" />}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("name")}
                className="flex items-center gap-1 p-0 h-auto font-medium text-left"
              >
                Bezeichnung
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
                Datum
                {sortField === "date" && <ArrowUpDown className="h-3 w-3" />}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("jurisdiction")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Jurisdiktion
                {sortField === "jurisdiction" && <ArrowUpDown className="h-3 w-3" />}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("legalArea")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Rechtsgebiet
                {sortField === "legalArea" && <ArrowUpDown className="h-3 w-3" />}
              </Button>
            </TableHead>
            <TableHead className="text-right">Dokumente</TableHead>
            <TableHead className="w-[100px]">Aktionen</TableHead>
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
              <TableCell>{new Date(caseItem.date).toLocaleDateString("de-DE")}</TableCell>
              <TableCell>{caseItem.jurisdiction}</TableCell>
              <TableCell>{caseItem.legalArea}</TableCell>
              <TableCell className="text-right">{caseItem.documents}</TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/cases/${caseItem.id}`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Details anzeigen</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/cases/${caseItem.id}?tab=documents`}>
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Dokumente</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/cases/${caseItem.id}?tab=analysis`}>
                      <BarChart className="h-4 w-4" />
                      <span className="sr-only">Analyse</span>
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
