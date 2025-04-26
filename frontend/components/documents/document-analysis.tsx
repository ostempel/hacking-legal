"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react"

interface Document {
  id: string
  name: string
  analysis?: {
    summary: string
    keyPoints: string[]
    relevantSections: { title: string; content: string }[]
    recommendations: string[]
  }
  // Other properties...
  [key: string]: any
}

interface DocumentAnalysisProps {
  document: Document
}

export function DocumentAnalysis({ document }: DocumentAnalysisProps) {
  if (!document.analysis) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
          <h3 className="text-lg font-medium">No analysis available</h3>
          <p className="text-sm text-muted-foreground mt-2">
            This document has not been analyzed yet. Start the analysis to get insights.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Summary</CardTitle>
          <CardDescription>Automatically generated summary of the document</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{document.analysis.summary}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="key-points" className="w-full">
        <TabsList>
          <TabsTrigger value="key-points">Key Points</TabsTrigger>
          <TabsTrigger value="relevant-sections">Relevant Sections</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="key-points" className="space-y-4 pt-4">
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                {document.analysis.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relevant-sections" className="space-y-4 pt-4">
          {document.analysis.relevantSections.map((section, index) => (
            <Card key={index}>
              <CardHeader className="py-3">
                <CardTitle className="text-base">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{section.content}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4 pt-4">
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                {document.analysis.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
