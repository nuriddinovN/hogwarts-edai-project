'use client';

import {
  UploadCloud,
  FileText as FileTextIconForJourney,
  ScanText,
  Lightbulb,
  CheckCircle2,
  CircleDotDashed,
  FileType2,
  Presentation,
  Image as ImageIcon,
  ArrowRight,
  X,
  // New icons for Quiz section
  HelpCircle,
  Layers3,
  RefreshCw,
} from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence

// ... (journeySteps, featureCardsData, fileTypeOptions data remains the same) ...
const journeySteps = [
  { id: 1, name: 'Upload', status: 'Current Step', icon: UploadCloud },
  { id: 2, name: 'Extract', status: 'Pending', icon: FileTextIconForJourney },
  { id: 3, name: 'Summarize', status: 'Pending', icon: ScanText },
  { id: 4, name: 'Quiz', status: 'Current Step', icon: Lightbulb }, // Updated status for step 4 display
];

const featureCardsData = [
  { title: "Upload", subtitle: "Study materials", icon: UploadCloud, colors: { bg: 'bg-indigo-50', iconBg: 'bg-indigo-100', iconText: 'text-indigo-600', hoverRing: 'hover:ring-indigo-300' } },
  { title: "Extract", subtitle: "Text content", icon: FileTextIconForJourney, colors: { bg: 'bg-emerald-50', iconBg: 'bg-emerald-100', iconText: 'text-emerald-600', hoverRing: 'hover:ring-emerald-300' } },
  { title: "Summarize", subtitle: "Key concepts", icon: ScanText, colors: { bg: 'bg-amber-50', iconBg: 'bg-amber-100', iconText: 'text-amber-600', hoverRing: 'hover:ring-amber-300' } },
  { title: "Quiz", subtitle: "Test knowledge", icon: Lightbulb, colors: { bg: 'bg-rose-50', iconBg: 'bg-rose-100', iconText: 'text-rose-600', hoverRing: 'hover:ring-rose-300' } },
];

