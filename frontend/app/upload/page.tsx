import { DocumentUploader } from "@/components/upload/document-uploader"
import { UploadOptions } from "@/components/upload/upload-options"

export default function UploadPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Upload Documents</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DocumentUploader />
        </div>
        <div>
          <UploadOptions />
        </div>
      </div>
    </div>
  )
}
