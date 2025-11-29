type mobileMenuProps = {
  open: (boolean);
}

export default function MobileMenu({ open }: mobileMenuProps) {
  return (
    <div
      className={`
          md:hidden absolute top-16 right-6 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg 
          overflow-hidden transform origin-top transition-all duration-200
          ${open ? "scale-100 opacity-100" : "scale-0 opacity-0"}
        `}
    >
      <a
        href="/courses"
        className="block px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Find Course
      </a>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
        className="w-full text-left px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Logout
      </button>
    </div>
  );
}
