import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, FileText, Scale, Lightbulb } from "lucide-react"

export default function ActivityFeed() {
  return (
    <ScrollArea className="h-[200px]">
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
            <Search className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Research Session</p>
            <p className="text-xs text-muted-foreground">Searched for "precedents in wrongful termination"</p>
            <p className="text-xs text-muted-foreground">2 hours ago</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
            <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Document Added</p>
            <p className="text-xs text-muted-foreground">Added "Smith Employment Contract.pdf" to Smith v. Johnson</p>
            <p className="text-xs text-muted-foreground">Yesterday</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
            <Scale className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Evidence Analysis</p>
            <p className="text-xs text-muted-foreground">Analyzed 3 witness statements in Doe v. City of Springfield</p>
            <p className="text-xs text-muted-foreground">2 days ago</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900">
            <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Strategy Generated</p>
            <p className="text-xs text-muted-foreground">Generated case strategy for Estate of Williams</p>
            <p className="text-xs text-muted-foreground">3 days ago</p>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
