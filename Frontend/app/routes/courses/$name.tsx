import { useParams } from "react-router";
import { useEffect, useState } from "react";

type Course = {
  _id: string;
  name: string;
  title?: string;
  description?: string;
};

export default function CoursePage() {
  const { name } = useParams<{ name: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!name) return;

    async function fetchCourse() {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${encodeURIComponent(name || "")}`);
        if (!res.ok) throw new Error("Course not found");
        const data: Course = await res.json();
        setCourse(data);
      } catch {
        setError(true);
      }
    }

    fetchCourse();
  }, [name]);

  if (error) return <p className="text-red-500">Course not found</p>;
  if (!course) return <p>Loading course...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{course.name}</h1>
      {course.title && <h2 className="text-xl text-gray-600">{course.title}</h2>}
      {course.description && <p className="mt-4">{course.description}</p>}
    </div>
  );
}
