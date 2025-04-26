import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, BookOpen } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import ResearchFilters from "@/components/research-filters"

export default function ResearchPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Legal Research</h1>
        <p className="text-muted-foreground">Search through legal cases, statutes, and precedents.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Legal Database</CardTitle>
          <CardDescription>Enter keywords, case numbers, or legal questions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center space-x-2">
            <Input placeholder="Search legal cases, statutes, or ask a legal question..." className="flex-1" />
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>

          <Separator className="my-4" />

          <ResearchFilters />
        </CardContent>
      </Card>

      <Tabs defaultValue="results">
        <TabsList>
          <TabsTrigger value="results">Search Results</TabsTrigger>
          <TabsTrigger value="saved">Saved Searches</TabsTrigger>
          <TabsTrigger value="history">Search History</TabsTrigger>
        </TabsList>
        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Results</CardTitle>
              <CardDescription>Enter a search query to see results.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="px-6 py-4 text-center text-muted-foreground">
                <Search className="mx-auto h-12 w-12 opacity-20" />
                <p className="mt-2">No search results to display.</p>
                <p className="text-sm">Try searching for a legal topic, case, or statute.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Searches</CardTitle>
              <CardDescription>Access your saved search queries and results.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">You haven't saved any searches yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Search History</CardTitle>
              <CardDescription>Your recent search queries.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">Your search history will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>AI Research Assistant</CardTitle>
          <CardDescription>Ask complex legal questions and get AI-powered insights.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4 min-h-[200px] flex items-center justify-center">
            <div className="text-center">
              <BookOpen className="mx-auto h-12 w-12 opacity-20" />
              <p className="mt-2 text-muted-foreground">Ask a legal question to get AI-powered research assistance.</p>
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-2">
            <Input placeholder="Ask a legal question..." className="flex-1" />
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Ask
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
