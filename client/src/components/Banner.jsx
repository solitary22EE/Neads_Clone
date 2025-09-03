import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -50 }}
  transition={{ duration: 0.5 }}
  className="h-15 bg-gradient-to-r from-blue-700 to-blue-900 text-white px-4 relative shadow-md flex items-center"
>
  <div className="container mx-auto flex items-center justify-between gap-4 w-full">
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-yellow-950 truncate" id='banner-text'>
        Inauguration – {currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </p>
    </div>
    
    <div className="flex items-center gap-4 flex-shrink-0">
      <p className="text-sm font-semibold text-white hidden sm:block" id='banner-text'>
        Join the Movement. Empower the Nation.
      </p>
      <button 
        onClick={() => setIsVisible(false)}
        className="p-1 rounded-full hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 flex-shrink-0"
        aria-label="Close banner"
      >
        <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  </div>
</motion.div>

    </AnimatePresence>
  );
};

export default Banner;