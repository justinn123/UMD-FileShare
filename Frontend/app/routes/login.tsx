import type { Route } from "./+types/login";
import { useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Login - FileShare" },
    { name: "description", content: "Login to your FileShare account" },
  ];
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Sign In</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Enter your email and password to access your account
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100 caret-black dark:caret-white"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100 caret-black dark:caret-white"
            required
          />
          <button className="w-full bg-gray-900 dark:bg-gray-100 hover:bg-black dark:hover:bg-gray-300 text-white dark:text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors">
            Login
          </button>
        </form>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
          Don't have an account? <a href="/signup" className="underline text-gray-700 dark:text-gray-200">Sign up</a>
        </p>
      </div>
    </div>
  );
}
