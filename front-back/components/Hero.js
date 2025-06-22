'use client'; // Needed for useState, useEffect, and Framer Motion

import Link from 'next/link';
import { LogIn, UserPlus, Menu, X } from 'lucide-react'; // Added Menu and X icons
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const [isScrolled, setIsScrolled] = useState(false); // State for scrolled navbar appearance

  // Handle scroll effect for navbar background/shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    // Call handler once on mount to set initial state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '#features', label: 'Features' },
    { href: '#Demo', label: 'How It Works' },
    { href: '#feedback', label: 'Feedbacks' },
  ];

  const linkMotionProps = {
    whileHover: { y: -2, color: "#4F46E5" /* indigo-600 */ },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 300, damping: 20 }
  };

  const buttonMotionProps = {
    whileHover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(79, 70, 229, 0.2)" /* Indigo shadow */ },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, y: "-100%" },
    open: { opacity: 1, y: "0%", transition: { type: "spring", stiffness: 260, damping: 25, when: "beforeChildren", staggerChildren: 0.05 } }
  };

  const mobileLinkVariants = {
    closed: { opacity: 0, x: -30 },
    open: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 20 }}
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-colors duration-300 ease-in-out 
                  ${isScrolled || isOpen ? 'bg-white/95 shadow-lg backdrop-blur-md' : 'bg-transparent shadow-none'}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group" aria-label="Cleverly.EDU Home">
            <motion.div // For the "C" character
              className="bg-indigo-600 text-white text-2xl font-bold p-2.5 rounded-lg"
              whileHover={{
                scale: 1.15,
                rotate: [0, 10, -10, 5, -5, 0] // Multi-stage rotation
              }}
              transition={{
                // Define different transitions for different properties
                scale: { type: "spring", stiffness: 300, damping: 15 },
                rotate: { duration: 0.7, ease: "easeInOut" } // Use a tween for multi-keyframe rotation
              }}
            >
              C
            </motion.div>
            <div className="ml-0"> {/* Adjusted margin, space-x on Link should handle it */}
              <span className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                Cleverly.EDU
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((link) => (
              <Link href={link.href} key={link.href} passHref legacyBehavior>
                <motion.a
                  className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                  {...linkMotionProps}
                >
                  {link.label}
                </motion.a>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/login" passHref legacyBehavior>
              <motion.a
                className="text-indigo-600 hover:text-white border border-indigo-600 hover:bg-indigo-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200"
                {...buttonMotionProps}
              >
                <LogIn size={16} />
                <span>Log In</span>
              </motion.a>
            </Link>
            <Link href="/signup" passHref legacyBehavior>
              <motion.a
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 shadow-md hover:shadow-lg transition-all duration-200"
                {...buttonMotionProps}
              >
                <UserPlus size={16} />
                <span>Sign Up</span>
              </motion.a>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
              aria-expanded={isOpen}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={isOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl pb-6 border-t border-gray-200 overflow-y-auto max-h-[calc(100vh-5rem)]" // 5rem is h-20
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="px-4 pt-4 space-y-2"> {/* Reduced space-y */}
              {navLinks.map((link) => (
                <Link href={link.href} key={link.href} passHref legacyBehavior>
                  <motion.a
                    className="block text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-3 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                    variants={mobileLinkVariants}
                  >
                    {link.label}
                  </motion.a>
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-100 space-y-3 mt-3"> {/* Added mt-3 */}
                <Link href="/login" passHref legacyBehavior>
                  <motion.a
                    className="w-full text-center text-indigo-600 border border-indigo-600 hover:bg-indigo-50 px-4 py-3 rounded-lg text-base font-medium flex items-center justify-center space-x-2 transition-colors"
                    onClick={() => setIsOpen(false)}
                    variants={mobileLinkVariants}
                  >
                    <LogIn size={18} />
                    <span>Log In</span>
                  </motion.a>
                </Link>
                <Link href="/signup" passHref legacyBehavior>
                  <motion.a
                    className="w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg text-base font-medium flex items-center justify-center space-x-2 shadow-md transition-colors"
                    onClick={() => setIsOpen(false)}
                    variants={mobileLinkVariants}
                  >
                    <UserPlus size={18} />
                    <span>Sign Up</span>
                  </motion.a>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;