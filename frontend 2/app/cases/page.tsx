import { CaseFilters } from "@/components/cases/case-filters"
import { CaseList } from "@/components/cases/case-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function CasesPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Case Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Case
        </Button>
      </div>
      <CaseFilters />
      <CaseList />
    </div>
  )
}
