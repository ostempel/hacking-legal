import { CaseOverview } from "@/components/dashboard/case-overview"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { StatCards } from "@/components/dashboard/stat-cards"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <DashboardHeader />
      <StatCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CaseOverview />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
