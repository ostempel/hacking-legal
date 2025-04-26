"use client"

import { Card, CardContent } from "@/components/ui/card"

interface Document {
  id: string
  name: string
  type: string
  content: string
  // Other properties...
  [key: string]: any
}

interface DocumentViewerProps {
  document: Document
}

export function DocumentViewer({ document }: DocumentViewerProps) {
  // In a real application, this would render a PDF viewer, docx viewer, etc.
  // For this example, we'll just show a placeholder

  return (
    <Card>
      <CardContent className="p-6">
        {document.type === "pdf" && (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <div className="text-red-500 text-6xl mb-4">PDF</div>
            <h3 className="text-lg font-medium mb-2">{document.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              PDF-Vorschau würde hier angezeigt werden. In einer vollständigen Implementierung würde hier ein PDF-Viewer
              integriert sein.
            </p>
            <div className="border p-4 rounded-md text-left bg-white">
              <p className="font-mono text-sm">{document.content}</p>
            </div>
          </div>
        )}

        {document.type === "docx" && (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <div className="text-blue-500 text-6xl mb-4">DOCX</div>
            <h3 className="text-lg font-medium mb-2">{document.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              DOCX-Vorschau würde hier angezeigt werden. In einer vollständigen Implementierung würde hier ein
              DOCX-Viewer integriert sein.
            </p>
            <div className="border p-4 rounded-md text-left bg-white">
              <p className="font-mono text-sm">{document.content}</p>
            </div>
          </div>
        )}

        {(document.type === "jpg" || document.type === "jpeg" || document.type === "png") && (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <div className="text-green-500 text-6xl mb-4">IMAGE</div>
            <h3 className="text-lg font-medium mb-2">{document.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Bildvorschau würde hier angezeigt werden. In einer vollständigen Implementierung würde hier das Bild
              angezeigt werden.
            </p>
            <div className="border p-4 rounded-md text-left bg-white">
              <p className="font-mono text-sm">Bilddaten...</p>
            </div>
          </div>
        )}

        {document.type === "txt" && (
          <div className="bg-gray-100 rounded-lg p-8">
            <h3 className="text-lg font-medium mb-4">{document.name}</h3>
            <div className="border p-4 rounded-md text-left bg-white">
              <p className="font-mono text-sm whitespace-pre-wrap">{document.content}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
