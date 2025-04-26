import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Cog, Lightbulb } from "lucide-react"

export function UploadOptions() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="case-id">Case ID</Label>
            <Select defaultValue="new">
              <SelectTrigger id="case-id">
                <SelectValue placeholder="Select case" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Create new case</SelectItem>
                <SelectItem value="C-2023-001">C-2023-001</SelectItem>
                <SelectItem value="C-2023-002">C-2023-002</SelectItem>
                <SelectItem value="C-2024-001">C-2024-001</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="document-type">Document Type</Label>
            <Select defaultValue="auto">
              <SelectTrigger id="document-type">
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto-detect</SelectItem>
                <SelectItem value="patent">Patent Documents</SelectItem>
                <SelectItem value="technical">Technical Documents</SelectItem>
                <SelectItem value="correspondence">Correspondence</SelectItem>
                <SelectItem value="evidence">Evidence</SelectItem>
                <SelectItem value="market">Market Data</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jurisdiction">Jurisdiction</Label>
            <Select defaultValue="auto">
              <SelectTrigger id="jurisdiction">
                <SelectValue placeholder="Select jurisdiction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto-detect</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="eu">EU</SelectItem>
                <SelectItem value="us">USA</SelectItem>
                <SelectItem value="int">International</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="legal-area">Legal Area</Label>
            <Select defaultValue="auto">
              <SelectTrigger id="legal-area">
                <SelectValue placeholder="Select legal area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto-detect</SelectItem>
                <SelectItem value="product">Product Liability</SelectItem>
                <SelectItem value="patent">Patent Law</SelectItem>
                <SelectItem value="labor">Labor Law</SelectItem>
                <SelectItem value="privacy">Data Protection</SelectItem>
                <SelectItem value="contract">Contract Law</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input id="tags" placeholder="e.g. important, urgent, confidential" />
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="analyze" defaultChecked />
              <Label htmlFor="analyze">Automatically analyze</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="ocr" defaultChecked />
              <Label htmlFor="ocr">OCR for images and PDFs</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="translate" />
              <Label htmlFor="translate">Automatically translate</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="confidential" />
              <Label htmlFor="confidential">Mark as confidential</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>
            <strong>Batch Upload:</strong> For multiple documents, you can upload a ZIP file.
          </p>
          <p>
            <strong>Email Integration:</strong> Connect your email account to import documents directly.
          </p>
          <p>
            <strong>Automatic Analysis:</strong> The AI analysis detects jurisdiction, legal area, and inconsistencies.
          </p>
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full">
        <Cog className="mr-2 h-4 w-4" />
        Advanced Settings
      </Button>
    </div>
  )
}
