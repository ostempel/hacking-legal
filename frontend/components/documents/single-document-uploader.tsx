"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

// Mock cases data
const cases = [
  { id: "C-2023-001", name: "Product Liability XYZ Corp" },
  { id: "C-2023-002", name: "Patent Dispute TechCorp" },
  { id: "C-2023-003", name: "Labor Law Compliance" },
  { id: "C-2024-001", name: "Data Protection Audit" },
  { id: "C-2024-002", name: "Supplier Contract Analysis" },
];

export function SingleDocumentUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
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
      formData.append("file", file);
      formData.append("name", file.name);

      const response = await fetch("/api/cases/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      setUploadStatus({ [file.name]: "success" });
      setUploadProgress({ [file.name]: 100 });
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
    <Card>
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
              <Button
                variant="outline"
                size="sm"
                onClick={uploadFile}
                disabled={uploading || files.length === 0}
              >
                {uploading ? "Uploading..." : "Upload File"}
              </Button>
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
      </CardContent>
    </Card>
  );
}
