export type UploadStatus =
  | "pending"
  | "uploading"
  | "success"
  | "error"
  | "deleting";

export type UploadFile = {
  id: string;
  file: File;
  status: UploadStatus;
  progress: number;
  error?: string;
};
