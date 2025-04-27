"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DocumentUploader } from "@/components/documents/document-uploader";
import { SingleDocumentUploader } from "@/components/documents/single-document-uploader";
import { useRouter } from "next/navigation";

import type React from "react";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  X,
  CheckCircle2,
  AlertTriangle,
  FileText,
  FileIcon as FilePdf,
  FileImage,
} from "lucide-react";

export default function NewCasePage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [caseTitle, setCaseTitle] = useState("");
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [uploadStatus, setUploadStatus] = useState<
    Record<string, "pending" | "success" | "error">
  >({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Only take the first file since this is a single file uploader
      const file = e.target.files[0];
      setFiles([file]);

      // Initialize progress and status for the file
      setUploadProgress({ [file.name]: 0 });
      setUploadStatus({ [file.name]: "pending" });
    }
  };

  const removeFile = (fileName: string) => {
    setFiles([]);
    setUploadProgress({});
    setUploadStatus({});
  };

  const uploadFile = async () => {
    if (files.length === 0) return;

    setUploading(true);
    const file = files[0];

    try {
      const formData = new FormData();
      console.log("caseTitle", caseTitle);
      console.log("file", file);
      formData.append("file", file);
      formData.append("name", caseTitle || file.name);

      const response = await fetch("/api/cases/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      setUploadStatus({ [file.name]: "success" });
      setUploadProgress({ [file.name]: 100 });
      console.log("response", response);
      const body = await response.json();
      console.log("body", body);

      // Redirect to documents page with the ID
      router.push(`/documents/${body.id}`);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus({ [file.name]: "error" });
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();

    switch (extension) {
      case "pdf":
        return <FilePdf className="h-5 w-5 text-red-500" />;
    }
  };
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Submit New Case</h1>
        <p className="text-muted-foreground">
          Provide details about your legal case for our team to review
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Case Information</CardTitle>
          <CardDescription>
            Please provide as much detail as possible to help our legal team
            understand your case
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="case-title">Case Title</Label>
            <Input
              id="case-title"
              placeholder="Brief descriptive title for your case"
              value={caseTitle}
              onChange={(e) => setCaseTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="border-2 border-dashed rounded-lg p-10 text-center">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
                disabled={uploading}
                accept=".pdf"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  Drop file here or click to select
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Supported format: PDF
                </p>
                <Button variant="outline" disabled={uploading}>
                  Select File
                </Button>
              </label>
            </div>

            {files.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Selected File</h3>
                  {/* <Button
                    variant="outline"
                    size="sm"
                    onClick={uploadFile}
                    disabled={uploading || files.length === 0}
                  >
                    {uploading ? "Uploading..." : "Upload File"}
                  </Button> */}
                </div>

                <div className="space-y-2">
                  {files.map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.name)}
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {uploadStatus[file.name] === "success" ? (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Success
                          </Badge>
                        ) : uploadStatus[file.name] === "error" ? (
                          <Badge
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200"
                          >
                            <AlertTriangle className="h-3 w-3 mr-1" /> Error
                          </Badge>
                        ) : uploadProgress[file.name] > 0 ? (
                          <div className="w-24 flex items-center gap-2">
                            <Progress
                              value={uploadProgress[file.name]}
                              className="h-2"
                            />
                            <span className="text-xs">
                              {Math.round(uploadProgress[file.name])}%
                            </span>
                          </div>
                        ) : (
                          <Badge variant="outline">Ready</Badge>
                        )}

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(file.name)}
                          disabled={uploading}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button
              onClick={uploadFile}
              disabled={uploading || files.length === 0 || !caseTitle.trim()}
            >
              Submit Case
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
