import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, Shield, Sword, Target, BarChart, CheckCircle, XCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function StrategyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Case Strategy</h1>
        <p className="text-muted-foreground">AI-powered strategic recommendations for your legal cases.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Case Selection</CardTitle>
          <CardDescription>Select a case to generate strategic recommendations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a case" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="case1">Smith v. Johnson (2023)</SelectItem>
              <SelectItem value="case2">Estate of Williams (2023)</SelectItem>
              <SelectItem value="case3">Doe v. City of Springfield (2022)</SelectItem>
            </SelectContent>
          </Select>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium mb-2">Case Type</p>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select case type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="civil">Civil Litigation</SelectItem>
                  <SelectItem value="criminal">Criminal Defense</SelectItem>
                  <SelectItem value="family">Family Law</SelectItem>
                  <SelectItem value="corporate">Corporate Law</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Your Role</p>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plaintiff">Plaintiff's Counsel</SelectItem>
                  <SelectItem value="defendant">Defense Counsel</SelectItem>
                  <SelectItem value="prosecutor">Prosecutor</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="w-full">
            <Lightbulb className="mr-2 h-4 w-4" />
            Generate Strategy Recommendations
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Case Strength Analysis</CardTitle>
            <CardDescription>AI assessment of your case's strengths and weaknesses.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-8">
                <BarChart className="mx-auto h-12 w-12 opacity-20" />
                <p className="mt-2 text-muted-foreground">Select a case to see strength analysis.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Strategic Approaches</CardTitle>
            <CardDescription>Recommended legal strategies for your case.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Target className="mx-auto h-12 w-12 opacity-20" />
              <p className="mt-2 text-muted-foreground">Select a case to see strategic approaches.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Strategy Recommendations</CardTitle>
          <CardDescription>Comprehensive AI-generated strategy for your selected case.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="offense">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="offense">
                <Sword className="mr-2 h-4 w-4" />
                Offensive Strategy
              </TabsTrigger>
              <TabsTrigger value="defense">
                <Shield className="mr-2 h-4 w-4" />
                Defensive Strategy
              </TabsTrigger>
            </TabsList>
            <TabsContent value="offense" className="space-y-4 mt-4">
              <div className="text-center py-8">
                <Sword className="mx-auto h-12 w-12 opacity-20" />
                <p className="mt-2 text-muted-foreground">Select a case to see offensive strategy recommendations.</p>
              </div>
            </TabsContent>
            <TabsContent value="defense" className="space-y-4 mt-4">
              <div className="text-center py-8">
                <Shield className="mx-auto h-12 w-12 opacity-20" />
                <p className="mt-2 text-muted-foreground">Select a case to see defensive strategy recommendations.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Arguments</CardTitle>
          <CardDescription>Essential arguments and counterarguments for your case.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  <span>Key Arguments</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-center py-4 text-muted-foreground">
                  <p>Select a case to see key arguments.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex items-center">
                  <XCircle className="mr-2 h-4 w-4 text-red-500" />
                  <span>Potential Counterarguments</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-center py-4 text-muted-foreground">
                  <p>Select a case to see potential counterarguments.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
