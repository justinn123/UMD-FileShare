import type { Route } from "./+types/dashboard";
import { Link, redirect, useLoaderData } from "react-router";
import Footer from "~/components/footer";
import Navbar from "~/components/header/navbar";
import HomeFeatures from "~/components/homeFeatures";

const apiUrl = import.meta.env.VITE_API_URL;

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Welcome to UMD FileShare Dashboard!" },
  ];
}

export const clientLoader = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/login");
  }

  const cachedUser = localStorage.getItem("user");
  if (cachedUser) {
    return JSON.parse(cachedUser);
  }

  try {
    const res = await fetch(`${apiUrl}/api/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Token Invalid");
    const data = await res.json();
    return data.user;

  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return redirect("/login");
  }
};

export default function Dashboard() {
  const user = useLoaderData() as { id?: string; email?: string };
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
          <Link to="/unfinished">
            <HomeFeatures
              home={false}
              title="Saved Courses"
              description="Browse slides, labs, notes, or assignments for your classes."
            />
          </Link>
          <Link to="/courses">
            <HomeFeatures
              home={false}
              title="Browse Classes"
              description="Find uploaded materials by course and department."
            />
          </Link>
          <Link to="/unfinished">
            <HomeFeatures
              home={false}
              title="My Files"
              description="Manage all the files you've uploaded."
            />
          </Link>
        </section>
      </div>
      <Footer />
    </div>
  );
}
