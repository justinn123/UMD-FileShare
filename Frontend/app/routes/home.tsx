import type { Route } from "./+types/home";
import {Link} from "react-router"
import HomeFeatures from "~/components/homeFeatures";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Footer from "~/components/footer";

const apiURL = import.meta.env.VITE_API_URL;

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${apiURL}/api/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch(() => {
        localStorage.removeItem("token");
      });
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex-grow">
        {/* NAVBAR */}
        <nav className="w-full border-b border-gray-200 dark:border-gray-700 py-4 px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">UMD FileShare</h1>

          <div className="space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                       hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 
                       text-white transition"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="px-6 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Share Class Files Easily
          </h2>

          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            Upload, share, and browse course materials for UMD classes — all in one
            clean and powerful platform built for students.
          </p>

          <Link
            to="/signup"
            className="px-8 py-3 text-lg rounded-lg bg-red-500 hover:bg-red-600 
                     text-white transition"
          >
            Get Started
          </Link>
        </section>

        {/* FEATURES */}
        <section className="px-6 py-16 bg-gray-100 dark:bg-gray-800">
          <h3 className="text-3xl font-bold text-center mb-12">Why UMD FileShare?</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">

            {/* Feature 1 */}
            <HomeFeatures
              home={true}
              title="Fast Uploads"
              description="Upload notes, slides, labs, and past assignments quickly with an intuitive UI."
            />
            {/* Feature 2 */}
            <HomeFeatures
              home={true}
              title="Course-Organized"
              description="Every file is organized by class so students can find exactly what they need."
            />

            {/* Feature 3 */}
            <HomeFeatures
              home={true}
              title="Community Driven"
              description="Students support each other by sharing materials that help everyone succeed."
            />
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="px-6 py-20 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to share files?</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Create an account and start contributing.
          </p>

          <a
            href="/signup"
            className="px-8 py-3 text-lg rounded-lg bg-red-500 hover:bg-red-600 
                     text-white transition"
          >
            Join Now
          </a>
        </section>
      </div>
      <Footer />
    </div>
  );
};