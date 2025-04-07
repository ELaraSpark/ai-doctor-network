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
          {/* Title - Updated text */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-primary mb-4">
            Be Free Again.
          </h1>
          {/* Subtitle - Updated text */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed">
            Get an AI Sidekick. Work Like a Superhuman.
          </p>
        </div>
      </div>
    </motion.section> 
  );
};

export default HeroSection;
