import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"

export default function ResearchFilters() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Filters</h3>
        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
          <Filter className="mr-2 h-3.5 w-3.5" />
          Clear Filters
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="jurisdiction">Jurisdiction</Label>
          <Select>
            <SelectTrigger id="jurisdiction">
              <SelectValue placeholder="All Jurisdictions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="federal">Federal</SelectItem>
              <SelectItem value="state">State</SelectItem>
              <SelectItem value="local">Local</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="document-type">Document Type</Label>
          <Select>
            <SelectTrigger id="document-type">
              <SelectValue placeholder="All Documents" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cases">Cases</SelectItem>
              <SelectItem value="statutes">Statutes</SelectItem>
              <SelectItem value="regulations">Regulations</SelectItem>
              <SelectItem value="articles">Articles</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date-range">Date Range</Label>
          <Select>
            <SelectTrigger id="date-range">
              <SelectValue placeholder="Any Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="past-year">Past Year</SelectItem>
              <SelectItem value="past-5-years">Past 5 Years</SelectItem>
              <SelectItem value="past-10-years">Past 10 Years</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sort-by">Sort By</Label>
          <Select>
            <SelectTrigger id="sort-by">
              <SelectValue placeholder="Relevance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="date-newest">Date (Newest)</SelectItem>
              <SelectItem value="date-oldest">Date (Oldest)</SelectItem>
              <SelectItem value="citations">Most Cited</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Legal Topics</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="topic-contracts" />
            <Label htmlFor="topic-contracts" className="text-sm">
              Contracts
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="topic-torts" />
            <Label htmlFor="topic-torts" className="text-sm">
              Torts
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="topic-property" />
            <Label htmlFor="topic-property" className="text-sm">
              Property
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="topic-criminal" />
            <Label htmlFor="topic-criminal" className="text-sm">
              Criminal
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="topic-constitutional" />
            <Label htmlFor="topic-constitutional" className="text-sm">
              Constitutional
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="topic-administrative" />
            <Label htmlFor="topic-administrative" className="text-sm">
              Administrative
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="topic-corporate" />
            <Label htmlFor="topic-corporate" className="text-sm">
              Corporate
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="topic-ip" />
            <Label htmlFor="topic-ip" className="text-sm">
              Intellectual Property
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}
