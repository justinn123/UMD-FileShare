import type { Route } from "./+types/signup";
import { useState, useEffect } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Signup - FileShare" },
    { name: "description", content: "Create your FileShare account" },
  ];
}

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Touched state
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Live validation for touched fields
  useEffect(() => {
    const newErrors = { email: "", password: "", confirmPassword: "" };

    // Email validation
    if (touched.email) {
      if (!email.trim()) {
        newErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Please enter a valid email.";
      }
    }

    // Password validation
    if (touched.password) {
      if (!password) {
        newErrors.password = "Password is required.";
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters.";
      }
    }

    // Confirm password validation
    if (touched.confirmPassword) {
      if (!confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password.";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }

    setErrors(newErrors);
  }, [email, password, confirmPassword, touched]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched to show errors if they exist
    setTouched({ email: true, password: true, confirmPassword: true });

    // Stop submission if there are errors
    if (errors.email || errors.password || errors.confirmPassword) return;

    console.log("Signup successful:", { email, password });
    // TODO: Add backend API call here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Sign Up
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Create a new account to get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched({ ...touched, email: true })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                ${errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 dark:border-gray-600 focus:ring-gray-400 dark:focus:ring-gray-500"}
                text-gray-900 dark:text-gray-100 bg-transparent caret-black dark:caret-white`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched({ ...touched, password: true })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                ${errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 dark:border-gray-600 focus:ring-gray-400 dark:focus:ring-gray-500"}
                text-gray-900 dark:text-gray-100 bg-transparent caret-black dark:caret-white`}
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => setTouched({ ...touched, confirmPassword: true })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                ${errors.confirmPassword
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 dark:border-gray-600 focus:ring-gray-400 dark:focus:ring-gray-500"}
                text-gray-900 dark:text-gray-100 bg-transparent caret-black dark:caret-white`}
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={Object.values(errors).some((err) => err !== "")}
            className={`w-full font-semibold py-2 px-4 rounded-lg transition-colors 
              ${Object.values(errors).some((err) => err !== "")
                ? "bg-gray-400 dark:bg-gray-600 text-gray-200 cursor-not-allowed"
                : "bg-gray-900 dark:bg-gray-100 hover:bg-black dark:hover:bg-gray-300 text-white dark:text-gray-900"}`}
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
