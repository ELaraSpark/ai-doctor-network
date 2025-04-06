import { motion } from "framer-motion";
import React from 'react'; // Import React for FC type

interface HeroSectionProps {
  isVisible: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isVisible }) => {
  const variants = {
    visible: { opacity: 1, maxHeight: '500px' }, // Target height (adjust if needed)
    hidden: { opacity: 0, maxHeight: 0 }
  };

  return (
    // Apply motion directly to the section, control animation via 'animate' prop
    <motion.section 
      // Removed padding from motion.section
      variants={variants}
      animate={isVisible ? "visible" : "hidden"} // Control state via prop
      transition={{ duration: 0.4, ease: "easeOut" }} // Keep adjusted duration/easing
      style={{ overflow: 'hidden' }} // Still need overflow hidden
    >
      {/* Apply padding to this inner container instead */}
      <div className="py-8 md:py-12 container mx-auto px-6 text-center max-w-3xl"> 
        {/* Inner content div */}
        <div>
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
            Your Time, Finally Your Own
          </h1>
          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-6 italic">
            AI agents handle paperwork, you handle healing.
          </p>
        </div> 
      </div>
    </motion.section> 
  );
};

export default HeroSection;
