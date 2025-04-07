
import { ReactNode } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar"; 
import Header from "./Header"; // Import the new Header
import { ActiveCallProvider } from "@/components/followup/context/ActiveCallContext"; // Keep if needed

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <ActiveCallProvider> {/* Keep context provider if still relevant */}
      <div className="flex h-screen bg-background"> {/* Use new background */}
        <Sidebar /> {/* Use the updated Sidebar */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header /> {/* Use the new Header */}
          {/* Adjust main content area styling */}
          <main className="flex-1 overflow-y-auto bg-background"> {/* Use background, remove default padding */}
             {/* Keep motion.div wrapper, adjust container/padding as needed per page */}
             {/* Removing container/max-width here, apply within specific pages if needed */}
             <motion.div
               initial={{ opacity: 0 }} // Simpler fade-in
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.2 }}
               className="h-full" // Allow content to take full height
             >
               {children} 
             </motion.div>
          </main>
        </div>
      </div>
    </ActiveCallProvider>
  );
};

export default AppLayout;
