// components/ThemeProviderWrapper.js
'use client';

import { ThemeProvider } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemeProviderWrapper({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // To prevent hydration mismatch, you can return null or a basic loader
    // or just children to avoid FOUC if theme-dependent UI is minimal initially
    return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}