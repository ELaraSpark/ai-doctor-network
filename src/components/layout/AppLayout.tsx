import { ReactNode, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar"; 
import Header from "./Header";
import { ActiveCallProvider } from "@/components/followup/context/ActiveCallContext";
import { cn } from '@/lib/utils';
import { Outlet, useLocation } from "react-router-dom"; // Import Outlet and useLocation
import { useTheme } from "@/contexts/ThemeContext"; // Import useTheme

// Remove children prop from interface
interface AppLayoutProps {
  // children: ReactNode; 
}

// Remove children from destructuring
const AppLayout = () => { 
  const { colorTheme } = useTheme(); // Get the current color theme
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  // Auto-collapse sidebar after a few seconds if user is likely to interact with the current screen
  useEffect(() => {
    // Reset sidebar state when location changes
    setIsSidebarCollapsed(false);
    
    // Determine if the current page is one where the user will likely interact with the content
    const isInteractivePage = ['/chat', '/tumor-board', '/doctors-lounge'].some(
      path => location.pathname.startsWith(path)
    );
    
    if (isInteractivePage) {
      // Set a timeout to collapse the sidebar after 5 seconds
      const timer = setTimeout(() => {
        setIsSidebarCollapsed(true);
      }, 5000);
      
      // Clean up the timer when the component unmounts or when the location changes
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);
  
  // Handle click on main content area to collapse sidebar
  const handleContentClick = () => {
    // Only collapse if it's currently expanded
    if (!isSidebarCollapsed) {
      setIsSidebarCollapsed(true);
    }
  };
  
  // Determine the gradient class based on the color theme
  const getGradientClass = () => {
    switch (colorTheme) {
      case 'clinical':
        return 'bg-gradient-clinical';
      case 'surgical':
        return 'bg-gradient-surgical';
      case 'pediatric':
        return 'bg-gradient-pediatric';
      case 'cardiology':
        return 'bg-gradient-cardiology';
      case 'neurology':
        return 'bg-gradient-neurology';
      case 'classic':
      default:
        return 'bg-gradient-green';
    }
  };
  
  return (
    <ActiveCallProvider> {/* Keep context provider if still relevant */}
      {/* Main flex container */}
      <div className="flex h-screen overflow-hidden relative"> {/* Added relative back */} 
        {/* Dedicated Background Container with dynamic gradient based on theme */}
        <div className={`absolute inset-0 -z-10 ${getGradientClass()}`}> 
          {/* Background elements re-added, removed pattern */}
        </div>
        
        {/* Sidebar - Added relative and z-index back */}
        <Sidebar 
          className="relative z-10" 
          isCollapsed={isSidebarCollapsed}
          onMouseEnter={() => setIsSidebarCollapsed(false)}
        /> 
        
        {/* Main content area - Added relative and z-index back */}
        <div 
          className="flex-1 flex flex-col overflow-hidden relative z-10"
          onClick={handleContentClick} // Add click handler to collapse sidebar
        > 
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
                <Outlet /> {/* Render child routes here */}
              </motion.div>
            </div>
          </main>
        </div>
        
      </div>
    </ActiveCallProvider>
  );
};

export default AppLayout;
