'use client'; // Needed for useState and framer-motion client components

import Image from 'next/image';
import { Star, Quote, ChevronRight, ThumbsUp, Heart } from 'lucide-react'; // ChevronRight for selection
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// DUMMY DATA (as modified in step 2)
const dummyFeedbacks = [
  {
    id: 1,
    name: 'Alex Russo',
    avatar: '/IMAGE/eduacc.avif',
    rating: 5,
    title: 'Absolutely Magical!',
    snippet: "Completely transformed how I study. AI summarization is a lifesaver...",
    text: "Cleverly.AI has completely transformed how I study. The AI summarization is a lifesaver, and the quiz generation helps me pinpoint exactly what I need to review. It's like having a personal tutor powered by magic!",
    date: 'June 15, 2024',
  },
  {
    id: 2,
    name: 'Justin Russo',
    avatar: '/IMAGE/eduacc.avif',
    rating: 4,
    title: 'Logically Impressive',
    snippet: "AI's ability to extract key concepts is incredibly efficient. Intuitive platform...",
    text: "As someone who appreciates structure, I find the AI's ability to extract key concepts incredibly efficient. The platform is intuitive, though I'd love to see more advanced filtering options for quizzes.",
    date: 'June 10, 2024',
  },
  {
    id: 3,
    name: 'Max Russo',
    avatar: '/IMAGE/eduacc.avif',
    rating: 5,
    title: "It's Super Fun!",
    snippet: "Making quizzes is easy, and it helps me remember stuff without it feeling boring...",
    text: "I wasn't sure about studying with AI, but this is actually really cool! Making quizzes is easy, and it helps me remember stuff without it feeling like boring homework. Plus, the magic theme is awesome!",
    date: 'June 5, 2024',
  },
  
 
];
// End of Dummy Data

const StarRating = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ))}
  </div>
);

const FeedbacksSection = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(dummyFeedbacks[0]); // Initially select the first one

  // Effect to automatically select the first feedback if the list changes
  // and no selectedFeedback is set or the current one is not in the list
  useEffect(() => {
    if (dummyFeedbacks.length > 0) {
      if (!selectedFeedback || !dummyFeedbacks.find(f => f.id === selectedFeedback.id)) {
        setSelectedFeedback(dummyFeedbacks[0]);
      }
    } else {
      setSelectedFeedback(null);
    }
  }, [dummyFeedbacks, selectedFeedback]);


  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeIn" } }
  };

  if (!dummyFeedbacks || dummyFeedbacks.length === 0) {
    return null; // Or some placeholder if no feedbacks
  }

  return (
    <section className="py-16 md:py-24 bg-slate-100" id='feedback'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Hear From Our Magical Learners
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how Cleverly.AI is making a difference in their study routines.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Left: List of compact feedbacks */}
          <div className="md:w-1/3 lg:w-1/4 space-y-3 md:max-h-[600px] md:overflow-y-auto pr-2 custom-scrollbar">
            {dummyFeedbacks.map((feedback) => (
              <motion.div
                key={feedback.id}
                onClick={() => setSelectedFeedback(feedback)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ease-in-out
                  ${selectedFeedback?.id === feedback.id
                    ? 'bg-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-white hover:bg-indigo-50 shadow-md hover:shadow-lg'
                  }`}
                layout // Enables smooth transition when item position changes (if list was sortable)
                whileHover={{ scale: selectedFeedback?.id === feedback.id ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-white">
                      <Image
                        src={feedback.avatar || '/avatars/default-avatar.png'}
                        alt={feedback.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div>
                      <h5 className={`font-semibold text-sm ${selectedFeedback?.id === feedback.id ? 'text-white' : 'text-gray-700'}`}>
                        {feedback.name}
                      </h5>
                       <StarRating rating={feedback.rating} />
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${selectedFeedback?.id === feedback.id ? 'text-white ' : 'text-gray-400 group-hover:text-indigo-500'}`} />
                </div>
                {selectedFeedback?.id !== feedback.id && (
                    <p className="mt-2 text-xs text-gray-500 line-clamp-2">{feedback.snippet}</p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right: Detailed selected feedback */}
          <div className="md:w-2/3 lg:w-3/4">
            <AnimatePresence mode="wait">
              {selectedFeedback && (
                <motion.div
                  key={selectedFeedback.id} // Important for AnimatePresence to detect changes
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white p-6 sm:p-8 rounded-xl shadow-xl flex flex-col md:flex-row gap-6"
                >
                  <div className="flex-shrink-0 md:w-1/4 flex flex-col items-center text-center md:text-left md:items-start">
                     <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-4 border-4 border-indigo-100 shadow-md">
                        <Image
                            src={selectedFeedback.avatar || '/IMAGE/eduacc.avif'}
                            alt={selectedFeedback.name}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{selectedFeedback.name}</h3>
                    <StarRating rating={selectedFeedback.rating} />
                    <p className="text-xs text-gray-500 mt-1">{selectedFeedback.date}</p>

                    {/* Like/Heart Icons - as per your sketch bottom part */}
                    <div className="mt-6 space-y-3 hidden md:flex md:flex-col">
                        <button className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-500 transition-colors">
                            <Heart size={20} />
                        </button>
                        <button className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-500 transition-colors">
                            <ThumbsUp size={20} />
                        </button>
                    </div>
                  </div>

                  <div className="flex-grow">
                    <Quote className="w-10 h-10 text-indigo-200 mb-4 transform -scale-x-100" />
                    <h4 className="text-2xl font-semibold text-indigo-700 mb-3">{selectedFeedback.title}</h4>
                    <p className="text-gray-700 leading-relaxed prose prose-sm">
                      {selectedFeedback.text}
                    </p>
                     {/* Like/Heart Icons for mobile - centered below text */}
                    <div className="mt-6 space-x-4 flex md:hidden justify-center">
                        <button className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-500 transition-colors">
                            <Heart size={20} />
                        </button>
                        <button className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-500 transition-colors">
                            <ThumbsUp size={20} />
                        </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbacksSection;