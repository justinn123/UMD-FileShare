import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router'
import DesktopMenu from './desktopMenu';
import HamburgerBtn from './hamburgerBtn';
import MobileMenu from './mobileMenu';


export default function Navbar() {
  const location = useLocation();
  const loggedIn = location.pathname !== '/';

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-700 py-4 px-6 flex items-center justify-between">
      <Link to='/'><h1 className="text-2xl font-bold">UMD FileShare</h1></Link>

      {/* Desktop Buttons */}
      <DesktopMenu loggedIn={loggedIn}/>

      <div ref={menuRef} className="md:hidden">
        {/* Hamburger Button */}
        <HamburgerBtn open={open} setOpen={setOpen} />

        {/* Mobile Dropdown */}
        <MobileMenu open={open} loggedIn={loggedIn}/>
      </div>
    </nav>
  );
}
