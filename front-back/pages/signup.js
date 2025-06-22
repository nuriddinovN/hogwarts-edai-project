'use client';

import Link from 'next/link';
import { User, Mail, Lock, Eye, EyeOff, Github, Wand2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Simple Google G icon as SVG component (same as login page)
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.37 10H12V14.51H17.96C17.74 15.93 17.07 17.14 16.09 17.84V20.49H19.94C21.66 18.91 22.56 16.69 22.56 14.12V12.25Z" fill="#4285F4"/>
    <path d="M12 23C15.24 23 17.95 21.92 19.94 20.49L16.09 17.84C15.05 18.56 13.68 19.05 12 19.05C9.09 19.05 6.61 17.14 5.56 14.51H1.5V17.22C3.49 20.73 7.39 23 12 23Z" fill="#34A853"/>
    <path d="M5.56 14.51C5.33 13.76 5.18 12.91 5.18 12C5.18 11.09 5.33 10.24 5.56 9.49V6.78H1.5C0.55 8.64 0 10.28 0 12C0 13.72 0.55 15.36 1.5 17.22L5.56 14.51Z" fill="#FBBC05"/>
    <path d="M12 4.95C13.81 4.95 15.35 5.59 16.6 6.74L20.02 3.32C17.95 1.51 15.24 0.5 12 0.5C7.39 0.5 3.49 2.27 1.5 5.78L5.56 8.49C6.61 5.86 9.09 3.95 12 3.95V4.95L12 4.95Z" fill="#EA4335"/>
  </svg>
);

const SignUpPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Handle sign up logic here
    console.log('Sign up attempt with:', { fullName, email, password });
    // Example: API call, then router.push('/dashboard')
  };

  const handleSocialLogin = (provider) => {
    console.log(`Attempting sign up with ${provider}`);
    // Add actual social sign up logic here
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.08, // Slightly faster stagger for more fields
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const socialButtonHover = {
    scale: 1.05,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    transition: { type: "spring", stiffness: 300 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full bg-white shadow-2xl rounded-xl p-8 sm:p-10 space-y-6"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo and Title */}
        <motion.div className="text-center" variants={itemVariants}>
          <div className="inline-flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-3 sm:p-4 rounded-xl mb-3 sm:mb-4 shadow-lg">
            <Wand2 size={32} sm_size={40} className="text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-1 text-xs sm:text-sm text-indigo-600">Join CleverlyEDU</p>
        </motion.div>

        <motion.h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-700" variants={itemVariants}>
          Begin your magical journey!
        </motion.h2>

        <form className="space-y-5" onSubmit={handleSubmit}> {/* Adjusted space-y for more fields */}
          {/* Full Name Input */}
          <motion.div variants={itemVariants}>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow"
                placeholder="Enter your full name"
              />
            </div>
          </motion.div>

          {/* Email Input */}
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow"
                placeholder="Enter your email"
              />
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div variants={itemVariants}>
             <label htmlFor="password"className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow"
                placeholder="Create a password"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Confirm Password Input */}
          <motion.div variants={itemVariants}>
            <label htmlFor="confirmPassword"className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow"
                placeholder="Confirm your password"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </motion.div>


          <motion.div variants={itemVariants}>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150 ease-in-out shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            >
              Sign Up
            </button>
          </motion.div>
        </form>

        <motion.div className="relative" variants={itemVariants}>
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or sign up with</span>
          </div>
        </motion.div>

        <motion.div className="grid grid-cols-2 gap-3" variants={itemVariants}>
          <motion.button
            type="button"
            onClick={() => handleSocialLogin('Google')}
            className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            whileHover={socialButtonHover}
            whileTap={{ scale: 0.95 }}
          >
            <GoogleIcon />
            <span className="ml-2">Google</span>
          </motion.button>
          <motion.button
            type="button"
            onClick={() => handleSocialLogin('GitHub')}
            className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            whileHover={socialButtonHover}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} className="text-gray-800" />
            <span className="ml-2">GitHub</span>
          </motion.button>
        </motion.div>

        <motion.p className="text-center text-sm text-gray-600" variants={itemVariants}>
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition-colors">
            Log In
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignUpPage;