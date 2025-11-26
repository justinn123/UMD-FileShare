import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useDebounce } from "use-debounce";

type Course = {
  _id: string;
  name: string;
  title: string;
};

export default function CoursesIndex() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");

  // Only trigger API 300ms after user stops typing
  const [debouncedSearch] = useDebounce(search, 300);

  useEffect(() => {
    async function fetchCourses() {
      const res = await fetch(
        `http://localhost:5000/api/courses?limit=10&search=${debouncedSearch}`
      );
      const data = await res.json();
      setCourses(data);
    }

    fetchCourses();
  }, [debouncedSearch]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Courses</h1>

      <input
        type="text"
        placeholder="Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <div className="space-y-3">
        {courses.map((c) => (
          <Link
            to={`/courses/${c.name}`}
            key={c._id}
            className="block p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <h2 className="text-xl font-semibold">{c.name}</h2>
            <p className="text-gray-600">{c.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
