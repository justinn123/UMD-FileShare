export type FileItem = {
  _id: string;
  filename: string;
  url: string;
  fileType: "image" | "video" | "document" | "other";
  uploadedBy?: string;
};

export type Course = {
  _id: string;
  name: string;
  title?: string;
  description?: string;
  files?: FileItem[];
};