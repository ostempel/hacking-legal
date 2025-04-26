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
          placeholder="Search by name or expertise..."
          className="w-full pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Select value={department} onValueChange={setDepartment}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          <SelectItem value="legal">Legal Department</SelectItem>
          <SelectItem value="compliance">Compliance</SelectItem>
          <SelectItem value="patent">Patent Law</SelectItem>
          <SelectItem value="analysis">Analysis</SelectItem>
        </SelectContent>
      </Select>
      <Select value={role} onValueChange={setRole}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Position" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Positions</SelectItem>
          <SelectItem value="partner">Partner</SelectItem>
          <SelectItem value="senior">Senior Attorney</SelectItem>
          <SelectItem value="associate">Associate</SelectItem>
          <SelectItem value="analyst">Analyst</SelectItem>
          <SelectItem value="specialist">Specialist</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="secondary" className="md:ml-auto">
        Reset Filters
      </Button>
    </div>
  )
}
