"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Upload,
  FileText,
  FileIcon as FilePdf,
  FileImage,
  Mail,
  MoreVertical,
  Download,
  Eye,
  Trash2,
} from "lucide-react"

interface CaseDocumentsProps {
  id: string
}

const documents = [
  {
    id: "doc-001",
    name: "Patent_Application_TechCorp.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadedBy: "Dr. Schmidt",
    uploadedAt: "2023-11-28",
    category: "Patent Documents",
    analyzed: true,
  },
  {
    id: "doc-002",
    name: "Technical_Specification.docx",
    type: "docx",
    size: "1.8 MB",
    uploadedBy: "Anna Miller",
    uploadedAt: "2023-11-29",
    category: "Technical Documents",
    analyzed: true,
  },
  {
    id: "doc-003",
    name: "Attorney_Correspondence.eml",
    type: "email",
    size: "156 KB",
    uploadedBy: "System",
    uploadedAt: "2023-12-01",
    category: "Correspondence",
    analyzed: true,
  },
  {
    id: "doc-004",
    name: "Product_Photos.zip",
    type: "image",
    size: "8.2 MB",
    uploadedBy: "Thomas Weber",
    uploadedAt: "2023-12-03",
    category: "Evidence",
    analyzed: true,
  },
  {
    id: "doc-005",
    name: "Market_Analysis_2023.xlsx",
    type: "xlsx",
    size: "3.1 MB",
    uploadedBy: "Anna Miller",
    uploadedAt: "2023-12-05",
    category: "Market Data",
    analyzed: false,
  },
  {
    id: "doc-006",
    name: "Competitor_Patents.pdf",
    type: "pdf",
    size: "4.7 MB",
    uploadedBy: "Dr. Schmidt",
    uploadedAt: "2023-12-10",
    category: "Patent Documents",
    analyzed: false,
  },
]

export function CaseDocuments({ id }: CaseDocumentsProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FilePdf className="h-5 w-5 text-red-500" />
      case "docx":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "email":
        return <Mail className="h-5 w-5 text-purple-500" />
      case "image":
        return <FileImage className="h-5 w-5 text-green-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Documents</CardTitle>
            <CardDescription>All documents and evidence for case {id}</CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documents..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button>
              <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Uploaded by</TableHead>
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
                    <span>{doc.name}</span>
                  </div>
                </TableCell>
                <TableCell>{doc.category}</TableCell>
                <TableCell>{doc.uploadedBy}</TableCell>
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
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" /> Download
                      </DropdownMenuItem>
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
      </CardContent>
    </Card>
  )
}
