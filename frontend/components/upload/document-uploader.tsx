"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  File,
  X,
  CheckCircle2,
  AlertTriangle,
  FileText,
  FileIcon as FilePdf,
  FileImage,
  Mail,
} from "lucide-react"

export function DocumentUploader() {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [uploadStatus, setUploadStatus] = useState<Record<string, "pending" | "success" | "error">>({})

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])

      // Initialize progress and status for new files
      const newProgress: Record<string, number> = {}
      const newStatus: Record<string, "pending" | "success" | "error"> = {}

      newFiles.forEach((file) => {
        newProgress[file.name] = 0
        newStatus[file.name] = "pending"
      })

      setUploadProgress((prev) => ({ ...prev, ...newProgress }))
      setUploadStatus((prev) => ({ ...prev, ...newStatus }))
    }
  }

  const removeFile = (fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName))

    // Remove from progress and status
    setUploadProgress((prev) => {
      const newProgress = { ...prev }
      delete newProgress[fileName]
      return newProgress
    })

    setUploadStatus((prev) => {
      const newStatus = { ...prev }
      delete newStatus[fileName]
      return newStatus
    })
  }

  const simulateUpload = () => {
    if (files.length === 0) return

    setUploading(true)

    // Simulate upload progress for each file
    files.forEach((file) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 10
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)

          // Set status (randomly success or error for demo)
          const status = Math.random() > 0.2 ? "success" : "error"
          setUploadStatus((prev) => ({ ...prev, [file.name]: status }))

          // Check if all uploads are complete
          const allComplete = Object.values(uploadStatus).every((status) => status === "success" || status === "error")

          if (allComplete) {
            setUploading(false)
          }
        }

        setUploadProgress((prev) => ({ ...prev, [file.name]: progress }))
      }, 300)
    })
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()

    switch (extension) {
      case "pdf":
        return <FilePdf className="h-5 w-5 text-red-500" />
      case "doc":
      case "docx":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "jpg":
      case "jpeg":
      case "png":
        return <FileImage className="h-5 w-5 text-green-500" />
      case "eml":
        return <Mail className="h-5 w-5 text-purple-500" />
      default:
        return <File className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-2 border-dashed rounded-lg p-10 text-center">
          <input
            type="file"
            id="file-upload"
            multiple
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Drop files here or click to select</h3>
            <p className="text-sm text-muted-foreground mb-4">Supported formats: PDF, DOCX, XLSX, JPG, PNG, EML</p>
            <Button variant="outline" disabled={uploading}>
              Select Files
            </Button>
          </label>
        </div>

        {files.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Selected Files ({files.length})</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => simulateUpload()}
                disabled={uploading || files.length === 0}
              >
                {uploading ? "Uploading..." : "Start Upload"}
              </Button>
            </div>

            <div className="space-y-2">
              {files.map((file) => (
                <div key={file.name} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.name)}
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {uploadStatus[file.name] === "success" ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Success
                      </Badge>
                    ) : uploadStatus[file.name] === "error" ? (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <AlertTriangle className="h-3 w-3 mr-1" /> Error
                      </Badge>
                    ) : uploadProgress[file.name] > 0 ? (
                      <div className="w-24 flex items-center gap-2">
                        <Progress value={uploadProgress[file.name]} className="h-2" />
                        <span className="text-xs">{Math.round(uploadProgress[file.name])}%</span>
                      </div>
                    ) : (
                      <Badge variant="outline">Ready</Badge>
                    )}

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.name)}
                      disabled={uploading && uploadProgress[file.name] > 0 && uploadProgress[file.name] < 100}
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
  )
}
