// components/ThemeToggleButton.js
'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react'; // Removed MonitorSmartphone for simplicity here
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggleButton = ({ className }) => { // Added className prop
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className={`p-2 rounded-full ${className || ''}`}
        disabled
      >
        <div className="w-6 h-6 animate-pulse bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </button>
    );
  }

  const cycleTheme = () => {
    // Simplified cycle: light -> dark -> system (if enabled) -> light
    // Or just light <-> dark if system theme is not a primary user choice
    if (resolvedTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  const iconVariants = {
    initial: { opacity: 0, rotate: -90, scale: 0.8 },
    animate: { opacity: 1, rotate: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 15 } },
    exit: { opacity: 0, rotate: 90, scale: 0.8, transition: { duration: 0.15 } },
  };

  const currentIcon = resolvedTheme === 'dark' ? <Moon size={22} /> : <Sun size={22} />;
  const buttonLabel = resolvedTheme === 'dark' ? "Switch to light theme" : "Switch to dark theme";


  return (
    <button
      onClick={cycleTheme}
      aria-label={buttonLabel}
      className={`p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 transition-colors ${className || ''}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedTheme} // Key change triggers animation
          variants={iconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {currentIcon}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggleButton;