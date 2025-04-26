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
  { label: "Deutschland", value: "de" },
  { label: "EU", value: "eu" },
  { label: "USA", value: "us" },
  { label: "International", value: "int" },
]

const legalAreas = [
  { label: "Produkthaftung", value: "product" },
  { label: "Patentrecht", value: "patent" },
  { label: "Arbeitsrecht", value: "labor" },
  { label: "Datenschutz", value: "privacy" },
  { label: "Vertragsrecht", value: "contract" },
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
        placeholder="Suche nach Fall-ID oder Bezeichnung..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="md:w-1/3"
      />
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="md:w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alle Status</SelectItem>
          <SelectItem value="in-progress">In Bearbeitung</SelectItem>
          <SelectItem value="critical">Kritisch</SelectItem>
          <SelectItem value="completed">Abgeschlossen</SelectItem>
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
            {selectedJurisdiction ? jurisdictions.find((j) => j.value === selectedJurisdiction)?.label : "Jurisdiktion"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="md:w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Jurisdiktion suchen..." />
            <CommandList>
              <CommandEmpty>Keine Jurisdiktion gefunden.</CommandEmpty>
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
            {selectedLegalArea ? legalAreas.find((la) => la.value === selectedLegalArea)?.label : "Rechtsgebiet"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="md:w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Rechtsgebiet suchen..." />
            <CommandList>
              <CommandEmpty>Kein Rechtsgebiet gefunden.</CommandEmpty>
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
        Filter zurücksetzen
      </Button>
    </div>
  )
}
