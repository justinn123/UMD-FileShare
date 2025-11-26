type HamburgerBtnProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function HamburgerBtn({open, setOpen}: HamburgerBtnProps) {
  return (
    <button
      className={!open ? `md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700` : `md:hidden p-2 rounded bg-gray-200 dark:bg-gray-700`}
      onClick={() => setOpen(!open)}
    >
      {/* Hamburger Icon */}
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
}