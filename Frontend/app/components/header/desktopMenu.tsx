export default function DesktopMenu() {
  return (
    <div className="hidden md:flex space-x-4">
      <a
        href="/courses"
        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
      >
        Find Course
      </a>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
