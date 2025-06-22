// components/HowToUseSection.js
import { PlayCircle } from 'lucide-react'; // For a play icon overlay on the video placeholder

const HowToUseSection = () => {
  // Placeholder for your actual video URL or embed code
  const demoVideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Replace with your actual video URL

  return (
    <section className="py-16 md:py-24 bg-white" id='Demo'> {/* Or bg-gray-50 if you want a slight off-white */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            How to use Our Platform?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch our quick demo video to see how easily you can transform your study materials and supercharge your learning.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Video Player Placeholder */}
          {/* Option 1: Simple Placeholder with an Icon (if you'll open video in modal or link out) */}
          {/* <div className="relative aspect-video bg-gray-200 rounded-xl shadow-xl overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle className="w-20 h-20 text-indigo-500 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-30">
              <p className="text-white text-lg font-semibold text-center">Click to Watch Demo</p>
            </div>
          </div> */}

          {/* Option 2: Actual iFrame Embed (for YouTube, Vimeo, etc.) */}
          <div className="relative aspect-video rounded-xl shadow-2xl overflow-hidden border-4 border-gray-100 hover:border-indigo-300 transition-all duration-300">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={demoVideoUrl} // Use your actual video embed URL
              title="Platform Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          {/* You could also add some descriptive text or bullet points below the video if needed */}
        </div>
      </div>
    </section>
  );
};

export default HowToUseSection;