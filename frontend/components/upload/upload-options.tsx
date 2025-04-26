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
          <CardTitle>Upload-Optionen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="case-id">Fall-ID</Label>
            <Select defaultValue="new">
              <SelectTrigger id="case-id">
                <SelectValue placeholder="Fall auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Neuer Fall erstellen</SelectItem>
                <SelectItem value="C-2023-001">C-2023-001</SelectItem>
                <SelectItem value="C-2023-002">C-2023-002</SelectItem>
                <SelectItem value="C-2024-001">C-2024-001</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="document-type">Dokumenttyp</Label>
            <Select defaultValue="auto">
              <SelectTrigger id="document-type">
                <SelectValue placeholder="Dokumenttyp auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Automatisch erkennen</SelectItem>
                <SelectItem value="patent">Patentdokumente</SelectItem>
                <SelectItem value="technical">Technische Dokumente</SelectItem>
                <SelectItem value="correspondence">Korrespondenz</SelectItem>
                <SelectItem value="evidence">Beweismaterial</SelectItem>
                <SelectItem value="market">Marktdaten</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jurisdiction">Jurisdiktion</Label>
            <Select defaultValue="auto">
              <SelectTrigger id="jurisdiction">
                <SelectValue placeholder="Jurisdiktion auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Automatisch erkennen</SelectItem>
                <SelectItem value="de">Deutschland</SelectItem>
                <SelectItem value="eu">EU</SelectItem>
                <SelectItem value="us">USA</SelectItem>
                <SelectItem value="int">International</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="legal-area">Rechtsgebiet</Label>
            <Select defaultValue="auto">
              <SelectTrigger id="legal-area">
                <SelectValue placeholder="Rechtsgebiet auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Automatisch erkennen</SelectItem>
                <SelectItem value="product">Produkthaftung</SelectItem>
                <SelectItem value="patent">Patentrecht</SelectItem>
                <SelectItem value="labor">Arbeitsrecht</SelectItem>
                <SelectItem value="privacy">Datenschutz</SelectItem>
                <SelectItem value="contract">Vertragsrecht</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (durch Komma getrennt)</Label>
            <Input id="tags" placeholder="z.B. wichtig, dringend, vertraulich" />
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="analyze" defaultChecked />
              <Label htmlFor="analyze">Automatisch analysieren</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="ocr" defaultChecked />
              <Label htmlFor="ocr">OCR für Bilddateien und PDFs</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="translate" />
              <Label htmlFor="translate">Automatisch übersetzen</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="confidential" />
              <Label htmlFor="confidential">Als vertraulich markieren</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            Tipps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>
            <strong>Batch-Upload:</strong> Für mehrere Dokumente können Sie eine ZIP-Datei hochladen.
          </p>
          <p>
            <strong>E-Mail-Integration:</strong> Verbinden Sie Ihr E-Mail-Konto, um Dokumente direkt zu importieren.
          </p>
          <p>
            <strong>Automatische Analyse:</strong> Die KI-Analyse erkennt Jurisdiktion, Rechtsgebiet und Inkonsistenzen.
          </p>
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full">
        <Cog className="mr-2 h-4 w-4" />
        Erweiterte Einstellungen
      </Button>
    </div>
  )
}
