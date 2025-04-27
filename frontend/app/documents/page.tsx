"use client";

import type React from "react";

import { useState, useRef } from "react";
import { DocumentUploader } from "@/components/documents/document-uploader";
import { DocumentList } from "@/components/documents/document-list";
import { DocumentFilters } from "@/components/documents/document-filters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";

export default function DocumentsPage() {
  const [sortField, setSortField] = useState<"name" | "case" | "date">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSort = (field: "name" | "case" | "date") => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleCaseFilter = (caseId: string | null) => {
    setSelectedCase(caseId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Here you would typically handle the file upload
      // For now, just log the file name
      console.log(`Selected file: ${files[0].name}`);

      // Reset the input so the same file can be selected again
      e.target.value = "";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-muted-foreground">
            Manage and analyze all documents
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button onClick={() => fileInputRef.current?.click()}>
            <Plus className="mr-2 h-4 w-4" />
            New Document
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
          <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
          <TabsTrigger value="analyzed">Analyzed</TabsTrigger>
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

          <div className="lg:col-span-2">
            <DocumentList
              sortField={sortField}
              sortDirection={sortDirection}
              selectedCase={selectedCase}
              searchQuery={searchQuery}
            />
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

          <div className="lg:col-span-2">
            <DocumentList
              sortField={sortField}
              sortDirection={sortDirection}
              selectedCase={selectedCase}
              searchQuery={searchQuery}
              filter="recent"
            />
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

          <div className="lg:col-span-2">
            <DocumentList
              sortField={sortField}
              sortDirection={sortDirection}
              searchQuery={searchQuery}
              filter="unassigned"
            />
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

          <div className="lg:col-span-2">
            <DocumentList
              sortField={sortField}
              sortDirection={sortDirection}
              selectedCase={selectedCase}
              searchQuery={searchQuery}
              filter="analyzed"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