const fileTypeOptions = [
  // ... (your existing fileTypeOptions definition) ...
  { title: 'PDF Files', subtitle: 'Documents, books', icon: FileType2, cardBg: 'bg-blue-50', iconContainerBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { title: 'PPT Files', subtitle: 'Presentations', icon: Presentation, cardBg: 'bg-orange-50', iconContainerBg: 'bg-orange-100', iconColor: 'text-orange-600'},
  { title: 'TXT Files', subtitle: 'Text documents', icon: FileTextIconForJourney, cardBg: 'bg-green-50', iconContainerBg: 'bg-green-100', iconColor: 'text-green-600'},
  { title: 'Images', subtitle: 'JPG, PNG', icon: ImageIcon, cardBg: 'bg-purple-50', iconContainerBg: 'bg-purple-100', iconColor: 'text-purple-600'},
];


const quizTypeCardsData = [
  // ... (as defined in step 2 above) ...
   { id: 'multiple-choice', title: 'Multiple Choice', description: 'Test your knowledge with multiple choice questions generated from your content.', icon: HelpCircle, colors: { bg: 'hover:bg-blue-50', iconBg: 'bg-blue-100', iconText: 'text-blue-600', ring: 'hover:ring-blue-300', buttonBg: 'bg-blue-600 hover:bg-blue-700', buttonText: 'text-white', selectedRing: 'ring-blue-500', selectedBg: 'bg-blue-50' }},
  { id: 'flashcards', title: 'Flashcards', description: 'Review key concepts with interactive flashcards for quick memorization.', icon: Layers3, colors: { bg: 'hover:bg-purple-50', iconBg: 'bg-purple-100', iconText: 'text-purple-600', ring: 'hover:ring-purple-300', buttonBg: 'bg-gray-200 hover:bg-gray-300', buttonText: 'text-gray-700 hover:text-gray-800', selectedRing: 'ring-purple-500', selectedBg: 'bg-purple-50'}},
];


const LearningJourney = () => {
  const [currentStep, setCurrentStep] = useState(1); // Set to 4 for testing this UI
  const [uploadedFiles, setUploadedFiles] = useState([]); // Assume some files are "uploaded" for demo
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedQuizType, setSelectedQuizType] = useState(null); // New state: 'multiple-choice' or 'flashcards'
  const [quizQuestions, setQuizQuestions] = useState([]); // To hold generated questions

  // ... (onDrop, getRootProps, getInputProps, handleStepClick, handleCancelUpload, handleContinueToExtract remain the same) ...
  // For onDrop, you might want to clear selectedQuizType and quizQuestions if new files are uploaded
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setUploadedFiles(prevFiles => {
      const newFiles = acceptedFiles.filter(
        (newFile) => !prevFiles.some((existingFile) => existingFile.name === newFile.name && existingFile.size === newFile.size)
      );
      return [...prevFiles, ...newFiles];
    });
    setSelectedQuizType(null); // Reset quiz selection on new upload
    setQuizQuestions([]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { /* ... your accept types ... */ }
  });

  const handleStepClick = (stepId) => {
    if (isProcessing) return;
    if (stepId > 1 && uploadedFiles.length === 0 && currentStep === 1) {
        alert("Please upload files first to proceed.");
        return;
    }
    setCurrentStep(stepId);
    if (stepId < 4) { // Reset quiz state if navigating before quiz step
        setSelectedQuizType(null);
        setQuizQuestions([]);
    }
  };

  const handleCancelUpload = () => {
    setUploadedFiles([]);
    setSelectedQuizType(null);
    setQuizQuestions([]);
  };

  const handleContinueToExtract = () => {
    if (uploadedFiles.length === 0) {
      alert("Please upload some files before continuing.");
      return;
    }
    setIsProcessing(true);
    setCurrentStep(2);
    setTimeout(() => {
      setIsProcessing(false);
      console.log("Extraction complete (simulated)");
    }, 2000);
  };


  const handleQuizTypeSelect = (quizTypeId) => {
    setSelectedQuizType(quizTypeId);
    console.log(`Selected quiz type: ${quizTypeId}`);
    // Simulate fetching/generating quiz questions
    setQuizQuestions([]); // Clear previous questions
    // Show a loading state for questions here if needed
    setTimeout(() => {
      if (quizTypeId === 'multiple-choice') {
        setQuizQuestions([
          { id: 1, q: 'What is the capital of Framer Motion?', a: ['Paris', 'London', 'Dublin', 'Animation City'], correct: 'Animation City' },
          { id: 2, q: 'Which hook manages state in React?', a: ['useEffect', 'useState', 'useContext', 'useReducer'], correct: 'useState' },
        ]);
      } else if (quizTypeId === 'flashcards') {
        setQuizQuestions([
          { id: 1, front: 'Framer Motion', back: 'A production-ready motion library for React.' },
          { id: 2, front: 'Tailwind CSS', back: 'A utility-first CSS framework.' },
        ]);
      }
    }, 1500);
  };

  const handleRegenerateQuiz = () => {
    if (selectedQuizType) {
        console.log("Regenerating quiz...");
        // Re-call the logic to fetch/generate questions for the selectedQuizType
        handleQuizTypeSelect(selectedQuizType);
    }
  };

  // Framer Motion Variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 12 } },
  };

  const quizCardVariants = {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 15 } },
    hover: { scale: 1.03, y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" },
  };


  return (
    <motion.section // Added motion to the main section for overall animation
      className="py-16 md:py-24 bg-slate-50"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.2 }}}} // Stagger top-level motion divs
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* This part is for currentStep < 4 (Upload, Extract, Summarize) */}
        {currentStep < 4 && (
            <>
                <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-12">
                    Your Learning Journey
                </motion.h2>
                {/* ... (Feature Cards, Intro Text, Stepper for steps 1-3) ... */}
                {/* ... (File Upload Area, File Type Options for step 1) ... */}
                {/* ... (Extracting Text / Content for step 2) ... */}
                {/* ... (Summarizing / Summary for step 3) ... */}
                {/* The full code for steps 1-3 from previous responses would go here, conditionally rendered */}
            </>
        )}


        {/* STEP 4: AI-GENERATED QUIZ SECTION */}
        {currentStep === 4 && (
          <motion.div variants={sectionVariants} initial="hidden" animate="visible">
            <div className="text-center mb-12">
              <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-gray-800">
                AI-Generated Quiz
              </motion.h2>
              <motion.p variants={itemVariants} transition={{delay:0.1}} className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                Test your knowledge with personalized questions based on your study materials.
              </motion.p>
            </div>

            {/* Stepper (re-included for context, showing Quiz as current) */}
            <motion.div variants={itemVariants} transition={{delay:0.2}} className="bg-white p-6 rounded-xl shadow-lg mb-12">
              <div className="flex items-center">
                {journeySteps.map((step, index) => (
                  <div key={step.id} className="flex-1 flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2
                      ${step.id === 4 ? 'bg-indigo-600 text-white border-indigo-600' : // Current: Quiz
                        step.id < 4 ? 'bg-green-500 text-white border-green-500' : // Completed: Upload, Extract, Summarize
                        'bg-gray-100 text-gray-400 border-gray-300'
                      }`}
                    >
                      {step.id < 4 ? <CheckCircle2 size={20} /> : step.id}
                    </div>
                    <div className="ml-3">
                      <h4 className={`font-semibold
                        ${step.id === 4 ? 'text-indigo-600' : step.id < 4 ? 'text-green-600' : 'text-gray-700'}`}
                      >
                        {step.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {step.id === 4 ? 'Current Step' : step.id < 4 ? 'Completed' : 'Pending'}
                      </p>
                    </div>
                    {index < journeySteps.length - 1 && (
                      <div className={`flex-auto border-t-2 transition-colors duration-500 ease-in-out mx-4
                        ${step.id < 4 ? 'border-green-500' : 'border-gray-200'}`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Choose Quiz Type */}
            <motion.div variants={itemVariants} transition={{delay:0.3}} className="bg-white p-6 sm:p-8 rounded-xl shadow-xl mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Choose Quiz Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quizTypeCardsData.map((quizType) => {
                  const Icon = quizType.icon;
                  const isSelected = selectedQuizType === quizType.id;
                  return (
                    <motion.div
                      key={quizType.id}
                      className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 flex flex-col items-start text-left
                        ${isSelected
                          ? `${quizType.colors.selectedBg} ${quizType.colors.selectedRing}`
                          : `bg-white border-gray-200 ${quizType.colors.bg} ${quizType.colors.ring}`
                        }`}
                      onClick={() => handleQuizTypeSelect(quizType.id)}
                      variants={quizCardVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                    >
                      <div className={`p-2.5 rounded-lg mb-4 ${isSelected ? quizType.colors.iconBg.replace('100', '200') : quizType.colors.iconBg}`}>
                        <Icon className={`w-6 h-6 ${quizType.colors.iconText}`} />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{quizType.title}</h4>
                      <p className="text-sm text-gray-600 mb-auto flex-grow">{quizType.description}</p>
                      <motion.button
                        className={`mt-6 w-full sm:w-auto text-sm font-medium py-2.5 px-6 rounded-md transition-all duration-200 shadow-sm
                          ${isSelected
                            ? `${quizType.colors.buttonBg} ${quizType.colors.buttonText}`
                            : `${quizType.colors.buttonBg.replace('hover:bg-gray-300', 'bg-gray-100')} ${quizType.colors.buttonText.replace('hover:text-gray-800', 'text-gray-600')} hover:bg-gray-200`
                          }`}
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Your Quiz Questions Section (conditionally rendered) */}
            <AnimatePresence>
              {selectedQuizType && quizQuestions.length > 0 && (
                <motion.div
                  className="bg-white p-6 sm:p-8 rounded-xl shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4 } }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Your Quiz Questions</h3>
                    <motion.button
                      onClick={handleRegenerateQuiz}
                      className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RefreshCw size={16} className="mr-1.5" />
                      Regenerate
                    </motion.button>
                  </div>
                  {/* Placeholder for actual questions based on type */}
                  {selectedQuizType === 'multiple-choice' && (
                    <ul className="space-y-4">
                      {quizQuestions.map(q => (
                        <li key={q.id} className="p-4 bg-indigo-50 rounded-lg">
                          <p className="font-medium text-gray-700">{q.id}. {q.q}</p>
                          {/* Render options here */}
                        </li>
                      ))}
                    </ul>
                  )}
                  {selectedQuizType === 'flashcards' && (
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {quizQuestions.map(card => (
                        <div key={card.id} className="p-4 bg-purple-50 rounded-lg shadow text-center">
                            <p className="font-semibold text-purple-700">{card.front}</p>
                            {/* Add flip interaction here */}
                        </div>
                      ))}
                    </div>
                  )}
                   {quizQuestions.length === 0 && !isProcessing && ( // Added !isProcessing
                        <p className="text-gray-500 text-center py-4">Generating questions...</p>
                    )}
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
        {/* ... (JSX for currentStep 1, 2, 3 from previous full code) ... */}
      </div>
    </motion.section>
  );
};

export default LearningJourney;