import {Link} from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-2 text-gray-600">The page you're looking for does not exist.</p>
      <Link to="/" className="text-blue-600 underline">Go home</Link>
    </div>
  );
}
