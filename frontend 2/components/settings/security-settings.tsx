"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Shield, Key, Smartphone, AlertTriangle } from "lucide-react"

export function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Passwort ändern</CardTitle>
          <CardDescription>Ändern Sie Ihr Passwort regelmäßig, um die Sicherheit zu erhöhen</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Aktuelles Passwort</Label>
            <div className="relative">
              <Input id="current-password" type={showCurrentPassword ? "text" : "password"} />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 text-xs"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? "Verbergen" : "Anzeigen"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">Neues Passwort</Label>
            <div className="relative">
              <Input id="new-password" type={showNewPassword ? "text" : "password"} />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 text-xs"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? "Verbergen" : "Anzeigen"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Das Passwort muss mindestens 12 Zeichen lang sein und Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen
              enthalten.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Passwort bestätigen</Label>
            <div className="relative">
              <Input id="confirm-password" type={showConfirmPassword ? "text" : "password"} />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 text-xs"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Verbergen" : "Anzeigen"}
              </Button>
            </div>
          </div>

          <Button>Passwort ändern</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Zwei-Faktor-Authentifizierung</CardTitle>
          <CardDescription>Erhöhen Sie die Sicherheit Ihres Kontos mit Zwei-Faktor-Authentifizierung</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="2fa">Zwei-Faktor-Authentifizierung</Label>
              <p className="text-sm text-muted-foreground">
                Erfordert einen zusätzlichen Sicherheitscode bei der Anmeldung
              </p>
            </div>
            <Switch id="2fa" defaultChecked />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-md">
              <div className="flex items-center gap-4">
                <Smartphone className="h-8 w-8 text-green-500" />
                <div>
                  <h3 className="font-medium">Authenticator-App</h3>
                  <p className="text-sm text-muted-foreground">
                    Verwenden Sie eine Authenticator-App wie Google Authenticator oder Microsoft Authenticator
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Aktiv
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-md">
              <div className="flex items-center gap-4">
                <Key className="h-8 w-8 text-blue-500" />
                <div>
                  <h3 className="font-medium">Sicherheitsschlüssel</h3>
                  <p className="text-sm text-muted-foreground">
                    Verwenden Sie einen physischen Sicherheitsschlüssel wie YubiKey
                  </p>
                </div>
              </div>
              <Button variant="outline">Einrichten</Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-md">
              <div className="flex items-center gap-4">
                <Shield className="h-8 w-8 text-purple-500" />
                <div>
                  <h3 className="font-medium">Backup-Codes</h3>
                  <p className="text-sm text-muted-foreground">Generieren Sie Backup-Codes für den Notfall</p>
                </div>
              </div>
              <Button variant="outline">Generieren</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Zugriffsprotokoll</CardTitle>
          <CardDescription>Überprüfen Sie die letzten Anmeldungen und Aktivitäten</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 rounded-md border">
              <div className="mt-1">
                <Shield className="h-5 w-5 text-green-500" />
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">Erfolgreiche Anmeldung</h4>
                <p className="text-sm text-muted-foreground">
                  Von 192.168.1.1 (Berlin, Deutschland) mit Chrome auf Windows
                </p>
                <p className="text-xs text-muted-foreground">Heute, 10:23 Uhr</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-md border">
              <div className="mt-1">
                <Shield className="h-5 w-5 text-green-500" />
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">Erfolgreiche Anmeldung</h4>
                <p className="text-sm text-muted-foreground">
                  Von 192.168.1.1 (Berlin, Deutschland) mit Chrome auf Windows
                </p>
                <p className="text-xs text-muted-foreground">Gestern, 15:47 Uhr</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-md border">
              <div className="mt-1">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">Fehlgeschlagene Anmeldung</h4>
                <p className="text-sm text-muted-foreground">Von 203.0.113.1 (Unbekannt) mit Safari auf macOS</p>
                <p className="text-xs text-muted-foreground">Vor 3 Tagen, 22:15 Uhr</p>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            Vollständiges Protokoll anzeigen
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Datenschutz und Sicherheit</CardTitle>
          <CardDescription>Verwalten Sie Ihre Datenschutz- und Sicherheitseinstellungen</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="session-timeout">Automatische Abmeldung</Label>
              <p className="text-sm text-muted-foreground">Automatische Abmeldung nach Inaktivität</p>
            </div>
            <Switch id="session-timeout" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="ip-restriction">IP-Beschränkung</Label>
              <p className="text-sm text-muted-foreground">Zugriff nur von bestimmten IP-Adressen erlauben</p>
            </div>
            <Switch id="ip-restriction" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="audit-logging">Audit-Logging</Label>
              <p className="text-sm text-muted-foreground">Detaillierte Protokollierung aller Aktivitäten</p>
            </div>
            <Switch id="audit-logging" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="data-encryption">Datenverschlüsselung</Label>
              <p className="text-sm text-muted-foreground">Ende-zu-Ende-Verschlüsselung für sensible Daten</p>
            </div>
            <Switch id="data-encryption" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
