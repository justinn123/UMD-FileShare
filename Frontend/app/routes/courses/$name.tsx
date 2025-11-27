import { useParams } from "react-router";
import { useEffect, useState } from "react";

type Course = {
  _id: string;
  name: string;
  title?: string;
  description?: string;
  files?: string[]; // URLs or filenames (will match backend later)
};

export default function CoursePage() {
  const { name } = useParams<{ name: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Fetch course data (same as before)
  useEffect(() => {
    if (!name) return;

    async function fetchCourse() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/courses/${encodeURIComponent(name || "")}`
        );
        if (!res.ok) throw new Error("Course not found");
        const data: Course = await res.json();

        data.files = [
          "example1.pdf",
          "example2.docx",
          "example3.pptx",
        ]
        setCourse(data);
      } catch {
        setError(true);
      }
    }

    fetchCourse();
  }, [name]);

  // Handle file upload (frontend only — backend route coming next)
  async function handleUpload() {
    if (!file || !course) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/courses/${course._id}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const updatedCourse: Course = await res.json();
      setCourse(updatedCourse); // refresh file list
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  if (error) return <p className="text-red-500">Course not found</p>;
  if (!course) return <p>Loading course...</p>;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{course.name}</h1>
        {course.title && (
          <h2 className="text-xl text-gray-600">{course.title}</h2>
        )}
        {course.description && <p className="mt-4">{course.description}</p>}
      </div>

      {/* Upload Section */}
      <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
        <h3 className="text-xl font-semibold mb-2">Upload File</h3>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block mb-3"
        />

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Files Section */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Uploaded Files</h3>

        {course.files && course.files.length > 0 ? (
          <ul className="list-disc pl-6 space-y-1">
            {course.files.map((file, idx) => (
              <li key={idx}>
                <a
                  href={`http://localhost:5000/uploads/${file}`}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  {file}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No files uploaded yet.</p>
        )}
      </div>
    </div>
  );
}
