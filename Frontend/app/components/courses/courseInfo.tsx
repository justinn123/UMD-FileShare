import { useState, useEffect } from "react"
import { PinIcon } from "lucide-react";
import type { Course } from "~/types/course";

const apiURL = import.meta.env.VITE_API_URL;

function stripHTML(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export default function CourseInfo({ course }: { course: Course }) {
  const [pinned, setPinned] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).id : null;


  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  useEffect(() => {
    async function fetchPinnedStatus() {
      if (!userId || !course?._id) return;

      try {
        const res = await fetch(`${apiURL}/api/users/pinnedCourses`, {
          headers: {
            "Content-Type": "application/json",
            "x-user-id": userId,
          },
        });

        const data = await res.json();
        setPinned(data.pinnedCourses?.includes(course._id));
      } catch (err) {
        console.error("Failed to fetch pinned status", err);
      }
    }

    fetchPinnedStatus();
  }, [userId, course?._id]);



  const handlePinToggle = async () => {
    if (!userId) {
      alert("You must be logged in");
      return;
    }

    try {
      const method = pinned ? "DELETE" : "POST";

      const res = await fetch(`${apiURL}/api/users/pinnedCourses/${course._id}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
      });

      if (!res.ok) throw new Error("Failed to update pin");

      setPinned(!pinned);
    } catch (err) {
      console.error(err);
      alert("Failed to update pinned courses");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold">{course.name}</h1>
        <button
          onClick={handlePinToggle}
          disabled={!loggedIn}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          title={pinned ? "Unpin Course" : "Pin Course"}
        >
          <PinIcon className={`h-5 w-5 transition-all ${pinned ? "text-yellow-500" : "text-gray-500"
            }`} />
        </button>
      </div>

      {course.title && <h2 className="text-xl text-gray-600">{course.title}</h2>}
      {course.description && <p className="mt-4">{stripHTML(course.description)}</p>}
    </div>
  );
}
