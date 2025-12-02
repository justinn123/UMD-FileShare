import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import Navbar from "~/components/header/navbar";
import Footer from "~/components/footer";

// --------------------
// Types
// --------------------
type FileItem = {
  _id: string;
  filename: string;
  url: string;
  fileType: "image" | "video" | "document" | "other";
  uploadedBy?: string;
};

type Course = {
  _id: string;
  name: string;
  title?: string;
  description?: string;
  files?: FileItem[];
};

const maxFileSize = 20 * 1024 * 1024
const apiURL = import.meta.env.VITE_API_URL;

// --------------------
// Component
// --------------------
export default function CoursePage() {
  const { name } = useParams<{ name: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState("")
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // --------------------
  // Fetch course
  // --------------------

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (!name) return;

    async function fetchCourse() {
      try {
        const res = await fetch(
          `${apiURL}/api/courses/${encodeURIComponent(name || "")}`
        );

        if (res.status === 404) {
          // Course does not exist
          setError("not-found");
          return;
        }

        if (!res.ok) {
          // Some other server or network error
          setError("api-failure");
          return;
        }

        const data: Course = await res.json();
        setCourse(data);
        setError(""); // clear previous errors
      } catch {
        // Network error or other unexpected errors
        setError("api-failure");
      }
    }


    fetchCourse();
  }, [name]);

  // --------------------
  // Upload handler
  // --------------------
  async function handleUpload() {
    if (!file || !course) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    try {
      const res = await fetch(
        `${apiURL}/api/courses/${course.name}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const updatedFile: { success: boolean; file: FileItem } = await res.json();

      // Update course state to include new file
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

  if (error === "not-found") return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold">Course Not Found</h1>
      <p className="mt-2 text-gray-600">The course you're looking for does not exist.</p>
      <Link to="/courses" className="text-blue-600 underline">Back to courses</Link>
    </div>
  );
  if (error === "api-failure") return <p className="text-red-500">Server Error. Please try again later.</p>;

  if (!course) return <p>Loading course...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="flex-grow p-6 space-y-6">
        {/* Course Info */}
        <div>
          <h1 className="text-3xl font-bold">{course.name}</h1>
          {course.title && (
            <h2 className="text-xl text-gray-600">{course.title}</h2>
          )}
          {course.description && <p className="mt-4">{course.description}</p>}
        </div>

        {/* Upload Section */}
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
            onFileDialogOpen={() => {setFileError(""); setFile(null)}}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <section className="w-full max-w-2xl">
                <div
                  {...getRootProps()}
                  className={`p-10 text-lg border-2 border-dashed rounded-lg text-center cursor-pointer transition
                    ${fileError
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : isDragActive
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-300 dark:border-gray-600"
                    }`}

                >
                  <input {...getInputProps()} />
                  {!loggedIn && (<p>Must be logged in to upload</p>)}
                  {loggedIn && (<p>
                    {isDragActive
                      ? "Drop the file here ..."
                      : file
                        ? `Selected file: ${file.name}`
                        : fileError ? `${fileError}` 
                        : "Drag and drop a file here, or click to select (20 MB max)"}
                  </p>)}
                </div>
              </section>
            )}
          </Dropzone>

          <button
            onClick={handleUpload}
            disabled={!file || uploading || !loggedIn}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {/* Files Section */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Uploaded Files</h3>

          {course.files && course.files.length > 0 ? (
            <ul className="list-disc pl-6 space-y-1">
              {course.files.map((file) => (
                <li key={file._id}>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {file.filename}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No files uploaded yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
