"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const jurisdictions = [
  { label: "Germany", value: "de" },
  { label: "EU", value: "eu" },
  { label: "USA", value: "us" },
  { label: "International", value: "int" },
]

const legalAreas = [
  { label: "Product and litigation", value: "product-litigation" },
  { label: "Corporate financing, financial services, and M&A", value: "corporate-finance" },
  { label: "Intellectual property law", value: "ip-law" },
  { label: "Data and digital law, legal operations, coordination of antitrust law", value: "data-digital" },
  { label: "BMW Group compliance", value: "compliance" },
  { label: "Labor and social law", value: "labor-social" },
  { label: "Tax law", value: "tax" },
]

export function CaseFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [status, setStatus] = useState("")
  const [jurisdictionOpen, setJurisdictionOpen] = useState(false)
  const [selectedJurisdiction, setSelectedJurisdiction] = useState("")
  const [legalAreaOpen, setLegalAreaOpen] = useState(false)
  const [selectedLegalArea, setSelectedLegalArea] = useState("")

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Input
        placeholder="Search by case ID or name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="md:w-1/3"
      />
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="md:w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="not-started">Not Started Yet</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="critical">Critical</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
      <Popover open={jurisdictionOpen} onOpenChange={setJurisdictionOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={jurisdictionOpen}
            className="md:w-[200px] justify-between"
          >
            {selectedJurisdiction ? jurisdictions.find((j) => j.value === selectedJurisdiction)?.label : "Jurisdiction"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="md:w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search jurisdiction..." />
            <CommandList>
              <CommandEmpty>No jurisdiction found.</CommandEmpty>
              <CommandGroup>
                {jurisdictions.map((jurisdiction) => (
                  <CommandItem
                    key={jurisdiction.value}
                    value={jurisdiction.value}
                    onSelect={(currentValue) => {
                      setSelectedJurisdiction(currentValue === selectedJurisdiction ? "" : currentValue)
                      setJurisdictionOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedJurisdiction === jurisdiction.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {jurisdiction.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Popover open={legalAreaOpen} onOpenChange={setLegalAreaOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={legalAreaOpen}
            className="md:w-[200px] justify-between"
          >
            {selectedLegalArea ? legalAreas.find((la) => la.value === selectedLegalArea)?.label : "Legal Area"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="md:w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search legal area..." />
            <CommandList>
              <CommandEmpty>No legal area found.</CommandEmpty>
              <CommandGroup>
                {legalAreas.map((legalArea) => (
                  <CommandItem
                    key={legalArea.value}
                    value={legalArea.value}
                    onSelect={(currentValue) => {
                      setSelectedLegalArea(currentValue === selectedLegalArea ? "" : currentValue)
                      setLegalAreaOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedLegalArea === legalArea.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {legalArea.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button variant="secondary" className="md:ml-auto">
        Reset Filters
      </Button>
    </div>
  )
}
