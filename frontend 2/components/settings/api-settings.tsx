"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Copy, Key, RefreshCw, Link, Database, Server } from "lucide-react"

export function ApiSettings() {
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "Produktionsschlüssel", key: "evicase_prod_key_123456789", active: true, created: "2024-01-15" },
    { id: 2, name: "Testschlüssel", key: "evicase_test_key_987654321", active: true, created: "2024-02-01" },
  ])

  const [showKey, setShowKey] = useState<Record<number, boolean>>({})

  const toggleShowKey = (id: number) => {
    setShowKey((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // In a real app, you would show a toast notification here
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API-Schlüssel</CardTitle>
          <CardDescription>Verwalten Sie Ihre API-Schlüssel für den Zugriff auf die EviCase API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="p-4 border rounded-md space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{apiKey.name}</h3>
                    {apiKey.active ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Aktiv
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Inaktiv
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(apiKey.key)}>
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Kopieren</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <RefreshCw className="h-4 w-4" />
                      <span className="sr-only">Erneuern</span>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Input
                      value={showKey[apiKey.id] ? apiKey.key : "•".repeat(20)}
                      readOnly
                      className="pr-24 font-mono text-sm"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-6 text-xs"
                      onClick={() => toggleShowKey(apiKey.id)}
                    >
                      {showKey[apiKey.id] ? "Verbergen" : "Anzeigen"}
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Erstellt am {new Date(apiKey.created).toLocaleDateString("de-DE")}
                </p>
              </div>
            ))}

            <Button>
              <Key className="mr-2 h-4 w-4" />
              Neuen API-Schlüssel erstellen
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integrationen</CardTitle>
          <CardDescription>Verbinden Sie EviCase mit anderen Systemen und Diensten</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="connected">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="connected">Verbunden</TabsTrigger>
              <TabsTrigger value="available">Verfügbar</TabsTrigger>
            </TabsList>

            <TabsContent value="connected" className="space-y-4 pt-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-4">
                  <Database className="h-8 w-8 text-blue-500" />
                  <div>
                    <h3 className="font-medium">Microsoft SharePoint</h3>
                    <p className="text-sm text-muted-foreground">Verbunden mit Dokumenten-Repository</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Aktiv
                  </Badge>
                  <Button variant="outline" size="sm">
                    Konfigurieren
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-4">
                  <Server className="h-8 w-8 text-purple-500" />
                  <div>
                    <h3 className="font-medium">SAP</h3>
                    <p className="text-sm text-muted-foreground">Verbunden mit ERP-System</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Aktiv
                  </Badge>
                  <Button variant="outline" size="sm">
                    Konfigurieren
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="available" className="space-y-4 pt-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-4">
                  <Link className="h-8 w-8 text-green-500" />
                  <div>
                    <h3 className="font-medium">Salesforce</h3>
                    <p className="text-sm text-muted-foreground">CRM-Integration für Kundenfälle</p>
                  </div>
                </div>
                <Button>Verbinden</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-4">
                  <Database className="h-8 w-8 text-red-500" />
                  <div>
                    <h3 className="font-medium">Oracle Database</h3>
                    <p className="text-sm text-muted-foreground">Datenbank-Integration</p>
                  </div>
                </div>
                <Button>Verbinden</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-4">
                  <Server className="h-8 w-8 text-blue-500" />
                  <div>
                    <h3 className="font-medium">Microsoft Exchange</h3>
                    <p className="text-sm text-muted-foreground">E-Mail-Integration</p>
                  </div>
                </div>
                <Button>Verbinden</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Webhook-Einstellungen</CardTitle>
          <CardDescription>Konfigurieren Sie Webhooks, um Ereignisse an externe Systeme zu senden</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook-URL</Label>
            <div className="flex gap-2">
              <Input id="webhook-url" placeholder="https://example.com/webhook" />
              <Button>Speichern</Button>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="font-medium">Ereignisse</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="event-case-created">Fall erstellt</Label>
                  <p className="text-sm text-muted-foreground">Wenn ein neuer Fall erstellt wird</p>
                </div>
                <Switch id="event-case-created" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="event-document-uploaded">Dokument hochgeladen</Label>
                  <p className="text-sm text-muted-foreground">Wenn ein neues Dokument hochgeladen wird</p>
                </div>
                <Switch id="event-document-uploaded" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="event-analysis-completed">Analyse abgeschlossen</Label>
                  <p className="text-sm text-muted-foreground">Wenn eine Analyse abgeschlossen ist</p>
                </div>
                <Switch id="event-analysis-completed" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="event-inconsistency-detected">Inkonsistenz erkannt</Label>
                  <p className="text-sm text-muted-foreground">Wenn eine Inkonsistenz erkannt wird</p>
                </div>
                <Switch id="event-inconsistency-detected" defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
