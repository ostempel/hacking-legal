import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scale, Upload, FileText, AlertTriangle, CheckCircle, FileUp } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EvidencePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Evidence Analysis</h1>
        <p className="text-muted-foreground">Upload and analyze evidence for your legal cases.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload Evidence</CardTitle>
            <CardDescription>Upload documents, images, or audio files for analysis.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
              <FileUp className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="mb-2 text-sm font-semibold">Drag and drop files here</p>
              <p className="text-xs text-muted-foreground mb-4">
                Supports PDF, DOCX, JPG, PNG, and MP3 files up to 50MB
              </p>
              <Button size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Browse Files
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Case Selection</CardTitle>
            <CardDescription>Select the case to associate with this evidence.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a case" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="case1">Smith v. Johnson (2023)</SelectItem>
                <SelectItem value="case2">Estate of Williams (2023)</SelectItem>
                <SelectItem value="case3">Doe v. City of Springfield (2022)</SelectItem>
              </SelectContent>
            </Select>

            <div>
              <p className="text-sm font-medium mb-2">Evidence Type</p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Document
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Testimony
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Exhibit
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Other
                </Button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Analysis Priority</p>
              <Select defaultValue="normal">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evidence Analysis Results</CardTitle>
          <CardDescription>AI-powered analysis of your uploaded evidence.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-6 text-center">
            <Scale className="mx-auto h-12 w-12 opacity-20" />
            <p className="mt-2 text-muted-foreground">Upload evidence to see analysis results.</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Evidence</TabsTrigger>
          <TabsTrigger value="key">Key Evidence</TabsTrigger>
          <TabsTrigger value="inconsistencies">Inconsistencies</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Evidence Repository</CardTitle>
              <CardDescription>All evidence associated with your cases.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="mx-auto h-12 w-12 opacity-20" />
                <p className="mt-2">No evidence files uploaded yet.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="key">
          <Card>
            <CardHeader>
              <CardTitle>Key Evidence</CardTitle>
              <CardDescription>Evidence identified as particularly important to your case.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="mx-auto h-12 w-12 opacity-20" />
                <p className="mt-2">No key evidence identified yet.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inconsistencies">
          <Card>
            <CardHeader>
              <CardTitle>Inconsistencies</CardTitle>
              <CardDescription>Potential contradictions or inconsistencies in evidence.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <AlertTriangle className="mx-auto h-12 w-12 opacity-20" />
                <p className="mt-2">No inconsistencies detected yet.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
