import AuthLayout from "../components/authLayout";
import AuthInput from "../components/authInput";
import type { Route } from "./+types/login";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - FileShare" },
    { name: "description", content: "Log in to your FileShare account" },
  ];
}


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { email: "", password: "" };

    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email.";
    if (!password) newErrors.password = "Password is required.";

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== "")) return;
    console.log("Login successful:", { email, password });
  };

  return (
    <AuthLayout
      title="Login"
      subtitle="Welcome back! Log in to your account"
      footerText="Don't have an account?"
      footerLink="/signup"
      footerLinkText="Sign up"
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
        <button
          type="submit"
          className="w-full font-semibold py-2 px-4 rounded-lg transition-colors 
            bg-gray-900 dark:bg-gray-100 hover:bg-black dark:hover:bg-gray-300 
            text-white dark:text-gray-900"
        >
          Log In
        </button>
      </form>
    </AuthLayout>
  );
}
