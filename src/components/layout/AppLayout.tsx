
import { ReactNode } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar"; 
import Header from "./Header";
import { ActiveCallProvider } from "@/components/followup/context/ActiveCallContext";
// Removed PicassoBackground import
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <ActiveCallProvider> {/* Keep context provider if still relevant */}
      {/* Main flex container */}
      <div className="flex h-screen overflow-hidden relative"> {/* Added relative back */} 
        {/* Dedicated Background Container - Reverted to just gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-green"> 
          {/* Background elements re-added, removed pattern */}
        </div>
        
        {/* Sidebar - Added relative and z-index back */}
        <Sidebar className="relative z-10" /> 
        
        {/* Main content area - Added relative and z-index back */}
        <div className="flex-1 flex flex-col overflow-hidden relative z-10"> 
          <Header className="bg-transparent border-none shadow-none relative z-20" /> {/* Header transparent again */}
          {/* Main content area - Added relative and pt-16 back */}
          <main className="flex-1 overflow-y-auto relative pt-16"> 
            {/* Added relative z-10 wrapper back */}
            <div className="relative z-10 h-full"> 
              {/* Keep motion.div wrapper */}
              <motion.div
                initial={{ opacity: 0 }} // Simpler fade-in
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full" // Allow content to take full height
              >
                {children} 
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </ActiveCallProvider>
  );
};

export default AppLayout;
