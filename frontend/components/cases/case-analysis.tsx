import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
    detectedLegalArea: "Patent Law",
    inconsistencies: [
      {
        id: "inc-001",
        description: "Contradiction between patent application and technical specification regarding functionality X",
        severity: "high",
        documents: ["doc-001", "doc-002"],
      },
      {
        id: "inc-002",
        description: "Temporal discrepancy in correspondence with attorney",
        severity: "medium",
        documents: ["doc-003"],
      },
    ],
    strengthsWeaknesses: {
      strengths: [
        "Detailed technical documentation",
        "Early patent filing",
        "Clear differentiation from competing products",
      ],
      weaknesses: [
        "Contradictory statements regarding functionality",
        "Missing market analysis for EU region",
        "Potential overlap with existing competitor patent",
      ],
    },
    successProbability: 68,
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI-powered Case Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="inconsistencies">Inconsistencies</TabsTrigger>
              <TabsTrigger value="strengths">Strengths/Weaknesses</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                            <h3 className="text-lg font-medium">Jurisdiction</h3>
                          </div>
                          <Badge variant="outline">{analysisData.detectedJurisdiction}</Badge>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>
                          Jurisdiction is detected based on legal references, laws, and geographical indicators in the
                          documents.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Progress value={analysisData.jurisdictionConfidence} className="h-2 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>
                          The confidence score is calculated using an algorithm that weighs the frequency and clarity of
                          jurisdictional references in the documents.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-sm text-muted-foreground cursor-help">
                          Detection Confidence: {analysisData.jurisdictionConfidence}%
                        </p>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>This percentage represents how confident the AI is in its jurisdiction determination.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="space-y-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-muted-foreground" />
                            <h3 className="text-lg font-medium">Legal Area</h3>
                          </div>
                          <Badge variant="outline">{analysisData.detectedLegalArea}</Badge>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>
                          Legal area is determined by analyzing technical terms, cited laws, and thematic focus in the
                          documents.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Progress value={analysisData.legalAreaConfidence} className="h-2 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>
                          The confidence percentage is based on the frequency and relevance of legal area-specific
                          terminology and conceptual patterns.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-sm text-muted-foreground cursor-help">
                          Detection Confidence: {analysisData.legalAreaConfidence}%
                        </p>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>This percentage represents how confident the AI is in its legal area determination.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div className="space-y-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Scale className="h-5 w-5 text-muted-foreground" />
                          <h3 className="text-lg font-medium">Success Probability</h3>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>
                        Success probability is calculated through a combination of precedent cases, strength of
                        evidence, and detected inconsistencies.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="flex items-center gap-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Progress
                          value={analysisData.successProbability}
                          className="h-4 cursor-help"
                          style={{
                            background: `linear-gradient(to right, 
                              #ef4444 0%, 
                              #f59e0b 33%, 
                              #22c55e 66%, 
                              #22c55e 100%)`,
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>
                          This progress bar visualizes the case's success probability. The gradient from red to green
                          represents risk levels, with your case positioned at {analysisData.successProbability}%.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-xl font-bold cursor-help">{analysisData.successProbability}%</span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>
                          This percentage represents the AI's assessment of your case's likelihood of success based on
                          all available evidence.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-sm text-muted-foreground cursor-help">
                        Based on analysis of all documents and detected inconsistencies
                      </p>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>
                        The AI analyzes all documents for completeness, contradictions, and legal strength to create an
                        overall assessment of success prospects.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TabsContent>

            <TabsContent value="inconsistencies" className="pt-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Detected Inconsistencies</h3>
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
                                Document {docId}
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
                      Strengths
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
                      Weaknesses
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
                    Strategic Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">1. Resolve Contradictions</h4>
                    <p className="text-muted-foreground">
                      The identified contradictions between the patent application and technical specification should be
                      resolved immediately. A consistent representation of functionality is crucial for the success of
                      the patent process.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">2. Complete Market Analysis</h4>
                    <p className="text-muted-foreground">
                      A detailed market analysis for the EU region should be created to substantiate the economic
                      relevance of the patent and anticipate potential objections.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">3. Deepen Patent Research</h4>
                    <p className="text-muted-foreground">
                      The potential overlap with the competitor's existing patent should be investigated in more detail.
                      If necessary, the patent claims should be adjusted to create a clear distinction.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">4. Timeline Documentation</h4>
                    <p className="text-muted-foreground">
                      The temporal discrepancy in correspondence with the attorney should be clarified and corrected to
                      ensure complete documentation.
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
