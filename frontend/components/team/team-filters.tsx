"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export function TeamFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [department, setDepartment] = useState("")
  const [role, setRole] = useState("")

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="relative w-full md:w-1/3">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Nach Namen oder Expertise suchen..."
          className="w-full pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Select value={department} onValueChange={setDepartment}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Abteilung" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alle Abteilungen</SelectItem>
          <SelectItem value="legal">Rechtsabteilung</SelectItem>
          <SelectItem value="compliance">Compliance</SelectItem>
          <SelectItem value="patent">Patentrecht</SelectItem>
          <SelectItem value="analysis">Analyse</SelectItem>
        </SelectContent>
      </Select>
      <Select value={role} onValueChange={setRole}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Position" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alle Positionen</SelectItem>
          <SelectItem value="partner">Partner</SelectItem>
          <SelectItem value="senior">Senior Anwalt</SelectItem>
          <SelectItem value="associate">Associate</SelectItem>
          <SelectItem value="analyst">Analyst</SelectItem>
          <SelectItem value="specialist">Spezialist</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="secondary" className="md:ml-auto">
        Filter zurücksetzen
      </Button>
    </div>
  )
}
