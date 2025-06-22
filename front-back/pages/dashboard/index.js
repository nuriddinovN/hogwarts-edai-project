// app/dashboard/page.js
"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import DashboardLayout from "./layout";
// ❌ REMOVE THIS IMPORT: import DashboardLayout from "./layout";

const cardItemsData = [ // Renamed to avoid conflict with map variable
  { name: "Total Uploads" },
  { name: "Quizzes Taken" },
  { name: "Flashcards Studied" },
  
];

const DashboardPage = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const generatedData = cardItemsData.map((item) => ({ // Use cardItemsData here
      name: item.name, // Access name property
      value: Math.floor(Math.random() * 100) + 10,
      detail: "Some detail about this metric",
    }));
    setCardData(generatedData);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  if (cardData.length === 0) {
    // This loading state will be wrapped by the layout automatically
    return (
      <div className="flex flex-col justify-center items-center h-full"> {/* Use h-full if inside layout */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white mb-6"
        >
          Dashboard Overview
        </motion.h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
          {cardItemsData.map((item, i) => ( // Use cardItemsData for placeholders
            <div
              key={item.name}
              className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg animate-pulse"
            >
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
              <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  
  return (
    <DashboardLayout>

    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.h1
        variants={cardVariants}
        custom={0}
        className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white mb-6"
      >
        Dashboard Overview
      </motion.h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cardData.map((item, i) => ( // Now mapping over cardData which includes value and detail
          <motion.div
            key={item.name}
            custom={i + 1}
            variants={cardVariants}
            className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
              {item.name}
            </h3>
            <p className="mt-1 text-3xl font-semibold text-indigo-600 dark:text-indigo-400">
              {item.value}
            </p>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {item.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
    </DashboardLayout>
  );
};

export default DashboardPage;