import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle2, XCircle, Scale, MapPin, Briefcase, Lightbulb } from "lucide-react"

interface CaseAnalysisProps {
  id: string
}

export function CaseAnalysis({ id }: CaseAnalysisProps) {
  // In a real application, you would fetch the analysis data based on the ID
  const analysisData = {
    id,
    jurisdictionConfidence: 92,
    detectedJurisdiction: "EU",
    legalAreaConfidence: 88,
    detectedLegalArea: "Patentrecht",
    inconsistencies: [
      {
        id: "inc-001",
        description:
          "Widerspruch zwischen Patentanmeldung und technischer Spezifikation bezüglich der Funktionalität X",
        severity: "high",
        documents: ["doc-001", "doc-002"],
      },
      {
        id: "inc-002",
        description: "Zeitliche Diskrepanz in der Korrespondenz mit dem Anwalt",
        severity: "medium",
        documents: ["doc-003"],
      },
    ],
    strengthsWeaknesses: {
      strengths: [
        "Detaillierte technische Dokumentation",
        "Frühzeitige Patentanmeldung",
        "Klare Abgrenzung zu Konkurrenzprodukten",
      ],
      weaknesses: [
        "Widersprüchliche Angaben zur Funktionalität",
        "Fehlende Marktanalyse für EU-Raum",
        "Potenzielle Überschneidung mit bestehendem Patent von Wettbewerber",
      ],
    },
    successProbability: 68,
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>KI-gestützte Fallanalyse</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Übersicht</TabsTrigger>
              <TabsTrigger value="inconsistencies">Inkonsistenzen</TabsTrigger>
              <TabsTrigger value="strengths">Stärken/Schwächen</TabsTrigger>
              <TabsTrigger value="recommendations">Empfehlungen</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Jurisdiktion</h3>
                    </div>
                    <Badge variant="outline">{analysisData.detectedJurisdiction}</Badge>
                  </div>
                  <Progress value={analysisData.jurisdictionConfidence} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Erkennungssicherheit: {analysisData.jurisdictionConfidence}%
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Rechtsgebiet</h3>
                    </div>
                    <Badge variant="outline">{analysisData.detectedLegalArea}</Badge>
                  </div>
                  <Progress value={analysisData.legalAreaConfidence} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Erkennungssicherheit: {analysisData.legalAreaConfidence}%
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Erfolgswahrscheinlichkeit</h3>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Progress
                    value={analysisData.successProbability}
                    className="h-4"
                    style={{
                      background: `linear-gradient(to right, 
                        #ef4444 0%, 
                        #f59e0b 33%, 
                        #22c55e 66%, 
                        #22c55e 100%)`,
                    }}
                  />
                  <span className="text-xl font-bold">{analysisData.successProbability}%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Basierend auf der Analyse aller Dokumente und erkannten Inkonsistenzen
                </p>
              </div>
            </TabsContent>

            <TabsContent value="inconsistencies" className="pt-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Erkannte Inkonsistenzen</h3>
                {analysisData.inconsistencies.map((inconsistency) => (
                  <Card
                    key={inconsistency.id}
                    className={`border-l-4 ${
                      inconsistency.severity === "high"
                        ? "border-l-destructive"
                        : inconsistency.severity === "medium"
                          ? "border-l-amber-500"
                          : "border-l-blue-500"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {inconsistency.severity === "high" ? (
                          <AlertTriangle className="h-5 w-5 text-destructive mt-1" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-amber-500 mt-1" />
                        )}
                        <div className="space-y-2">
                          <p className="font-medium">{inconsistency.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {inconsistency.documents.map((docId) => (
                              <Badge key={docId} variant="outline">
                                Dokument {docId}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="strengths" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      Stärken
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysisData.strengthsWeaknesses.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-destructive" />
                      Schwächen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysisData.strengthsWeaknesses.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-destructive mt-1 shrink-0" />
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-amber-500" />
                    Strategische Empfehlungen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">1. Widersprüche klären</h4>
                    <p className="text-muted-foreground">
                      Die identifizierten Widersprüche zwischen der Patentanmeldung und der technischen Spezifikation
                      sollten umgehend geklärt werden. Eine konsistente Darstellung der Funktionalität ist entscheidend
                      für den Erfolg des Patentverfahrens.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">2. Marktanalyse ergänzen</h4>
                    <p className="text-muted-foreground">
                      Eine detaillierte Marktanalyse für den EU-Raum sollte erstellt werden, um die wirtschaftliche
                      Relevanz des Patents zu untermauern und potenzielle Einwände zu antizipieren.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">3. Patentrecherche vertiefen</h4>
                    <p className="text-muted-foreground">
                      Die mögliche Überschneidung mit dem bestehenden Patent des Wettbewerbers sollte genauer untersucht
                      werden. Gegebenenfalls sollten die Patentansprüche angepasst werden, um eine klare Abgrenzung zu
                      schaffen.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">4. Zeitliche Dokumentation</h4>
                    <p className="text-muted-foreground">
                      Die zeitliche Diskrepanz in der Korrespondenz mit dem Anwalt sollte aufgeklärt und korrigiert
                      werden, um eine lückenlose Dokumentation zu gewährleisten.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
