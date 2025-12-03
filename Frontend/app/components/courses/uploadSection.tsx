import { useState } from "react";
import Dropzone from "react-dropzone";
import type { Course, FileItem } from "~/types/course";


const maxFileSize = 20 * 1024 * 1024;
const apiURL = import.meta.env.VITE_API_URL;

export default function UploadSection({
  course,
  setCourse,
  loggedIn,
}: {
  course: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course | null>>;
  loggedIn: boolean;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleUpload() {
    if (!file || !course) return;

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    try {
      const res = await fetch(`${apiURL}/api/courses/${course.name}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const updatedFile: { success: boolean; file: FileItem } = await res.json();
      setCourse((prev) => {
        if (!prev) return prev;
        return { ...prev, files: [...(prev.files || []), updatedFile.file] };
      });

      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-2">Upload File</h3>
      <Dropzone
        disabled={!loggedIn}
        onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}
        multiple={false}
        maxFiles={1}
        maxSize={maxFileSize}
        onDropRejected={(rejections) => {
          if (rejections[0].errors[0].code === "file-too-large") {
            setFileError("File exceeds the 20 MB limit. Please upload a different file.");
          }
        }}
        onDragEnter={() => setFileError("")}
        onFileDialogOpen={() => {
          setFileError("");
          setFile(null);
        }}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <section className="w-full max-w-2xl">
            <div
              {...getRootProps()}
              className={`${!loggedIn && "hover:cursor-not-allowed"} p-10 text-lg border-2 border-dashed rounded-lg text-center cursor-pointer transition ${
                fileError
                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                  : isDragActive
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <input {...getInputProps()} />
              {!loggedIn && <p>Must be logged in to upload</p>}
              {loggedIn && (
                <p>
                  {isDragActive
                    ? "Drop the file here ..."
                    : file
                    ? `Selected file: ${file.name}`
                    : fileError
                    ? `${fileError}`
                    : "Drag and drop a file here, or click to select (20 MB max)"}
                </p>
              )}
            </div>
          </section>
        )}
      </Dropzone>

      <button
        onClick={handleUpload}
        disabled={!file || uploading || !loggedIn}
        className={`mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 ${
          !loggedIn && "hover:cursor-not-allowed"
        }`}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
