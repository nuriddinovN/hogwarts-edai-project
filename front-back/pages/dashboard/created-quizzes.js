// app/dashboard/created-quizzes/page.js
'use client';

import { motion, AnimatePresence } from 'framer-motion'; // Ensure AnimatePresence is imported
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ListChecks, HelpCircle, Layers3, PlayCircle, Edit3, Trash2, Share2, MoreHorizontal, BarChart3, CalendarDays, FileText, PlusCircle, AlertTriangle } from 'lucide-react';
import DashboardLayout from './layout';

// ... (initialCreatedQuizzes and QuizTypeIcon remain the same)
const initialCreatedQuizzes = [
  { id: 'quiz1', title: 'AI Fundamentals Quiz', sourceDocument: 'Advanced AI Concepts.pdf', dateCreated: '2024-06-19T11:00:00Z', questionsCount: 15, quizType: 'Multiple Choice', lastTaken: '2024-06-20T09:30:00Z', averageScore: 85, },
  { id: 'quiz2', title: 'Machine Learning Basics', sourceDocument: 'ML Presentation.pptx', dateCreated: '2024-06-18T16:20:00Z', questionsCount: 20, quizType: 'Flashcards', lastTaken: null, averageScore: null, },
  { id: 'quiz3', title: 'Chapter 1 Review', sourceDocument: 'Project Notes - Chapter 1.txt', dateCreated: '2024-06-18T10:00:00Z', questionsCount: 10, quizType: 'Multiple Choice', lastTaken: '2024-06-18T14:15:00Z', averageScore: 70, },
  { id: 'quiz4', title: 'Neural Networks Visuals', sourceDocument: 'Neural Network Diagram.png', dateCreated: '2024-06-17T19:00:00Z', questionsCount: 5, quizType: 'Flashcards', lastTaken: null, averageScore: null, },
];

const QuizTypeIcon = ({ type, size = 18 }) => {
  switch (type) {
    case 'Multiple Choice': return <HelpCircle size={size} className="text-blue-500" />;
    case 'Flashcards': return <Layers3 size={size} className="text-purple-500" />;
    default: return <ListChecks size={size} className="text-gray-500" />;
  }
};


const CreatedQuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openActionsMenu, setOpenActionsMenu] = useState(null);
  const menuRefs = useRef({});

  useEffect(() => {
    setTimeout(() => {
      setQuizzes(initialCreatedQuizzes);
      setLoading(false);
    }, 1000);
  }, []);

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

  const handleDeleteQuiz = (quizId) => {
    setQuizzes(prevQuizzes => prevQuizzes.filter(quiz => quiz.id !== quizId));
    setOpenActionsMenu(null);
  };

  const pageVariants = { /* ... */ };
  const cardVariants = { /* ... */ };
  const actionMenuVariants = { /* ... */ };
  // Make sure these variants are defined as in the previous correct version

  if (loading) { /* ... loading state ... */ }

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
          My Created Quizzes
        </h1>
        {/* CORRECTED "Create New Quiz" LINK */}
        <Link
          href="/dashboard/create-quiz"
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 shadow-md hover:shadow-lg transition-all"
        >
          <motion.span // Wrap content in a motion.span if you want motion on the content
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center" // Ensure icon and text are aligned
          >
            <PlusCircle size={18} className="mr-2" />
            Create New Quiz
          </motion.span>
        </Link>
      </motion.div>

      {quizzes.length === 0 && !loading ? (
        <motion.div variants={pageVariants} className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          {/* ... empty state content ... */}
           <ListChecks size={56} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200">No Quizzes Created Yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
            It looks like you haven't created any quizzes. Start by uploading a document and generating your first quiz!
          </p>
          <Link href="/dashboard/upload"
            className="mt-6 inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all"
          >
             <motion.span whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }} className="flex items-center">
                Upload Document
             </motion.span>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {quizzes.map((quiz) => (
              <motion.div
                key={quiz.id}
                // ... other card motion props ...
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover="hover"
                layout
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col"
              >
                <div className="p-5 flex-grow">
                  {/* ... card content top part ... */}
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {quiz.title}
                    </h2>
                    <div className="relative" ref={el => menuRefs.current[quiz.id] = el}>
                      <motion.button
                        onClick={() => setOpenActionsMenu(openActionsMenu === quiz.id ? null : quiz.id)}
                        className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                        whileTap={{ scale: 0.9 }}
                      >
                        <MoreHorizontal size={20} />
                      </motion.button>
                      <AnimatePresence>
                        {openActionsMenu === quiz.id && (
                          <motion.div
                            variants={actionMenuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="origin-top-right absolute right-0 mt-1 w-40 rounded-md shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none py-1 z-10"
                          >
                            {/* ... action menu items ... */}
                             <button className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <Edit3 size={14} className="mr-2.5" /> Edit
                            </button>
                            <button className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <Share2 size={14} className="mr-2.5" /> Share
                            </button>
                            <hr className="my-1 dark:border-gray-700"/>
                            <button
                              onClick={() => handleDeleteQuiz(quiz.id)}
                              className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                            >
                              <Trash2 size={14} className="mr-2.5" /> Delete
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  {/* ... rest of card content (source, type, count, date, score) ... */}
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                    <FileText size={14} className="mr-1.5 flex-shrink-0" />
                    Source: <span className="ml-1 font-medium truncate hover:underline cursor-pointer" title={quiz.sourceDocument}>{quiz.sourceDocument}</span>
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <QuizTypeIcon type={quiz.quizType} size={14} />
                      <span className="ml-1.5">{quiz.quizType}</span>
                    </div>
                    <span>•</span>
                    <span>{quiz.questionsCount} Questions</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center" title={`Created on ${formatDate(quiz.dateCreated)}`}>
                      <CalendarDays size={14} className="mr-1.5 text-gray-400" />
                      Created: {formatDate(quiz.dateCreated)}
                    </div>
                    {quiz.averageScore !== null && (
                      <div className="flex items-center font-medium" title="Average Score">
                        <BarChart3 size={14} className="mr-1.5 text-green-500" />
                        {quiz.averageScore}%
                      </div>
                    )}
                  </div>

                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700/30">
                  {/* CORRECTED "Take Quiz" LINK */}
                  <Link
                    href={`/dashboard/quiz/${quiz.id}/take`}
                    className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-sm transition-all"
                  >
                    <motion.span // Wrap content in a motion.span for hover effects
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center" // Ensure icon and text are aligned
                    >
                      <PlayCircle size={16} className="mr-2" />
                      Take Quiz
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

export default CreatedQuizzesPage;