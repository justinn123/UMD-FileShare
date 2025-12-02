import AuthLayout from "../components/auth/authLayout";
import AuthInput from "../components/auth/authInput";
import type { Route } from "./+types/login";
import { useState } from "react";
import Footer from "~/components/footer";
import { redirect } from "react-router";
import Navbar from "~/components/header/navbar";

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

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { identifier: "", password: "" };

    if (!identifier.trim()) newErrors.identifier = "Identifier is required.";
    if (!password) newErrors.password = "Password is required.";

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== "")) return;

    setLoading(true);

    try {
      const res = await fetch(`${apiURL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password })
      });
      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        setErrors({ ...errors, password: data.message || "Login failed. Please try again." });
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login error:", err);
      setLoading(false);
      setErrors({ ...errors, password: "Server Error. Please try again later." });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow items-center justify-center flex">
        <AuthLayout
          title="Login"
          subtitle="Welcome back! Log in to your account"
          footerText="Don't have an account?"
          footerLink="/signup"
          footerLinkText="Sign up"
        >
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <AuthInput
              type="identifier"
              placeholder="Email or Username"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (errors.identifier) setErrors({ ...errors, identifier: "" });
              }}
              error={errors.identifier}
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
                "Log In"
              )}
            </button>
          </form>
        </AuthLayout>
      </div>
      <Footer />
    </div>
  );
}
