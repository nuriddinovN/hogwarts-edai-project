// components/dashboard/Sidebar.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // useRouter is for programmatic navigation
import { Wand2, LayoutDashboard, FileText, UploadCloud, ListChecks, Sparkles, Globe } from 'lucide-react'; // Removed Sun, Moon
import { motion } from 'framer-motion';
import ThemeToggleButton from '@/components/ThemeToggleButton'; // Import the button

// ... (navItems array remains the same)
const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/ai-summarizer', label: 'AI-Summarizer', icon: FileText },
  { href: '/dashboard/recent-uploads', label: 'Recent uploads', icon: UploadCloud },
  { href: '/dashboard/created-quizzes', label: 'Created quizzes', icon: ListChecks },
  { href: '/dashboard/created-flashcards', label: 'Created flashcards', icon: Sparkles },
];


const Sidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 260, damping: 25 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 260, damping: 25 } },
  };

  // itemVariants for staggering if needed, but not strictly necessary if Sidebar itself doesn't stagger children
  // const itemVariants = { ... };

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.aside
        variants={sidebarVariants}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className={`fixed inset-y-0 left-0 z-40 flex h-full w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 md:static md:inset-0 md:translate-x-0 transform transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-xl font-semibold group">
            <motion.div
              className="bg-indigo-600 p-2 rounded-lg text-white"
              whileHover={{ rotate: 15, scale: 1.1 }}
            >
              <Wand2 size={24} />
            </motion.div>
            <span className="text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">CleverlyEDU</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-4 overflow-y-auto custom-scrollbar"> {/* Added custom-scrollbar */}
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard');
            if (item.href === '/dashboard' && pathname !== '/dashboard') {
                // More precise check for dashboard itself
                // isActive = false; // This logic might need adjustment based on exact routes
            }
            return (
              <Link key={item.label} href={item.href} passHref legacyBehavior>
                <motion.a
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all text-sm
                    ${isActive
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-700/30 dark:text-indigo-300 font-medium shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50'
                    }`}
                  whileHover={{ x: isActive ? 0 : 3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? '' : 'group-hover:text-gray-700 dark:group-hover:text-gray-200'}`} />
                  {item.label}
                </motion.a>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-gray-200 dark:border-gray-700 p-4 space-y-3">
          <div className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center gap-2">
              <ThemeToggleButton className="!p-0" /> {/* Use the dedicated button, remove padding if needed */}
              <span className="ml-1">Theme</span>
            </div>
            <Sparkles className="h-5 w-5 text-yellow-400 dark:text-yellow-300" />
          </div>

          <div className="flex items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Globe size={18}/>
              <span>Language</span>
            </div>
            <div className="flex space-x-1">
              <button className="px-2 py-0.5 text-xs rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-700/30 dark:text-indigo-300">UZ</button>
              <button className="px-2 py-0.5 text-xs rounded hover:bg-gray-100 dark:hover:bg-gray-700">EN</button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;