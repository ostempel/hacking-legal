"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentViewer } from "@/components/documents/document-viewer"
import { DocumentAnalysis } from "@/components/documents/document-analysis"
import { DocumentMetadata } from "@/components/documents/document-metadata"
import { ArrowLeft, Download, Share2, FileText, FileIcon as FilePdf, FileImage } from "lucide-react"

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
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    analysis: {
      summary: "This document contains a patent application for a new technology in the field of data processing.",
      keyPoints: [
        "Application date: 15.10.2023",
        "Applicant: TechCorp Inc.",
        "Patent class: G06F 16/00",
        "Inventors: Dr. John Smith, Jane Doe",
      ],
      relevantSections: [
        { title: "Claim 1", content: "A method for data processing, comprising..." },
        { title: "Technical Background", content: "The present invention relates to..." },
      ],
      recommendations: [
        "Use as main evidence for the patent dispute",
        "Add technical experts to evaluate the claims",
        "Compare with existing patents",
      ],
    },
  },
  // More documents would be here...
]

export default function DocumentDetailPage({ params }: { params: { id: string } }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Find the document by ID
  const document = mockDocuments.find((doc) => doc.id === params.id)

  if (!document) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">Document not found</h1>
        <p className="text-muted-foreground">The requested document does not exist.</p>
        <Button asChild className="mt-4">
          <Link href="/documents">Back to document list</Link>
        </Button>
      </div>
    )
  }

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FilePdf className="h-6 w-6 text-red-500" />
      case "docx":
      case "txt":
        return <FileText className="h-6 w-6 text-blue-500" />
      case "jpg":
      case "jpeg":
      case "png":
        return <FileImage className="h-6 w-6 text-green-500" />
      default:
        return <FileText className="h-6 w-6 text-gray-500" />
    }
  }

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false)
    }, 3000)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/documents">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            {getDocumentIcon(document.type)}
            <div>
              <h1 className="text-2xl font-bold">{document.name}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{document.size}</span>
                <span>•</span>
                <span>Uploaded on {new Date(document.uploadedAt).toLocaleDateString("en-US")}</span>
                <span>•</span>
                <span>By {document.uploadedBy}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          {!document.analyzed && (
            <Button onClick={handleAnalyze} disabled={isAnalyzing}>
              {isAnalyzing ? "Analyzing..." : "Analyze"}
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {document.caseId ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Case:</span>
            <Badge variant="outline">
              <Link href={`/cases/${document.caseId}`} className="hover:underline">
                {document.caseName}
              </Link>
            </Badge>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Case:</span>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              Unassigned
            </Badge>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Status:</span>
          {document.analyzed ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Analyzed
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              Analysis pending
            </Badge>
          )}
        </div>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="analysis" disabled={!document.analyzed && !isAnalyzing}>
            AI Analysis
          </TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-6">
          <DocumentViewer document={document} />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {isAnalyzing ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                <h3 className="text-lg font-medium">Analyzing document</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  The AI is analyzing the document. This may take a moment...
                </p>
              </CardContent>
            </Card>
          ) : (
            <DocumentAnalysis document={document} />
          )}
        </TabsContent>

        <TabsContent value="metadata" className="space-y-6">
          <DocumentMetadata document={document} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
