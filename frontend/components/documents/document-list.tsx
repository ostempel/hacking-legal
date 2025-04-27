"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  Download,
  MoreHorizontal,
  FileText,
  FileIcon as FilePdf,
  FileImage,
  Trash2,
  LinkIcon,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface LegalCase {
  id: string;
  title: string;
  name: string;
  uploadId: string;
  createdAt: string;
  CaseInfo?: {
    appellant: string;
    apellee: string;
    relevant_to_bmw: boolean;
    subject_of_case: string;
    high_risk: boolean;
    complaint_and_legal_action: string;
    department: string;
    summary: string;
  };
}

interface DocumentListProps {
  sortField: "name" | "case" | "date";
  sortDirection: "asc" | "desc";
  selectedCase?: string | null;
  searchQuery?: string;
  filter?: "all" | "recent" | "unassigned" | "analyzed";
}

export function DocumentList({
  sortField,
  sortDirection,
  selectedCase,
  searchQuery,
  filter = "all",
}: DocumentListProps) {
  const [cases, setCases] = useState<LegalCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch("/api/cases");
        if (!response.ok) {
          throw new Error("Failed to fetch cases");
        }
        const data = await response.json();
        setCases(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch cases");
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-100 rounded animate-pulse" />
        <div className="h-8 bg-gray-100 rounded animate-pulse" />
        <div className="h-8 bg-gray-100 rounded animate-pulse" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  let filteredCases = [...cases];

  // Apply filters
  if (filter === "analyzed") {
    filteredCases = filteredCases.filter((c) => c.CaseInfo);
  } else if (filter === "unassigned") {
    filteredCases = filteredCases.filter((c) => !c.CaseInfo);
  } else if (filter === "recent") {
    filteredCases = filteredCases
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 10);
  }

  // Apply search
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredCases = filteredCases.filter(
      (c) =>
        c.title.toLowerCase().includes(query) ||
        c.name.toLowerCase().includes(query) ||
        c.CaseInfo?.subject_of_case.toLowerCase().includes(query)
    );
  }

  // Apply sorting
  filteredCases.sort((a, b) => {
    let comparison = 0;
    if (sortField === "name") {
      comparison = a.title.localeCompare(b.title);
    } else if (sortField === "date") {
      comparison =
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return sortDirection === "desc" ? -comparison : comparison;
  });

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FilePdf className="h-5 w-5 text-red-500" />;
      case "docx":
      case "txt":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "jpg":
      case "jpeg":
      case "png":
        return <FileImage className="h-5 w-5 text-green-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents ({filteredCases.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {filteredCases.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No documents found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCases.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getDocumentIcon(doc.CaseInfo?.subject_of_case || "")}
                      <div>
                        <div className="font-medium">
                          {doc.title || doc.name}
                        </div>
                        <div className="text-sm text-muted-foreground"></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(doc.createdAt)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {doc.CaseInfo ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700"
                      >
                        Analyzed
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700"
                      >
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {doc.CaseInfo && (
                      <Badge
                        variant={
                          doc.CaseInfo.high_risk ? "destructive" : "outline"
                        }
                      >
                        {doc.CaseInfo.high_risk ? "High Risk" : "Low Risk"}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/documents/${doc.id}`}>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
