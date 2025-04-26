"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Search, Bell, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function PortalPage() {
  const [activeTab, setActiveTab] = useState("report")
  const [selectedCase, setSelectedCase] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header with same elements as Dashboard */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Case Portal</h1>
          <p className="text-muted-foreground">Report a new case or upload documents to an existing case</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Suche..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Benachrichtigungen</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Neue Dokumente hochgeladen</p>
                  <p className="text-sm text-muted-foreground">Fall #1234 - 5 neue Dokumente</p>
                  <p className="text-xs text-muted-foreground">Vor 10 Minuten</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Analyse abgeschlossen</p>
                  <p className="text-sm text-muted-foreground">Fall #5678 - Analyse bereit</p>
                  <p className="text-xs text-muted-foreground">Vor 1 Stunde</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Neuer Kommentar</p>
                  <p className="text-sm text-muted-foreground">Dr. Schmidt hat einen Kommentar hinzugefügt</p>
                  <p className="text-xs text-muted-foreground">Vor 3 Stunden</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Neuer Fall
          </Button>
          <Link href="/settings">
            <Avatar className="cursor-pointer">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">What would you like to do?</h2>
            <p className="text-muted-foreground">
              Choose an option below to either report a new case or upload documents to an existing case
            </p>

            <Tabs defaultValue="report" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="report">Report New Case</TabsTrigger>
                <TabsTrigger value="upload">Upload Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="report" className="space-y-6 pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="case-title">Case Title</Label>
                    <Input id="case-title" placeholder="Enter a descriptive title" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe the case in detail..." className="min-h-[200px]" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="patent">Patent Dispute</SelectItem>
                        <SelectItem value="contract">Contract Review</SelectItem>
                        <SelectItem value="compliance">Compliance Issue</SelectItem>
                        <SelectItem value="labor">Labor Law</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Supporting Documents (Optional)</Label>
                    <div className="border-2 border-dashed rounded-lg p-10 text-center">
                      <input type="file" id="file-upload" multiple className="hidden" />
                      <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
                        <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">Drag & drop files here or click to browse</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Supports PDF, Word, Excel, and image files up to 10MB
                        </p>
                        <Button variant="outline">Select Files</Button>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline">Cancel</Button>
                    <Button>Submit Case</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="upload" className="space-y-6 pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="existing-case">Select Existing Case</Label>
                    <Select value={selectedCase} onValueChange={setSelectedCase}>
                      <SelectTrigger id="existing-case">
                        <SelectValue placeholder="Select a case" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="C-2023-001">C-2023-001: Produkthaftung XYZ GmbH</SelectItem>
                        <SelectItem value="C-2023-002">C-2023-002: Patentstreit TechCorp</SelectItem>
                        <SelectItem value="C-2024-001">C-2024-001: Datenschutzprüfung</SelectItem>
                        <SelectItem value="C-2024-002">C-2024-002: Vertragsanalyse Lieferanten</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="document-type">Document Type</Label>
                    <Select>
                      <SelectTrigger id="document-type">
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="evidence">Evidence</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="correspondence">Correspondence</SelectItem>
                        <SelectItem value="legal">Legal Document</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="document-description">Document Description (Optional)</Label>
                    <Textarea
                      id="document-description"
                      placeholder="Provide additional context about these documents..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Upload Documents</Label>
                    <div className="border-2 border-dashed rounded-lg p-10 text-center">
                      <input type="file" id="document-upload" multiple className="hidden" />
                      <label
                        htmlFor="document-upload"
                        className="flex flex-col items-center justify-center cursor-pointer"
                      >
                        <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">Drag & drop files here or click to browse</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Supports PDF, Word, Excel, and image files up to 10MB
                        </p>
                        <Button variant="outline">Select Files</Button>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline">Cancel</Button>
                    <Button disabled={!selectedCase}>Upload Documents</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
