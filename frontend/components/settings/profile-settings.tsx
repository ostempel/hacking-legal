"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Persönliche Informationen</CardTitle>
              <CardDescription>Verwalten Sie Ihre persönlichen Informationen und Einstellungen</CardDescription>
            </div>
            <Button variant={isEditing ? "default" : "outline"} onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Speichern" : "Bearbeiten"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button variant="outline" size="sm">
                  Bild ändern
                </Button>
              )}
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">Vorname</Label>
                  <Input id="first-name" defaultValue="Julia" disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Nachname</Label>
                  <Input id="last-name" defaultValue="Schmidt" disabled={!isEditing} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input id="email" type="email" defaultValue="j.schmidt@example.com" disabled={!isEditing} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Position</Label>
                <Input id="role" defaultValue="Rechtsanwältin" disabled={!isEditing} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Abteilung</Label>
                <Select defaultValue="legal" disabled={!isEditing}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Abteilung auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="legal">Rechtsabteilung</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="management">Management</SelectItem>
                    <SelectItem value="rd">Forschung & Entwicklung</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Benachrichtigungen</CardTitle>
          <CardDescription>Konfigurieren Sie, wie und wann Sie benachrichtigt werden möchten</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">E-Mail-Benachrichtigungen</Label>
                <p className="text-sm text-muted-foreground">Erhalten Sie Benachrichtigungen per E-Mail</p>
              </div>
              <Switch id="email-notifications" defaultChecked disabled={!isEditing} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="browser-notifications">Browser-Benachrichtigungen</Label>
                <p className="text-sm text-muted-foreground">Erhalten Sie Benachrichtigungen im Browser</p>
              </div>
              <Switch id="browser-notifications" defaultChecked disabled={!isEditing} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="daily-digest">Tägliche Zusammenfassung</Label>
                <p className="text-sm text-muted-foreground">
                  Erhalten Sie eine tägliche Zusammenfassung aller Aktivitäten
                </p>
              </div>
              <Switch id="daily-digest" disabled={!isEditing} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="critical-alerts">Kritische Warnungen</Label>
                <p className="text-sm text-muted-foreground">
                  Erhalten Sie sofortige Benachrichtigungen bei kritischen Ereignissen
                </p>
              </div>
              <Switch id="critical-alerts" defaultChecked disabled={!isEditing} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Standardeinstellungen</CardTitle>
          <CardDescription>Konfigurieren Sie Ihre bevorzugten Standardeinstellungen</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select defaultValue="light" disabled={!isEditing}>
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="default-language">Standardsprache</Label>
              <Select defaultValue="de" disabled={!isEditing}>
                <SelectTrigger id="default-language">
                  <SelectValue placeholder="Standardsprache auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="en">Englisch</SelectItem>
                  <SelectItem value="fr">Französisch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="default-jurisdiction">Standard-Jurisdiktion</Label>
              <Select defaultValue="de" disabled={!isEditing}>
                <SelectTrigger id="default-jurisdiction">
                  <SelectValue placeholder="Standard-Jurisdiktion auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="de">Deutschland</SelectItem>
                  <SelectItem value="eu">EU</SelectItem>
                  <SelectItem value="us">USA</SelectItem>
                  <SelectItem value="int">International</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
