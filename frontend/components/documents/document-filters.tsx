"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ArrowUpDown } from "lucide-react"

// Mock cases data
const cases = [
  { id: "C-2023-001", name: "Produkthaftung XYZ GmbH" },
  { id: "C-2023-002", name: "Patentstreit TechCorp" },
  { id: "C-2023-003", name: "Arbeitsrecht Compliance" },
  { id: "C-2024-001", name: "Datenschutzprüfung" },
  { id: "C-2024-002", name: "Vertragsanalyse Lieferanten" },
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
        <Input
          type="search"
          placeholder="Dokumente durchsuchen..."
          className="w-full pl-8"
          onChange={handleSearchChange}
        />
      </div>

      {!disableCaseFilter && (
        <Select value={selectedCase || ""} onValueChange={handleCaseChange}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Fall auswählen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Fälle</SelectItem>
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
        <Button variant="outline" size="sm" onClick={() => onSort("case")} className="flex items-center gap-1">
          Fall {getSortIcon("case")}
        </Button>
        <Button variant="outline" size="sm" onClick={() => onSort("date")} className="flex items-center gap-1">
          Datum {getSortIcon("date")}
        </Button>
      </div>

      <Button variant="secondary" size="sm" className="md:ml-auto">
        Filter zurücksetzen
      </Button>
    </div>
  )
}
