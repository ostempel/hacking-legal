"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

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

export default function DocumentPage() {
  const params = useParams();
  const [legalCase, setLegalCase] = useState<LegalCase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const response = await fetch(`/api/cases/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch case");
        }
        const data = await response.json();
        setLegalCase(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [params.id]);

  const handleAnalyze = async () => {
    if (!legalCase) return;

    setAnalyzing(true);
    try {
      const response = await fetch(`/api/cases/${legalCase.id}/analyze`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();
      setLegalCase((prev) => (prev ? { ...prev, CaseInfo: data } : null));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setAnalyzing(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="bg-red-50">
          <CardContent className="pt-6">
            <div className="text-red-600">Error: {error}</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!legalCase) {
    return (
      <div className="p-6">
        <Card className="bg-yellow-50">
          <CardContent className="pt-6">
            <div className="text-yellow-600">No case found</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 w-full">
      <div className="space-y-2 w-full">
        <h1 className="text-3xl font-bold">{legalCase.title}</h1>
        <div className="flex items-center gap-4">
          <p className="text-muted-foreground">Case ID: {legalCase.id}</p>
        </div>
      </div>

      <div className="space-y-6 w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Document Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-full">
              <label className="text-sm font-medium">Upload ID</label>
              <p className="text-muted-foreground space-y-10">
                {legalCase.uploadId}
              </p>
              <Badge variant="secondary" className="mt-2 ">
                <CalendarDays className="h-3 w-3" />
                {formatDate(legalCase.createdAt)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {legalCase.CaseInfo && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Case Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-full">
                <label className="text-sm font-medium">Parties</label>
                <p>Appellant: {legalCase.CaseInfo.appellant}</p>
                <p>Appellee: {legalCase.CaseInfo.apellee}</p>
              </div>
              <div className="w-full">
                <label className="text-sm font-medium">Subject</label>
                <p>{legalCase.CaseInfo.subject_of_case}</p>
              </div>
              <div className="w-full">
                <label className="text-sm font-medium">Department</label>
                <p>{legalCase.CaseInfo.department}</p>
              </div>
              <div className="w-full">
                <label className="text-sm font-medium">Risk Assessment</label>
                <div className="flex gap-2 mt-1">
                  <Badge
                    variant={
                      legalCase.CaseInfo.high_risk ? "destructive" : "outline"
                    }
                  >
                    {legalCase.CaseInfo.high_risk ? "High Risk" : "Low Risk"}
                  </Badge>
                  <Badge
                    variant={
                      legalCase.CaseInfo.relevant_to_bmw ? "default" : "outline"
                    }
                  >
                    {legalCase.CaseInfo.relevant_to_bmw
                      ? "Relevant to BMW"
                      : "Not Relevant"}
                  </Badge>
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm font-medium">Summary</label>
                <p className="text-muted-foreground">
                  {legalCase.CaseInfo.summary}
                </p>
              </div>
              <div className="w-full">
                <label className="text-sm font-medium">Legal Action</label>
                <p className="text-muted-foreground">
                  {legalCase.CaseInfo.complaint_and_legal_action}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {!legalCase.CaseInfo && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Case Analysis</CardTitle>
              <CardDescription>
                This case has not been analyzed yet.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleAnalyze} disabled={analyzing}>
                {analyzing ? "Analyzing..." : "Start Analysis"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
