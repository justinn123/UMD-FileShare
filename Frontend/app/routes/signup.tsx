// Signup.tsx
import type { Route } from "./+types/signup";
import { useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Signup - FileShare" },
    { name: "description", content: "Login to your FileShare account" },
  ];
}

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Email:", email, "Password:", password);
    // Add your signup logic here (API call)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Sign Up</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Create a new account to get started
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100 caret-black dark:caret-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100 caret-black dark:caret-white"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100 caret-black dark:caret-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-gray-900 dark:bg-gray-100 hover:bg-black dark:hover:bg-gray-300 text-white dark:text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-500 dark:text-gray-200 mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="underline text-gray-700 dark:text-gray-400">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
