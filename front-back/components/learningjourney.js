"use client";

import {
  UploadCloud,
  FileText as FileTextIconForJourney,
  ScanText,
  Lightbulb,
  // Removed unused icons for this version:
  // CheckCircle2, CircleDotDashed, FileType2, Presentation, Image as ImageIcon, ArrowRight, X
} from "lucide-react";
// Removed unused hooks for this version:
// import { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import Progress from "./dashboard/Upload"; // Assuming this is not used in this simplified version

import { motion } from 'framer-motion'; // Import motion

const featureCardsData = [ // Renamed from featureCards to avoid conflict if you re-add state
  { title: "Upload", subtitle: "Study materials", icon: UploadCloud, colors: { bg: 'bg-indigo-50', iconBg: 'bg-indigo-100', iconText: 'text-indigo-600', hoverRing: 'hover:ring-indigo-300' } },
  { title: "Extract", subtitle: "Text content", icon: FileTextIconForJourney, colors: { bg: 'bg-emerald-50', iconBg: 'bg-emerald-100', iconText: 'text-emerald-600', hoverRing: 'hover:ring-emerald-300' } },
  { title: "Summarize", subtitle: "Key concepts", icon: ScanText, colors: { bg: 'bg-amber-50', iconBg: 'bg-amber-100', iconText: 'text-amber-600', hoverRing: 'hover:ring-amber-300' } },
  { title: "Quiz", subtitle: "Test knowledge", icon: Lightbulb, colors: { bg: 'bg-rose-50', iconBg: 'bg-rose-100', iconText: 'text-rose-600', hoverRing: 'hover:ring-rose-300' } },
];


const LearningJourney = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren", // Animate parent before children
        staggerChildren: 0.15,  // Stagger animation of direct motion children
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.section
      className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-indigo-50" // Subtle gradient background
      variants={sectionVariants}
      initial="hidden"
      id="features"
      whileInView="visible" // Animate when section scrolls into view
      viewport={{ once: true, amount: 0.2 }} // amount: percentage of element visible to trigger
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-4"
          variants={textVariants}
        >
          Your Learning Journey
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 mb-16 max-w-2xl mx-auto text-lg" // Slightly larger text
          variants={textVariants}
        >
          Start your AI-powered learning journey by uploading your study
          materials. We support various file formats to make your learning
          experience seamless.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featureCardsData.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.title}
                className={`p-6 rounded-xl shadow-lg flex flex-col items-center text-center transition-all duration-300 ease-out ring-2 ring-transparent ${card.colors.bg} ${card.colors.hoverRing} hover:shadow-2xl`}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.03 }} // Lift and slightly scale card on hover
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <motion.div
                  className={`p-4 rounded-full mb-5 ${card.colors.iconBg}`} // Larger padding for icon
                  // Optional: animate icon background on card hover
                  // whileHover={{ scale: 1.1 }}
                  // transition={{ type: "spring", stiffness: 300}}
                >
                  <IconComponent className={`w-8 h-8 ${card.colors.iconText}`} /> {/* Larger icon */}
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{card.title}</h3> {/* Larger title */}
                <p className="text-sm text-gray-500 flex-grow">{card.subtitle}</p> {/* flex-grow to help align cards if subtitles vary */}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default LearningJourney;