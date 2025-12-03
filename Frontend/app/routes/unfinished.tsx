import { Link } from "react-router";

export default function UnfinishedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-center text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold">Under Construction</h1>
      <p className="mt-2 text-gray-600">The page you're looking for is currently under construction.</p>
      <Link to="/" className="text-blue-600 underline">Go home</Link>
    </div>
  );
}