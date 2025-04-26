import { TeamHeader } from "@/components/team/team-header"
import { TeamGrid } from "@/components/team/team-grid"
import { TeamFilters } from "@/components/team/team-filters"

export default function TeamPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <TeamHeader />
      <TeamFilters />
      <TeamGrid />
    </div>
  )
}
