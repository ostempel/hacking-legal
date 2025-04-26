"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ArrowUpDown } from "lucide-react"

// Mock cases data
const cases = [
  { id: "C-2023-001", name: "Product Liability XYZ Corp" },
  { id: "C-2023-002", name: "Patent Dispute TechCorp" },
  { id: "C-2023-003", name: "Labor Law Compliance" },
  { id: "C-2024-001", name: "Data Protection Audit" },
  { id: "C-2024-002", name: "Supplier Contract Analysis" },
]

interface DocumentFiltersProps {
  onSort: (field: "name" | "case" | "date") => void
  sortField: "name" | "case" | "date"
  sortDirection: "asc" | "desc"
  onCaseFilter?: (caseId: string | null) => void
  selectedCase?: string | null
  onSearch?: (query: string) => void
  disableCaseFilter?: boolean
}

export function DocumentFilters({
  onSort,
  sortField,
  sortDirection,
  onCaseFilter,
  selectedCase,
  onSearch,
  disableCaseFilter = false,
}: DocumentFiltersProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value)
    }
  }

  const handleCaseChange = (value: string) => {
    if (onCaseFilter) {
      onCaseFilter(value === "" ? null : value)
    }
  }

  const getSortIcon = (field: "name" | "case" | "date") => {
    if (sortField === field) {
      return (
        <ArrowUpDown
          className={`h-4 w-4 transition-transform ${sortDirection === "asc" ? "rotate-0" : "rotate-180"}`}
        />
      )
    }
    return <ArrowUpDown className="h-4 w-4 opacity-50" />
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="relative w-full md:w-1/3">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search documents..." className="w-full pl-8" onChange={handleSearchChange} />
      </div>

      {!disableCaseFilter && (
        <Select value={selectedCase || ""} onValueChange={handleCaseChange}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select case" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cases</SelectItem>
            {cases.map((caseItem) => (
              <SelectItem key={caseItem.id} value={caseItem.id}>
                {caseItem.id}: {caseItem.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onSort("name")} className="flex items-center gap-1">
          Name {getSortIcon("name")}
        </Button>
        <Button variant="outline" size="sm" onClick={() => onSort("date")} className="flex items-center gap-1">
          Date {getSortIcon("date")}
        </Button>
      </div>

      <Button variant="secondary" size="sm" className="md:ml-auto">
        Reset Filters
      </Button>
    </div>
  )
}
