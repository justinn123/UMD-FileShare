import { useEffect, useState } from "react";
import { Link } from "react-router";
import Navbar from "~/components/header/navbar";
import { useDebounce } from "use-debounce";
import Footer from "~/components/footer";

type Course = {
  _id: string;
  name: string;
  title: string;
};

const apiURL = import.meta.env.VITE_API_URL;

export function meta({ }) {
  return [
    { title: "Courses - UMD FileShare" },
    { name: "description", content: "Welcome to UMD FileShare Dashboard!" },
  ];
}

export default function CoursesIndex() {
  const [loading, setLoading] = useState(true);
  const [apiFailed, setApiFailed] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchSavedCourses() {
      const storedUser = localStorage.getItem("user");
      const userId = storedUser ? JSON.parse(storedUser).id : null;

      if (!userId) {
        setApiFailed(true);
        setLoading(false);
        return;
      }

      try {
        // 1. Get pinned course IDs
        const pinnedRes = await fetch(`${apiURL}/api/users/pinnedCourses`, {
          headers: {
            "x-user-id": userId,
          },
        });

        const pinnedData = await pinnedRes.json();

        if (!pinnedRes.ok) {
          setApiFailed(true);
          return;
        }

        const ids: string[] = pinnedData.pinnedCourses;

        if (ids.length === 0) {
          setCourses([]);
          return;
        }

        // 2. Fetch course details
        const courseRes = await fetch(
          `${apiURL}/api/courses/byIds`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids }),
          }
        );

        const courseData = await courseRes.json();
        setCourses(courseData);
      } catch (err) {
        setApiFailed(true);
      } finally {
        setLoading(false);
      }
    }

    fetchSavedCourses();
  }, []);


  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />

      <main className="flex-grow px-6 py-10">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-10">
          Your Saved Courses
        </h1>

        <div className="max-w-3xl mx-auto w-full">
          {/* Results */}
          <div className="space-y-4">
            {loading && (
              <p className="text-center text-gray-500 text-lg animate-pulse">Loading...</p>
            )}

            {apiFailed && !loading && (
              <p className="text-center text-red-500 text-lg">Server Error. Please try again later.</p>
            )}

            {!loading && !apiFailed && (courses.length === 0 ? (
              <div className="flex flex-col items-center space-y-6">
                <p className="text-center text-gray-500 text-lg">
                  You don't have any saved courses.
                </p>
                <Link
                  to="/courses"
                  className="px-5 py-3 text-lg rounded-lg bg-red-500 hover:bg-red-600 
                     text-white transition"
                >
                  Browse Courses
                </Link>
              </div>
            ) : (
              courses.map((c) => (
                <Link
                  to={`/courses/${c.name}`}
                  key={c._id}
                  className="
                block p-2 rounded-xl border
                bg-white dark:bg-gray-800
                shadow-sm hover:shadow-md transition
                hover:bg-gray-50 dark:hover:bg-gray-700
              "
                >
                  <h2 className="text-xl font-semibold">{c.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {c.title}
                  </p>
                </Link>
              ))
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
