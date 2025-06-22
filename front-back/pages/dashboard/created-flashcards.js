// app/dashboard/created-flashcards/page.js
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Layers3, PlusCircle, Edit3, Trash2, Share2, MoreHorizontal, CalendarDays, FileText, Zap, BookOpen, Tag, AlertTriangle } from 'lucide-react';
import DashboardLayout from './layout';

// Dummy Data (from step 2)
const initialCreatedFlashcards = [
  { id: 'flashcardset1', title: 'AI Core Concepts', sourceDocument: 'Advanced AI Concepts.pdf', dateCreated: '2024-06-20T14:00:00Z', cardsCount: 50, lastStudied: '2024-06-21T10:15:00Z', masteryLevel: 75, tags: ['AI', 'Machine Learning', 'Deep Learning'], },
  { id: 'flashcardset2', title: 'JavaScript Fundamentals', sourceDocument: 'JS Quick Guide.txt', dateCreated: '2024-06-19T09:30:00Z', cardsCount: 75, lastStudied: null, masteryLevel: null, tags: ['Programming', 'JavaScript', 'Web Dev'], },
  { id: 'flashcardset3', title: 'Historical Figures', sourceDocument: 'World History Ch. 5.pdf', dateCreated: '2024-06-18T17:45:00Z', cardsCount: 30, lastStudied: '2024-06-20T16:00:00Z', masteryLevel: 90, tags: ['History', 'People'], },
];

const CreatedFlashcardsPage = () => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openActionsMenu, setOpenActionsMenu] = useState(null);
  const menuRefs = useRef({});

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setFlashcardSets(initialCreatedFlashcards);
      setLoading(false);
    }, 1000);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openActionsMenu && menuRefs.current[openActionsMenu] && !menuRefs.current[openActionsMenu].contains(event.target)) {
        setOpenActionsMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openActionsMenu]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  const handleDeleteSet = (setId) => {
    console.log("Delete flashcard set:", setId);
    setFlashcardSets(prevSets => prevSets.filter(set => set.id !== setId));
    setOpenActionsMenu(null);
  };

  // Framer Motion variants (can be reused or customized)
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 15 } },
    hover: { scale: 1.02, y: -6, boxShadow: "0px 12px 28px rgba(0,0,0,0.12)" },
    exit: { opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.2 } }
  };

  const actionMenuVariants = {
    closed: { opacity: 0, scale: 0.9, y: -10 },
    open: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.15, ease: "easeOut" } }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Layers3 size={48} className="text-indigo-600 animate-pulse" />
        <p className="ml-4 text-lg text-gray-700 dark:text-gray-300">Loading your flashcard sets...</p>
      </div>
    );
  }

  return (
    <DashboardLayout>

    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={pageVariants} className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">
          My Flashcard Sets
        </h1>
        <Link
          href="/dashboard/create-flashcards" // Assuming a page to create new flashcard sets
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 shadow-md hover:shadow-lg transition-all"
        >
          <motion.span
             whileHover={{ scale: 1.03, y: -2 }}
             whileTap={{ scale: 0.98 }}
             className="flex items-center"
          >
            <PlusCircle size={18} className="mr-2" />
            Create New Set
          </motion.span>
        </Link>
      </motion.div>

      {flashcardSets.length === 0 && !loading ? (
        <motion.div variants={pageVariants} className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <Layers3 size={56} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200">No Flashcard Sets Yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
            Transform your notes into powerful flashcards to boost your memory and understanding.
          </p>
           <Link href="/dashboard/upload"
            className="mt-6 inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all"
          >
             <motion.span whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }} className="flex items-center">
                Upload Document to Start
             </motion.span>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {flashcardSets.map((set) => (
              <motion.div
                key={set.id}
                variants={cardVariants}
                initial="hidden" // Controlled by parent's stagger
                animate="visible"
                exit="exit"
                whileHover="hover"
                layout
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col group" // Added group for hover effects
              >
                <div className="p-5 flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <Link href={`/dashboard/flashcards/${set.id}`} legacyBehavior>
                        <a className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                            {set.title}
                        </a>
                    </Link>
                    <div className="relative" ref={el => menuRefs.current[set.id] = el}>
                      <motion.button
                        onClick={() => setOpenActionsMenu(openActionsMenu === set.id ? null : set.id)}
                        className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                        whileTap={{ scale: 0.9 }}
                      >
                        <MoreHorizontal size={20} />
                      </motion.button>
                      <AnimatePresence>
                        {openActionsMenu === set.id && (
                          <motion.div
                            variants={actionMenuVariants}
                            initial="closed" animate="open" exit="closed"
                            className="origin-top-right absolute right-0 mt-1 w-40 rounded-md shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none py-1 z-10"
                          >
                            <button className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <Edit3 size={14} className="mr-2.5" /> Edit
                            </button>
                            <button className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <Share2 size={14} className="mr-2.5" /> Share
                            </button>
                            <hr className="my-1 dark:border-gray-700"/>
                            <button
                              onClick={() => handleDeleteSet(set.id)}
                              className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                            >
                              <Trash2 size={14} className="mr-2.5" /> Delete
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {set.sourceDocument && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                      <FileText size={14} className="mr-1.5 flex-shrink-0" />
                      Source: <span className="ml-1 font-medium truncate" title={set.sourceDocument}>{set.sourceDocument}</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 mb-3 flex-wrap">
                    {set.tags?.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs mb-1">
                            <Tag size={10} className="inline mr-1" />{tag}
                        </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center" title={`Created on ${formatDate(set.dateCreated)}`}>
                      <CalendarDays size={14} className="mr-1.5 text-gray-400" />
                      Created: {formatDate(set.dateCreated)}
                    </div>
                    <span>{set.cardsCount} cards</span>
                  </div>

                  {set.masteryLevel !== null && (
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${set.masteryLevel}%` }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                        title={`Mastery: ${set.masteryLevel}%`}
                      />
                    </div>
                  )}
                   <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                        <span>Last studied: {formatDate(set.lastStudied)}</span>
                        {set.masteryLevel !== null && <span>Mastery: {set.masteryLevel}%</span>}
                    </div>

                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700/30">
                  <Link
                    href={`/dashboard/flashcards/${set.id}/study`} // Link to study this specific set
                    className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-sm transition-all"
                  >
                    <motion.span
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center"
                    >
                      <BookOpen size={16} className="mr-2" /> {/* Or Zap for "Study Now" */}
                      Study Set
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
    </DashboardLayout>
  );
};

export default CreatedFlashcardsPage;