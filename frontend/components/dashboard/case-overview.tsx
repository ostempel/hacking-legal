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
    id: "C-2024-006",
    name: "Copyright Review",
    status: "Not Started Yet",
    date: "2024-03-15",
    jurisdiction: "Germany",
    riskLevel: "low",
  },
  {
    id: "C-2023-001",
    name: "Product Liability XYZ Corp",
    status: "In Progress",
    date: "2023-12-15",
    jurisdiction: "Germany",
    riskLevel: "medium",
  },
  {
    id: "C-2023-002",
    name: "Patent Dispute TechCorp",
    status: "Critical",
    date: "2023-11-28",
    jurisdiction: "EU",
    riskLevel: "high",
  },
  {
    id: "C-2023-003",
    name: "Labor Law Compliance",
    status: "Completed",
    date: "2023-10-05",
    jurisdiction: "Germany",
    riskLevel: "low",
  },
  {
    id: "C-2024-001",
    name: "Data Protection Audit",
    status: "In Progress",
    date: "2024-01-10",
    jurisdiction: "Germany",
    riskLevel: "medium",
  },
  {
    id: "C-2024-002",
    name: "Supplier Contract Analysis",
    status: "In Progress",
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Cases</CardTitle>
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
                <TableCell>{new Date(caseItem.date).toLocaleDateString("en-US")}</TableCell>
                <TableCell>{caseItem.jurisdiction}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Documents</DropdownMenuItem>
                      <DropdownMenuItem>Analysis</DropdownMenuItem>
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
