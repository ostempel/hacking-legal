"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

type SortField = "id" | "name" | "status" | "date" | "jurisdiction"
type SortDirection = "asc" | "desc"

const cases = [
  {
    id: "C-2023-001",
    name: "Produkthaftung XYZ GmbH",
    status: "In Bearbeitung",
    date: "2023-12-15",
    jurisdiction: "Deutschland",
    riskLevel: "medium",
  },
  {
    id: "C-2023-002",
    name: "Patentstreit TechCorp",
    status: "Kritisch",
    date: "2023-11-28",
    jurisdiction: "EU",
    riskLevel: "high",
  },
  {
    id: "C-2023-003",
    name: "Arbeitsrecht Compliance",
    status: "Abgeschlossen",
    date: "2023-10-05",
    jurisdiction: "Deutschland",
    riskLevel: "low",
  },
  {
    id: "C-2024-001",
    name: "Datenschutzprüfung",
    status: "In Bearbeitung",
    date: "2024-01-10",
    jurisdiction: "Deutschland",
    riskLevel: "medium",
  },
  {
    id: "C-2024-002",
    name: "Vertragsanalyse Lieferanten",
    status: "In Bearbeitung",
    date: "2024-02-01",
    jurisdiction: "International",
    riskLevel: "medium",
  },
]

export function CaseOverview() {
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
      <CardHeader>
        <CardTitle>Aktuelle Fälle</CardTitle>
      </CardHeader>
      <CardContent>
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
              <TableHead className="w-[50px]"></TableHead>
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
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Menü öffnen</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Details anzeigen</DropdownMenuItem>
                      <DropdownMenuItem>Dokumente</DropdownMenuItem>
                      <DropdownMenuItem>Analyse</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
