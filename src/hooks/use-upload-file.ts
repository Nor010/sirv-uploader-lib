"use client";

import { useState, useCallback } from "react";
import { UploadFile } from "../types/upload";
import { uploadToSirvWithProgress, deleteFromSirv } from "../lib/sirv-upload";

interface UseFileUploadParams {
  uploadPath: string;
  clientId: string;
  clientSecret: string;
}

export function useFileUpload({
  uploadPath,
  clientId,
  clientSecret,
}: UseFileUploadParams) {
  const [files, setFiles] = useState<UploadFile[]>([]);

  const addFiles = useCallback((newFiles: File[]) => {
    const uploadFiles: UploadFile[] = newFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      status: "pending",
      progress: 0,
    }));
    setFiles((prev) => [...prev, ...uploadFiles]);
  }, []);

  const uploadFile = useCallback(
    async (uploadFile: UploadFile) => {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id
            ? { ...f, status: "uploading", progress: 0 }
            : f
        )
      );

      try {
        await uploadToSirvWithProgress(
          uploadFile.file,
          uploadPath,
          (progress) => {
            setFiles((prev) =>
              prev.map((f) => (f.id === uploadFile.id ? { ...f, progress } : f))
            );
          },
          clientId,
          clientSecret
        );

        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? { ...f, status: "success", progress: 100 }
              : f
          )
        );
      } catch (error) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? {
                  ...f,
                  status: "error",
                  error:
                    error instanceof Error ? error.message : "Upload failed",
                }
              : f
          )
        );
      }
    },
    [uploadPath, clientId, clientSecret]
  );

  const uploadAllFiles = useCallback(() => {
    files.filter((f) => f.status === "pending").forEach(uploadFile);
  }, [files, uploadFile]);

  const removeFile = useCallback(
    async (id: string) => {
      const target = files.find((f) => f.id === id);
      if (!target) return;

      if (target.status !== "success") {
        setFiles((prev) => prev.filter((f) => f.id !== id));
        return;
      }

      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status: "deleting" } : f))
      );

      try {
        await deleteFromSirv(
          uploadPath,
          target.file.name,
          clientId,
          clientSecret
        );
        setFiles((prev) => prev.filter((f) => f.id !== id));
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Delete failed";
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, status: "error", error: msg } : f
          )
        );
      }
    },
    [files, uploadPath, clientId, clientSecret]
  );

  const clearAllFiles = useCallback(() => {
    setFiles([]);
  }, []);

  return {
    files,
    addFiles,
    uploadFile,
    uploadAllFiles,
    removeFile,
    clearAllFiles,
  };
}
