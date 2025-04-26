"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, BarChart2, Lightbulb, MessageSquare, History } from "lucide-react"

export function CaseTabs() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tab = searchParams.get("tab") || "documents"

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("tab", value)
    router.push(`?${params.toString()}`)
  }

  return (
    <TabsList className="grid w-full grid-cols-5">
      <TabsTrigger
        value="documents"
        onClick={() => handleTabChange("documents")}
        className="flex items-center gap-2"
        data-state={tab === "documents" ? "active" : "inactive"}
      >
        <FileText className="h-4 w-4" />
        <span className="hidden sm:inline">Dokumente</span>
      </TabsTrigger>
      <TabsTrigger
        value="analysis"
        onClick={() => handleTabChange("analysis")}
        className="flex items-center gap-2"
        data-state={tab === "analysis" ? "active" : "inactive"}
      >
        <BarChart2 className="h-4 w-4" />
        <span className="hidden sm:inline">Analyse</span>
      </TabsTrigger>
      <TabsTrigger
        value="strategy"
        onClick={() => handleTabChange("strategy")}
        className="flex items-center gap-2"
        data-state={tab === "strategy" ? "active" : "inactive"}
      >
        <Lightbulb className="h-4 w-4" />
        <span className="hidden sm:inline">Strategie</span>
      </TabsTrigger>
      <TabsTrigger
        value="comments"
        onClick={() => handleTabChange("comments")}
        className="flex items-center gap-2"
        data-state={tab === "comments" ? "active" : "inactive"}
      >
        <MessageSquare className="h-4 w-4" />
        <span className="hidden sm:inline">Kommentare</span>
      </TabsTrigger>
      <TabsTrigger
        value="history"
        onClick={() => handleTabChange("history")}
        className="flex items-center gap-2"
        data-state={tab === "history" ? "active" : "inactive"}
      >
        <History className="h-4 w-4" />
        <span className="hidden sm:inline">Verlauf</span>
      </TabsTrigger>
    </TabsList>
  )
}
