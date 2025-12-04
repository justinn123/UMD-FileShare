import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { optionalUser } from "~/utils/auth";
import toast from "react-hot-toast";
import Navbar from "~/components/header/navbar";
import Footer from "~/components/footer";
import CourseInfo from "~/components/courses/courseInfo";
import UploadSection from "~/components/courses/uploadSection";
import FilesSection from "~/components/courses/filesSection";

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

const apiURL = import.meta.env.VITE_API_URL;

export default function CoursePage() {
  const { name } = useParams<{ name: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    optionalUser().then(({ user }) => {
      if (!user) {
        toast.custom((t) => (
          <div
            className="flex items-center justify-between space-x-4 p-4 rounded-lg border
               bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
          >
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Sign in to <b>upload files</b>
            </span>
            <button
              className="ml-4 text-xs font-semibold text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
              onClick={() => toast.dismiss(t.id)}
            >
              Dismiss
            </button>
          </div>
        ));
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    });
  }, []);


  useEffect(() => {
    if (!name) return;
    document.title = `${name}`;

    async function fetchCourse() {
      try {
        const res = await fetch(
          `${apiURL}/api/courses/${encodeURIComponent(name || "")}`
        );

        if (res.status === 404) {
          setError("not-found");
          return;
        }

        if (!res.ok) {
          setError("api-failure");
          return;
        }

        const data: Course = await res.json();
        setCourse(data);
        setError("");
        document.title = `${data.name} - UMD FileShare`;
      } catch {
        setError("api-failure");
      }
    }

    fetchCourse();
  }, [name]);

  if (error === "not-found") return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold">Course Not Found</h1>
      <p className="mt-2 text-gray-600">The course you're looking for does not exist.</p>
      <a href="/courses" className="text-blue-600 underline">Back to courses</a>
    </div>
  );

  if (error === "api-failure") return <p className="text-red-500">Server Error. Please try again later.</p>;
  if (!course) return <p>Loading course...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="flex-grow p-6 space-y-6">
        <CourseInfo course={course} />
        <UploadSection course={course} setCourse={setCourse} loggedIn={loggedIn} />
        <FilesSection files={course.files || []} />
      </div>
      <Footer />
    </div>
  );
}
