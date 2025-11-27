import type { Route } from "./+types/dashboard";
import { Link } from "react-router";
import { useState } from "react";
import { useEffect } from "react"
import { useNavigate } from "react-router";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Welcome to UMD FileShare Dashboard!" },
  ];
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id?: string; email?: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Token invalid");
        return res.json();
      })
      .then((data) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex-grow">
        <Navbar />

        <section className="px-6 py-16 text-center">
          <h2 className="text-3xl font-bold overflow-hidden text-ellipsis ">Welcome back, {user.email}</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            What would you like to do today?
          </p>
        </section>

        <section className="px-6 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Upload Files</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Upload slides, labs, notes, or assignments for your classes.
            </p>
          </div>

          <Link to="/courses">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow  hover:shadow-xl hover:scale-[1.02] hover:rotate-1 transition-all duration-300 ease-out cursor-pointer">

              <h3 className="text-xl font-semibold mb-2">Browse Classes</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Find uploaded materials by course and department.
              </p>
            </div>
          </Link>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">My Files</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Manage files you've uploaded.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
