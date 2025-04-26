"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { LinkIcon } from "lucide-react"

// Mock cases data
const cases = [
  { id: "C-2023-001", name: "Produkthaftung XYZ GmbH" },
  { id: "C-2023-002", name: "Patentstreit TechCorp" },
  { id: "C-2023-003", name: "Arbeitsrecht Compliance" },
  { id: "C-2024-001", name: "Datenschutzprüfung" },
  { id: "C-2024-002", name: "Vertragsanalyse Lieferanten" },
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
          <CardTitle>Dokumenteninformationen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="doc-name">Dokumentname</Label>
              <Input id="doc-name" value={document.name} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doc-type">Dateityp</Label>
              <Input id="doc-type" value={document.type.toUpperCase()} readOnly />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="doc-size">Dateigröße</Label>
              <Input id="doc-size" value={document.size} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doc-date">Hochgeladen am</Label>
              <Input id="doc-date" value={new Date(document.uploadedAt).toLocaleDateString("de-DE")} readOnly />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="doc-uploader">Hochgeladen von</Label>
              <Input id="doc-uploader" value={document.uploadedBy} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doc-id">Dokument-ID</Label>
              <Input id="doc-id" value={document.id} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fall-Zuordnung</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="case-select">Zugeordneter Fall</Label>
            <Select defaultValue={document.caseId || ""}>
              <SelectTrigger id="case-select">
                <SelectValue placeholder="Fall auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Keinem Fall zuordnen</SelectItem>
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
            Fall-Zuordnung aktualisieren
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tags und Kategorien</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="doc-tags">Tags (durch Komma getrennt)</Label>
            <Input id="doc-tags" placeholder="z.B. wichtig, vertraulich, patent" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="doc-category">Kategorie</Label>
            <Select>
              <SelectTrigger id="doc-category">
                <SelectValue placeholder="Kategorie auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="legal">Rechtsdokument</SelectItem>
                <SelectItem value="contract">Vertrag</SelectItem>
                <SelectItem value="evidence">Beweismaterial</SelectItem>
                <SelectItem value="correspondence">Korrespondenz</SelectItem>
                <SelectItem value="other">Sonstiges</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button>Tags und Kategorien speichern</Button>
        </CardContent>
      </Card>
    </div>
  )
}
