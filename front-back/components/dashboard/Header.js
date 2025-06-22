// components/dashboard/Header.js
'use client';

import { Search, Bell, ChevronDown, LogOut, UserCircle, Settings, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
// No useTheme needed here if toggle is in Sidebar

const Header = ({ toggleSidebar }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  const dropdownVariants = { /* ... remains same ... */ };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 md:px-6 border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 md:hidden transition-colors"
        aria-label="Toggle Sidebar"
      >
        <Menu size={24} />
      </button>

      <div className="flex flex-1 items-center gap-4 md:gap-6">
        <form className="relative flex-1 ml-auto sm:flex-initial max-w-xs sm:max-w-sm"> {/* Max width for search */}
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <input
            type="search"
            placeholder="Search content, quizzes..."
            className="w-full rounded-lg bg-gray-100 dark:bg-gray-700/60 pl-10 pr-4 py-2 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
          />
        </form>
      </div>

      <div className="relative" ref={menuRef}>
        <motion.button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" // Adjusted padding
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600">
            <Image src="/avatars/alex-russo.jpg" alt="Alex Russo" layout="fill" objectFit="cover" />
          </div>
          <div className="hidden sm:flex flex-col items-start leading-tight">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Alex Russo</span>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">Free</span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 hidden sm:block" />
        </motion.button>

        <AnimatePresence>
          {userMenuOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none py-1"
            >
              <Link href="/dashboard/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onClick={() => setUserMenuOpen(false)}>
                <UserCircle size={16} /> Profile
              </Link>
              <Link href="/dashboard/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onClick={() => setUserMenuOpen(false)}>
                <Settings size={16} /> Settings
              </Link>
              <hr className="my-1 border-gray-200 dark:border-gray-700"/>
              <button
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                onClick={() => { console.log('Logout'); setUserMenuOpen(false);}}
              >
                <LogOut size={16} /> Log Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;