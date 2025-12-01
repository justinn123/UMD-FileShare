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

export default function CoursesIndex() {
  const [loading, setLoading] = useState(true);
  const [apiFailed, setApiFailed] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");

  // Only trigger API 300ms after user stops typing
  const [debouncedSearch] = useDebounce(search, 300);

  useEffect(() => {
    async function fetchCourses() {
      const query = debouncedSearch.trim();
      const url = query
        ? `${apiURL}/api/courses?limit=10&search=${query}`
        : `${apiURL}/api/courses?limit=10`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
          setApiFailed(true);
          return;
        }

        setCourses(data);
      } catch (err) {
        setApiFailed(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, [debouncedSearch]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />

      <main className="flex-grow px-6 py-10">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-10">
          Find Your Course
        </h1>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto w-full">
          <div className="relative mb-10">
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
            w-full px-4 py-3 rounded-xl border shadow-sm
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            dark:bg-gray-800 dark:border-gray-700
          "
            />
          </div>

          {/* Results */}
          <div className="space-y-4">
            {loading && (
              <p className="text-center text-gray-500 text-lg animate-pulse">Loading...</p>
            )}

            {apiFailed && !loading && (
              <p className="text-center text-red-500 text-lg">Server Error. Please try again later.</p>
            )}

            {!loading && !apiFailed && (courses.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">
                No courses found.
              </p>
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
