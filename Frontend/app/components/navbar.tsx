import { useState } from 'react';
import DesktopMenu from './desktopMenu';
import HamburgerBtn from './hamburgerBtn';
import MobileMenu from './mobileMenu';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-700 py-4 px-6 flex items-center justify-between">
      <a href='/'><h1 className="text-2xl font-bold">UMD FileShare</h1></a>

      {/* Desktop Buttons */}
      <DesktopMenu />

      {/* Hamburger Button */}
      <HamburgerBtn open={open} setOpen={setOpen} />
      
      {/* Mobile Dropdown */}
      <MobileMenu open={open} />
    </nav>
  );
}
