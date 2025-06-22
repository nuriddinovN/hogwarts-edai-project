'use client';

import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } },
  };

  // Variants for the initial appearance of the image
  const imageInitialVariants = {
    hidden: { opacity: 0, scale: 0.7, rotate: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        delay: 0.6, // Delay image appearance
      }
    }
  };


  const plusVariants = (delay = 0) => ({
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 10, delay: delay + 0.8 },
    },
  });

  return (
    <section className="relative pt-20 min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">
      {/* Decorative Plus Signs */}
      <motion.div
        className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 text-purple-300/30 text-7xl font-thin opacity-20 md:opacity-40"
        variants={plusVariants(0)} initial="hidden" animate="visible"
      >+</motion.div>
      <motion.div
        className="absolute top-1/3 right-4 md:right-8 transform -translate-y-1/2 text-indigo-300/30 text-7xl font-thin opacity-20 md:opacity-40"
        variants={plusVariants(0.1)} initial="hidden" animate="visible"
      >+</motion.div>
      <motion.div
        className="absolute bottom-1/4 right-10 md:right-16 transform text-pink-300/30 text-5xl font-thin opacity-20 md:opacity-40"
        variants={plusVariants(0.2)} initial="hidden" animate="visible"
      >+</motion.div>
      <motion.div
        className="absolute top-1/4 left-10 md:left-16 transform text-blue-300/30 text-5xl font-thin opacity-20 md:opacity-40"
        variants={plusVariants(0.3)} initial="hidden" animate="visible"
      >+</motion.div>

      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12 items-center"> {/* Increased gap */}
          {/* Left Content */}
          <motion.div className="text-center md:text-left" variants={containerVariants}>
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight"
              variants={itemVariants}
            >
              Learn with AI,
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Collaborate with Magic
              </span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-gray-600 max-w-xl mx-auto md:mx-0"
              variants={itemVariants}
            >
              Transform your study materials into interactive learning
              experiences. Upload, extract, summarize, and quiz - all powered
              by AI magic.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
              variants={itemVariants}
            >
              <motion.button
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0px 10px 20px rgba(79,70,229,0.25)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Start Now
              </motion.button>
              <motion.button
                className="w-full sm:w-auto bg-white text-indigo-600 font-semibold py-3 px-8 rounded-lg border border-gray-300 hover:bg-gray-50 shadow-md hover:shadow-lg transform transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0px 8px 15px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <PlayCircle size={20} />
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>
            <motion.div
              className="mt-16 text-sm text-gray-500"
              variants={itemVariants}
            >
              <p className="mb-2">Developed by:</p>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <span className="font-medium text-gray-700">Team Cleverly</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image - LARGER, ANIMATED INFINITELY */}
          <div className="relative flex justify-center items-center mt-8 md:mt-0 h-full"> {/* Added h-full for better vertical centering if needed */}
            {/* Gradient Background Element - Behind the image - LARGER */}
            <div className="absolute inset-0 z-10 flex justify-center items-center opacity-100 md:opacity-100"> {/* Control overall opacity of blob here */}
              <div
                className="w-[300px] h-[350px] sm:w-[380px] sm:h-[550px] md:w-[450px] md:h-[600px] lg:w-[500px] lg:h-[700px] rounded-full blur-3xl opacity-100 md:opacity-100 bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-600" // Slightly stronger colors
               
              />
            </div>

            {/* Image Container and Image - LARGER, INFINITE FLOAT/PULSE */}
            <motion.div
                className="relative w-[80%] max-w-[300px] z-11 sm:max-w-[340px] md:max-w-[360px] lg:max-w-[420px] aspect-[13/15]" // INCREASED MAX WIDTHS
                variants={imageInitialVariants} // For initial appear animation
                initial="hidden"
                animate="visible" // Triggers initial appearance
            >
                <motion.div // Inner div for continuous animation
                    animate={{
                        y: ["0%", "-4%", "0%"],       // Float up and down
                        scale: [1, 1.02, 1]        // Gentle pulse
                    }}
                    transition={{
                        y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
                        scale: { duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }
                    }}
                    className="w-[90%] h-[90%]" // Ensure this div takes up space for the Image
                >
                    <Image
                        src="/IMAGE/hat2.png"
                        alt="Mystical wizard hat emitting magical light"
                        layout="fill"
                        objectFit="cover"
                        priority
                        className="drop-shadow-xl" // Added a stronger drop shadow
                    />
                </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;