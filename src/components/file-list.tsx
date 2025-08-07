"use client";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { Upload, File, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { UploadFile } from "../types/upload";
import { formatFileSize } from "../lib/utils";

interface FileListProps {
  files: UploadFile[];
  onUploadFile: (file: UploadFile) => void;
  onUploadAll: () => void;
  onRemoveFile: (id: string) => void;
  onClearAll: () => void;
}

export function FileList({
  files,
  onUploadFile,
  onUploadAll,
  onRemoveFile,
  onClearAll,
}: FileListProps) {
  const getStatusIcon = (status: UploadFile["status"]) => {
    switch (status) {
      case "uploading":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const pendingFiles = files.filter((f) => f.status === "pending");

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Files to Upload ({files.length})</CardTitle>
          <CardDescription>
            Review and upload your selected files
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={onUploadAll}
            disabled={pendingFiles.length === 0}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload All ({pendingFiles.length})
          </Button>
          <Button variant="outline" onClick={onClearAll}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {files.map((uploadFile) => (
            <div
              key={uploadFile.id}
              className="flex items-center gap-3 p-3 border rounded-lg"
            >
              {getStatusIcon(uploadFile.status)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {uploadFile.file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(uploadFile.file.size)} •{" "}
                  {uploadFile.file.type || "Unknown type"}
                </p>
                {uploadFile.status === "uploading" && (
                  <Progress value={uploadFile.progress} className="mt-2 h-2" />
                )}
                {uploadFile.status === "error" && uploadFile.error && (
                  <Alert className="mt-2">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      {uploadFile.error}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="flex items-center gap-2">
                {uploadFile.status === "pending" && (
                  <Button size="sm" onClick={() => onUploadFile(uploadFile)}>
                    Upload
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onRemoveFile(uploadFile.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
