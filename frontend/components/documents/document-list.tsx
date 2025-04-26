"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, Download, MoreHorizontal, FileText, FileIcon as FilePdf, FileImage, Trash2, LinkIcon } from "lucide-react"
import Link from "next/link"

// Mock document data
const mockDocuments = [
  {
    id: "doc-001",
    name: "Patent_Application_TechCorp.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadedBy: "Dr. Schmidt",
    uploadedAt: "2023-11-28",
    caseId: "C-2023-002",
    caseName: "Patent Dispute TechCorp",
    analyzed: true,
  },
  {
    id: "doc-002",
    name: "Technical_Specification.docx",
    type: "docx",
    size: "1.8 MB",
    uploadedBy: "Anna Miller",
    uploadedAt: "2023-11-29",
    caseId: "C-2023-002",
    caseName: "Patent Dispute TechCorp",
    analyzed: true,
  },
  {
    id: "doc-003",
    name: "Attorney_Correspondence.txt",
    type: "txt",
    size: "156 KB",
    uploadedBy: "System",
    uploadedAt: "2023-12-01",
    caseId: "C-2023-002",
    caseName: "Patent Dispute TechCorp",
    analyzed: true,
  },
  {
    id: "doc-004",
    name: "Product_Photos.jpg",
    type: "jpg",
    size: "8.2 MB",
    uploadedBy: "Thomas Weber",
    uploadedAt: "2023-12-03",
    caseId: "C-2023-001",
    caseName: "Product Liability XYZ Corp",
    analyzed: true,
  },
  {
    id: "doc-005",
    name: "Market_Analysis_2023.docx",
    type: "docx",
    size: "3.1 MB",
    uploadedBy: "Anna Miller",
    uploadedAt: "2023-12-05",
    caseId: "C-2023-001",
    caseName: "Product Liability XYZ Corp",
    analyzed: false,
  },
  {
    id: "doc-006",
    name: "Competitor_Patents.pdf",
    type: "pdf",
    size: "4.7 MB",
    uploadedBy: "Dr. Schmidt",
    uploadedAt: "2023-12-10",
    caseId: "C-2023-002",
    caseName: "Patent Dispute TechCorp",
    analyzed: false,
  },
  {
    id: "doc-007",
    name: "Employee_Survey.docx",
    type: "docx",
    size: "1.2 MB",
    uploadedBy: "Julia Baker",
    uploadedAt: "2024-01-15",
    caseId: "C-2023-003",
    caseName: "Labor Law Compliance",
    analyzed: true,
  },
  {
    id: "doc-008",
    name: "Data_Protection_Guidelines.pdf",
    type: "pdf",
    size: "3.5 MB",
    uploadedBy: "Anna Miller",
    uploadedAt: "2024-01-20",
    caseId: "C-2024-001",
    caseName: "Data Protection Audit",
    analyzed: true,
  },
  {
    id: "doc-009",
    name: "Supplier_Contract.pdf",
    type: "pdf",
    size: "2.8 MB",
    uploadedBy: "Thomas Weber",
    uploadedAt: "2024-02-05",
    caseId: "C-2024-002",
    caseName: "Supplier Contract Analysis",
    analyzed: false,
  },
  {
    id: "doc-010",
    name: "Unassigned_Document.pdf",
    type: "pdf",
    size: "1.5 MB",
    uploadedBy: "System",
    uploadedAt: "2024-03-01",
    caseId: null,
    caseName: null,
    analyzed: false,
  },
]

interface DocumentListProps {
  sortField: "name" | "case" | "date"
  sortDirection: "asc" | "desc"
  selectedCase?: string | null
  searchQuery?: string
  filter?: "recent" | "unassigned" | "analyzed"
}

export function DocumentList({ sortField, sortDirection, selectedCase, searchQuery = "", filter }: DocumentListProps) {
  const [documents, setDocuments] = useState(mockDocuments)

  // Filter documents based on props
  let filteredDocuments = [...documents]

  // Apply case filter
  if (selectedCase) {
    filteredDocuments = filteredDocuments.filter((doc) => doc.caseId === selectedCase)
  }

  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filteredDocuments = filteredDocuments.filter(
      (doc) =>
        doc.name.toLowerCase().includes(query) ||
        (doc.caseName && doc.caseName.toLowerCase().includes(query)) ||
        (doc.uploadedBy && doc.uploadedBy.toLowerCase().includes(query)),
    )
  }

  // Apply tab filters
  if (filter === "recent") {
    // Sort by date and take the 5 most recent
    filteredDocuments = [...filteredDocuments]
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
      .slice(0, 5)
  } else if (filter === "unassigned") {
    filteredDocuments = filteredDocuments.filter((doc) => !doc.caseId)
  } else if (filter === "analyzed") {
    filteredDocuments = filteredDocuments.filter((doc) => doc.analyzed)
  }

  // Sort documents
  filteredDocuments.sort((a, b) => {
    const direction = sortDirection === "asc" ? 1 : -1

    if (sortField === "name") {
      return direction * a.name.localeCompare(b.name)
    } else if (sortField === "case") {
      const caseNameA = a.caseName || ""
      const caseNameB = b.caseName || ""
      return direction * caseNameA.localeCompare(caseNameB)
    } else if (sortField === "date") {
      return direction * (new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime())
    }

    return 0
  })

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FilePdf className="h-5 w-5 text-red-500" />
      case "docx":
      case "txt":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "jpg":
      case "jpeg":
      case "png":
        return <FileImage className="h-5 w-5 text-green-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents ({filteredDocuments.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No documents found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Case</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getDocumentIcon(doc.type)}
                      <Link href={`/documents/${doc.id}`} className="hover:underline">
                        {doc.name}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>
                    {doc.caseId ? (
                      <Link href={`/cases/${doc.caseId}`} className="hover:underline">
                        {doc.caseName}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell>{new Date(doc.uploadedAt).toLocaleDateString("en-US")}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>
                    {doc.analyzed ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Analyzed
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/documents/${doc.id}`}>
                            <Eye className="mr-2 h-4 w-4" /> View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" /> Download
                        </DropdownMenuItem>
                        {!doc.caseId && (
                          <DropdownMenuItem>
                            <LinkIcon className="mr-2 h-4 w-4" /> Assign to Case
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
