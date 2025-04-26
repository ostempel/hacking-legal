import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, Lightbulb, BarChart3, Calendar, CheckCircle2, Clock, AlertTriangle } from "lucide-react"

interface CaseStrategyProps {
  id: string
}

export function CaseStrategy({ id }: CaseStrategyProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Strategische Planung</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportieren
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Bericht erstellen
          </Button>
        </div>
      </div>

      <Tabs defaultValue="timeline">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline">Zeitplan</TabsTrigger>
          <TabsTrigger value="actions">Maßnahmen</TabsTrigger>
          <TabsTrigger value="scenarios">Szenarien</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                Strategischer Zeitplan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative border-l-2 border-muted pl-6 space-y-8">
                <div className="relative">
                  <div className="absolute -left-[25px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Abgeschlossen
                      </Badge>
                      <h3 className="font-medium">Patentanmeldung einreichen</h3>
                      <span className="text-sm text-muted-foreground">28.11.2023</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Patentanmeldung beim Europäischen Patentamt eingereicht
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[25px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge>Aktuell</Badge>
                      <h3 className="font-medium">Widersprüche klären</h3>
                      <span className="text-sm text-muted-foreground">15.03.2024</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Identifizierte Widersprüche in der Dokumentation auflösen
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[25px] top-0 h-4 w-4 rounded-full bg-muted"></div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Geplant</Badge>
                      <h3 className="font-medium">Marktanalyse ergänzen</h3>
                      <span className="text-sm text-muted-foreground">30.04.2024</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Detaillierte Marktanalyse für den EU-Raum erstellen</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[25px] top-0 h-4 w-4 rounded-full bg-muted"></div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Geplant</Badge>
                      <h3 className="font-medium">Patentrecherche vertiefen</h3>
                      <span className="text-sm text-muted-foreground">15.05.2024</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Mögliche Überschneidungen mit bestehenden Patenten untersuchen
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[25px] top-0 h-4 w-4 rounded-full bg-muted"></div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Geplant</Badge>
                      <h3 className="font-medium">Vorbereitung auf Einsprüche</h3>
                      <span className="text-sm text-muted-foreground">30.06.2024</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Strategie für mögliche Einsprüche entwickeln</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Empfohlene Maßnahmen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4 p-3 rounded-md border">
                  <div className="mt-1">
                    <Clock className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">Technische Dokumentation überarbeiten</h4>
                    <p className="text-sm text-muted-foreground">
                      Die technische Spezifikation sollte überarbeitet werden, um Konsistenz mit der Patentanmeldung
                      herzustellen.
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Hohe Priorität</Badge>
                      <span className="text-xs text-muted-foreground">Frist: 31.03.2024</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-md border">
                  <div className="mt-1">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">Marktanalyse durchführen</h4>
                    <p className="text-sm text-muted-foreground">
                      Eine umfassende Marktanalyse für den EU-Raum sollte in Auftrag gegeben werden.
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Mittlere Priorität</Badge>
                      <span className="text-xs text-muted-foreground">Frist: 30.04.2024</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-md border">
                  <div className="mt-1">
                    <FileText className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">Patentrecherche beauftragen</h4>
                    <p className="text-sm text-muted-foreground">
                      Eine spezialisierte Patentrecherche sollte beauftragt werden, um potenzielle Konflikte zu
                      identifizieren.
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Mittlere Priorität</Badge>
                      <span className="text-xs text-muted-foreground">Frist: 15.05.2024</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Risikominderung
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Identifizierte Risiken</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive mt-1 shrink-0" />
                      <span>Widersprüchliche technische Dokumentation könnte die Patentanmeldung gefährden</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-1 shrink-0" />
                      <span>Mögliche Überschneidung mit bestehendem Patent eines Wettbewerbers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-1 shrink-0" />
                      <span>Fehlende Marktanalyse könnte wirtschaftliche Relevanz in Frage stellen</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Gegenmaßnahmen</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                      <span>Technische Dokumentation überarbeiten und harmonisieren</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                      <span>Detaillierte Patentrecherche durchführen und Abgrenzung definieren</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                      <span>Marktanalyse mit Fokus auf wirtschaftliche Relevanz erstellen</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scenarios" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                Strategische Szenarien
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="best">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="best">Best Case</TabsTrigger>
                  <TabsTrigger value="expected">Expected Case</TabsTrigger>
                  <TabsTrigger value="worst">Worst Case</TabsTrigger>
                </TabsList>

                <TabsContent value="best" className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Best-Case-Szenario (25% Wahrscheinlichkeit)</h3>
                    <p className="text-muted-foreground">
                      Patentanmeldung wird ohne Einsprüche akzeptiert, technische Widersprüche können vollständig
                      aufgelöst werden, und es gibt keine Überschneidungen mit bestehenden Patenten.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Erwartete Ergebnisse:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                        <span>Vollständiger Patentschutz in der EU</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                        <span>Starke Marktposition gegenüber Wettbewerbern</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                        <span>Möglichkeit zur Lizenzierung der Technologie</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Erforderliche Maßnahmen:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                        <span>Technische Dokumentation überarbeiten</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                        <span>Marktanalyse durchführen</span>
                      </li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="expected" className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Expected-Case-Szenario (60% Wahrscheinlichkeit)</h3>
                    <p className="text-muted-foreground">
                      Patentanmeldung wird mit kleineren Einschränkungen akzeptiert, technische Widersprüche können
                      größtenteils aufgelöst werden, und es gibt geringe Überschneidungen mit bestehenden Patenten.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Erwartete Ergebnisse:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                        <span>Patentschutz mit einigen Einschränkungen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                        <span>Solide Marktposition mit gewissen Herausforderungen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                        <span>Begrenzte Möglichkeiten zur Lizenzierung</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Erforderliche Maßnahmen:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                        <span>Technische Dokumentation überarbeiten</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                        <span>Marktanalyse durchführen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                        <span>Patentrecherche vertiefen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                        <span>Strategie für Einsprüche entwickeln</span>
                      </li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="worst" className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Worst-Case-Szenario (15% Wahrscheinlichkeit)</h3>
                    <p className="text-muted-foreground">
                      Patentanmeldung wird abgelehnt oder stark eingeschränkt, technische Widersprüche können nicht
                      aufgelöst werden, und es gibt signifikante Überschneidungen mit bestehenden Patenten.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Erwartete Ergebnisse:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive mt-1 shrink-0" />
                        <span>Kein oder stark eingeschränkter Patentschutz</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive mt-1 shrink-0" />
                        <span>Schwache Marktposition gegenüber Wettbewerbern</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive mt-1 shrink-0" />
                        <span>Mögliche Patentverletzungsansprüche von Wettbewerbern</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Erforderliche Maßnahmen:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                        <span>Vollständige Überarbeitung der Patentanmeldung</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                        <span>Alternative Schutzstrategien entwickeln</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                        <span>Rechtliche Beratung zu Patentverletzungsrisiken einholen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                        <span>Geschäftsstrategie neu ausrichten</span>
                      </li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
