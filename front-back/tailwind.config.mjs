// tailwind.config.mjs

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Adjust if you're using 'app' directory
    "./app/**/*.{js,ts,jsx,tsx,mdx}",   // Add this line if you use the app router
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
      // You can add other theme extensions here:
      // colors: {},
      // spacing: {},
      // ...
    },
  },
  plugins: [],
};

export default config; // Use ES Module export