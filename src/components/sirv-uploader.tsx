"use client";

import { FileUploadArea } from "./file-upload-area";
import { FileList } from "./file-list";
import { useFileUpload } from "../hooks/use-upload-file";

interface SirvUploaderProps {
  uploadPath: string;
  clientId: string;
  clientSecret: string;
}

export default function SirvUploader({
  uploadPath,
  clientId,
  clientSecret,
}: SirvUploaderProps) {
  const {
    files,
    addFiles,
    uploadFile,
    uploadAllFiles,
    removeFile,
    clearAllFiles,
  } = useFileUpload({ uploadPath, clientId, clientSecret });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <FileUploadArea onFilesAdded={addFiles} />
        {files.length > 0 && (
          <FileList
            files={files}
            onUploadFile={uploadFile}
            onUploadAll={uploadAllFiles}
            onRemoveFile={removeFile}
            onClearAll={clearAllFiles}
          />
        )}
      </div>
    </div>
  );
}
