import type { Route } from "./+types/dashboard";
import { Link } from "react-router";
import { useState } from "react";
import { useEffect } from "react"
import { useNavigate } from "react-router";
import Footer from "~/components/footer";
import Navbar from "~/components/header/navbar";
import HomeFeatures from "~/components/homeFeatures";

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
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            What would you like to do today?
          </p>
        </section>

        <section className="px-6 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <HomeFeatures
            home={false}
            title="Saved Courses"
            description="Browse slides, labs, notes, or assignments for your classes."
          />
          <Link to="/courses">
            <HomeFeatures
              home={false}
              title="Browse Classes"
              description="Find uploaded materials by course and department."
            />
          </Link>
          <HomeFeatures
            home={false}
            title="My Files"
            description="Manage all the files you've uploaded."
          />
        </section>
      </div>
      <Footer />
    </div>
  );
}
