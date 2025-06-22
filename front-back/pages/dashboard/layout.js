
// pages/dashboard/layout.js
'use client'; // Keep this if you use useState, useEffect, etc.

import Head from 'next/head'; // Import Head
import Sidebar from '@/components/dashboard/sidebar'
import Header from '@/components/dashboard/Header';
import { useState } from 'react';
import ThemeProviderWrapper from '@/components/ThemeProviderWrapper';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <> {/* Use a Fragment or a single root div if ThemeProviderWrapper isn't the root */}
      <Head>
        <title>CleverlyEDU - Dashboard</title>
        <meta name="description" content="Your AI-powered learning dashboard." />
        {/* Add any other meta tags you need for the dashboard section */}
      </Head>
      <ThemeProviderWrapper>
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900/95 overflow-hidden transition-colors duration-300">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header toggleSidebar={toggleSidebar} />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
              {children}
            </main>
            <footer className="px-4 py-2 text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 transition-colors duration-300">
              © {new Date().getFullYear()} CleverlyEDU - Your Magical Learning Assistant
            </footer>
          </div>
        </div>
      </ThemeProviderWrapper>
    </>
  );
}