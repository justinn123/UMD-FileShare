import AuthLayout from "../components/auth/authLayout";
import AuthInput from "../components/auth/authInput";
import Footer from "~/components/footer";
import type { Route } from "./+types/signup";
import { useState } from "react";
import Navbar from "~/components/header/navbar";
import { redirect } from "react-router";

const apiURL = import.meta.env.VITE_API_URL;

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Login - FileShare" },
    { name: "description", content: "Log in to your FileShare account" },
  ];
}

export const clientLoader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return redirect("/dashboard");
  }
  return null;
}

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", username: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { email: "", username: "", password: "", confirmPassword: "" };

    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email.";
    if (!username) newErrors.username = "Username is required.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== "")) return;

    setLoading(true);
    try {
      const res = await fetch(`${apiURL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        if (data.message === "Email already being used")
        setErrors((prev) => ({ ...prev, email: data.message }));

        if (data.message === "Username already taken")
          setErrors((prev) => ({...prev, username: data.message}))
        return;
      }

      console.log("Signup successful:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/dashboard";
    } catch (error) {
      setLoading(false);
      console.error("Signup failed:", error);
      setErrors({ ...errors, confirmPassword: "Server Error. Please try again later." });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar/>
      <div className="flex flex-grow items-center justify-center pt-15 pb-10">
        <AuthLayout
          title="Sign Up"
          subtitle="Create a new account to get started"
          footerText="Already have an account?"
          footerLink="/login"
          footerLinkText="Log in"
        >
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <AuthInput
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              error={errors.email}
            />
            <AuthInput
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) setErrors({...errors, username: ""});
              }}
              error={errors.username}
            />
            <AuthInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
              error={errors.password}
            />
            <AuthInput
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" });
              }}
              error={errors.confirmPassword}
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full font-semibold py-2 px-4 rounded-lg transition-colors 
                          bg-gray-900 dark:bg-gray-100 hover:bg-black dark:hover:bg-gray-300 
                          text-white dark:text-gray-900 flex items-center justify-center`}
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white dark:border-gray-900 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </AuthLayout>
      </div>
      <Footer/>
    </div>
  );
}
