"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { LinkIcon } from "lucide-react"

// Mock cases data
const cases = [
  { id: "C-2023-001", name: "Product Liability XYZ Corp" },
  { id: "C-2023-002", name: "Patent Dispute TechCorp" },
  { id: "C-2023-003", name: "Labor Law Compliance" },
  { id: "C-2024-001", name: "Data Protection Audit" },
  { id: "C-2024-002", name: "Supplier Contract Analysis" },
]

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadedBy: string
  uploadedAt: string
  caseId: string | null
  caseName: string | null
  // Other properties...
  [key: string]: any
}

interface DocumentMetadataProps {
  document: Document
}

export function DocumentMetadata({ document }: DocumentMetadataProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Document Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="doc-name">Document Name</Label>
              <Input id="doc-name" value={document.name} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doc-type">File Type</Label>
              <Input id="doc-type" value={document.type.toUpperCase()} readOnly />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="doc-size">File Size</Label>
              <Input id="doc-size" value={document.size} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doc-date">Uploaded On</Label>
              <Input id="doc-date" value={new Date(document.uploadedAt).toLocaleDateString("en-US")} readOnly />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="doc-uploader">Uploaded By</Label>
              <Input id="doc-uploader" value={document.uploadedBy} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doc-id">Document ID</Label>
              <Input id="doc-id" value={document.id} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Case Assignment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="case-select">Assigned Case</Label>
            <Select defaultValue={document.caseId || ""}>
              <SelectTrigger id="case-select">
                <SelectValue placeholder="Select a case" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No case assignment</SelectItem>
                {cases.map((caseItem) => (
                  <SelectItem key={caseItem.id} value={caseItem.id}>
                    {caseItem.id}: {caseItem.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full">
            <LinkIcon className="mr-2 h-4 w-4" />
            Update Case Assignment
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tags and Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="doc-tags">Tags (comma separated)</Label>
            <Input id="doc-tags" placeholder="e.g. important, confidential, patent" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="doc-category">Category</Label>
            <Select>
              <SelectTrigger id="doc-category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="legal">Legal Document</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="evidence">Evidence</SelectItem>
                <SelectItem value="correspondence">Correspondence</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button>Save Tags and Categories</Button>
        </CardContent>
      </Card>
    </div>
  )
}
