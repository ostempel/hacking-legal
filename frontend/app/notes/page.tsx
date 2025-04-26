import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NotesPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add Notes</h1>
        <p className="text-muted-foreground">Add notes or comments to existing cases</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Case Notes</CardTitle>
          <CardDescription>Add additional information, observations, or comments to an existing case</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="case-id">Select Case</Label>
            <Select>
              <SelectTrigger id="case-id">
                <SelectValue placeholder="Select a case" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="C-2023-001">C-2023-001: Produkthaftung XYZ GmbH</SelectItem>
                <SelectItem value="C-2023-002">C-2023-002: Patentstreit TechCorp</SelectItem>
                <SelectItem value="C-2024-001">C-2024-001: Datenschutzprüfung</SelectItem>
                <SelectItem value="C-2024-002">C-2024-002: Vertragsanalyse Lieferanten</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note-title">Note Title</Label>
            <Input id="note-title" placeholder="Brief title for your note" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note-content">Note Content</Label>
            <Textarea
              id="note-content"
              placeholder="Enter your notes, observations, or comments here"
              className="min-h-[200px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note-type">Note Type</Label>
            <Select>
              <SelectTrigger id="note-type">
                <SelectValue placeholder="Select note type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Comment</SelectItem>
                <SelectItem value="observation">Observation</SelectItem>
                <SelectItem value="question">Question</SelectItem>
                <SelectItem value="concern">Concern</SelectItem>
                <SelectItem value="update">Status Update</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="visibility">Visibility</Label>
            <Select defaultValue="team">
              <SelectTrigger id="visibility">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private (Only Me)</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="all">All Users</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save Note</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
