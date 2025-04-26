import { CaseHeader } from "@/components/cases/case-header"
import { CaseTabs } from "@/components/cases/case-tabs"
import { CaseDocuments } from "@/components/cases/case-documents"
import { CaseAnalysis } from "@/components/cases/case-analysis"
import { CaseStrategy } from "@/components/cases/case-strategy"
import { Tabs, TabsContent } from "@/components/ui/tabs"

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <CaseHeader id={params.id} />
      <Tabs defaultValue="documents">
        <CaseTabs />
        <TabsContent value="documents">
          <CaseDocuments id={params.id} />
        </TabsContent>
        <TabsContent value="analysis">
          <CaseAnalysis id={params.id} />
        </TabsContent>
        <TabsContent value="strategy">
          <CaseStrategy id={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
