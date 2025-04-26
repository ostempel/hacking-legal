"use client"

import { useState } from "react"
import { DocumentUploader } from "@/components/documents/document-uploader"
import { DocumentList } from "@/components/documents/document-list"
import { DocumentFilters } from "@/components/documents/document-filters"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus, Upload } from "lucide-react"

export default function DocumentsPage() {
  const [sortField, setSortField] = useState<"name" | "case" | "date">("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [selectedCase, setSelectedCase] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSort = (field: "name" | "case" | "date") => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleCaseFilter = (caseId: string | null) => {
    setSelectedCase(caseId)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dokumente</h1>
          <p className="text-muted-foreground">Verwalten und analysieren Sie alle Dokumente</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Importieren
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Neues Dokument
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Alle Dokumente</TabsTrigger>
          <TabsTrigger value="recent">Kürzlich hinzugefügt</TabsTrigger>
          <TabsTrigger value="unassigned">Nicht zugeordnet</TabsTrigger>
          <TabsTrigger value="analyzed">Analysiert</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <DocumentFilters
            onSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
            onCaseFilter={handleCaseFilter}
            selectedCase={selectedCase}
            onSearch={handleSearch}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <DocumentUploader />
            </div>
            <div className="lg:col-span-2">
              <DocumentList
                sortField={sortField}
                sortDirection={sortDirection}
                selectedCase={selectedCase}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <DocumentFilters
            onSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
            onCaseFilter={handleCaseFilter}
            selectedCase={selectedCase}
            onSearch={handleSearch}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <DocumentUploader />
            </div>
            <div className="lg:col-span-2">
              <DocumentList
                sortField={sortField}
                sortDirection={sortDirection}
                selectedCase={selectedCase}
                searchQuery={searchQuery}
                filter="recent"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="unassigned" className="space-y-6">
          <DocumentFilters
            onSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
            onSearch={handleSearch}
            disableCaseFilter
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <DocumentUploader />
            </div>
            <div className="lg:col-span-2">
              <DocumentList
                sortField={sortField}
                sortDirection={sortDirection}
                searchQuery={searchQuery}
                filter="unassigned"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analyzed" className="space-y-6">
          <DocumentFilters
            onSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
            onCaseFilter={handleCaseFilter}
            selectedCase={selectedCase}
            onSearch={handleSearch}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <DocumentUploader />
            </div>
            <div className="lg:col-span-2">
              <DocumentList
                sortField={sortField}
                sortDirection={sortDirection}
                selectedCase={selectedCase}
                searchQuery={searchQuery}
                filter="analyzed"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
