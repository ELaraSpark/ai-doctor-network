
import { motion } from "framer-motion";
// Removed unused imports: Button, Link, useAuth, Clock, ChatPreview
// Removed duplicate motion import
import { Zap } from "lucide-react"; // Keep Zap if the highlighted benefit is retained or adapted

const HeroSection = () => {
  // Removed auth logic as it's not used in the simplified version
  // const { user } = useAuth();
  // const isAuthenticated = !!user;

  return (
    // Adjusted padding and max-width to align closer with the example's feel
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-6 text-center max-w-3xl"> {/* Increased max-width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }} // Added exit animation
          transition={{ duration: 0.3 }} // Adjusted duration slightly for exit
          // Removed extra wrapping div and mb-8
        >
          {/* Adopted H1 style from example - adjusted font size classes and changed color to primary */}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
            Your Time, Finally Your Own
          </h1>
          {/* Adopted P style from example - adjusted font size, color, and added italic class */}
          <p className="text-lg text-gray-600 mb-6 italic">
            AI agents handle paperwork, you handle healing.
          </p>

          {/* Optional: Keep or adapt the highlighted benefit if desired */}
          {/* <div className="flex items-center justify-center space-x-2 mb-6 p-3 bg-blue-50 rounded-lg border border-blue-100 max-w-md mx-auto">
            <Zap className="h-5 w-5 text-blue-600 flex-shrink-0" /> // Adjusted color
            <p className="text-sm font-medium text-blue-800">
              <span className="font-bold">Save up to 70% of your time</span> on administrative tasks and documentation
            </p>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
