import AuthLayout from "../components/authLayout";
import AuthInput from "../components/authInput";
import type { Route } from "./+types/signup";
import { useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Login - FileShare" },
    { name: "description", content: "Log in to your FileShare account" },
  ];
}

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", confirmPassword: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { email: "", password: "", confirmPassword: "" };

    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== "")) return;
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors((prev) => ({ ...prev, email: data.message}));
        return;
      }

      console.log("Signup successful:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
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
          className="w-full font-semibold py-2 px-4 rounded-lg transition-colors 
            bg-gray-900 dark:bg-gray-100 hover:bg-black dark:hover:bg-gray-300 
            text-white dark:text-gray-900"
        >
          Sign Up
        </button>
      </form>
    </AuthLayout>
  );
}
