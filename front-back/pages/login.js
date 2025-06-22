'use client';

import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, Github, Wand2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Router, useRouter } from 'next/router';

// Simple Google G icon as SVG component (as defined before)
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.37 10H12V14.51H17.96C17.74 15.93 17.07 17.14 16.09 17.84V20.49H19.94C21.66 18.91 22.56 16.69 22.56 14.12V12.25Z" fill="#4285F4"/>
    <path d="M12 23C15.24 23 17.95 21.92 19.94 20.49L16.09 17.84C15.05 18.56 13.68 19.05 12 19.05C9.09 19.05 6.61 17.14 5.56 14.51H1.5V17.22C3.49 20.73 7.39 23 12 23Z" fill="#34A853"/>
    <path d="M5.56 14.51C5.33 13.76 5.18 12.91 5.18 12C5.18 11.09 5.33 10.24 5.56 9.49V6.78H1.5C0.55 8.64 0 10.28 0 12C0 13.72 0.55 15.36 1.5 17.22L5.56 14.51Z" fill="#FBBC05"/>
    <path d="M12 4.95C13.81 4.95 15.35 5.59 16.6 6.74L20.02 3.32C17.95 1.51 15.24 0.5 12 0.5C7.39 0.5 3.49 2.27 1.5 5.78L5.56 8.49C6.61 5.86 9.09 3.95 12 3.95V4.95L12 4.95Z" fill="#EA4335"/>
  </svg>
);


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const rout = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
    if(email == "admin@admin.com" && password == "123456789"){
        rout.push('/dashboard');
    }
    else{
        alert("wrong email")
    }
    
};

  const handleSocialLogin = (provider) => {
    console.log(`Attempting login with ${provider}`);
    // Add actual social login logic here
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const socialButtonHover = {
    scale: 1.05,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    transition: { type: "spring", stiffness: 300 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full bg-white shadow-2xl rounded-xl p-8 sm:p-10 space-y-6" // Reduced space-y slightly
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo and Title */}
        <motion.div className="text-center" variants={itemVariants}>
          <div className="inline-flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-3 sm:p-4 rounded-xl mb-3 sm:mb-4 shadow-lg">
            <Wand2 size={32} sm_size={40} className="text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">CleverlyEDU</h1>
          <p className="mt-1 text-xs sm:text-sm text-indigo-600">Education AI</p>
        </motion.div>

        <motion.h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-700" variants={itemVariants}>
          Welcome back, wizard!
        </motion.h2>

        <form className="space-y-6" onSubmit={handleSubmit}> {/* Removed mt-8 as parent has space-y */}
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email / Username
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

          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password"className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition-colors">
                  Forgot Password?
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow"
                placeholder="Enter your password"
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

          <motion.div variants={itemVariants}>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150 ease-in-out shadow-md hover:shadow-lg transform hover:scale-[1.02]" // Slightly less scale for main button
            >
              Log In
            </button>
          </motion.div>
        </form>

        {/* Divider "Or log in with" */}
        <motion.div className="relative" variants={itemVariants}>
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or log in with</span>
          </div>
        </motion.div>

        {/* Social Login Buttons */}
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

        {/* Sign Up Link */}
        <motion.p className="text-center text-sm text-gray-600" variants={itemVariants}>
          Don't have an account?{' '} {/* Using ' for apostrophe in JSX */}
          <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition-colors">
            Sign up
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginPage;