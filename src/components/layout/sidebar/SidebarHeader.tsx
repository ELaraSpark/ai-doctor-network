import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils'; // Import cn if needed for logo styling

// Logo component with new primary color
const Logo = ({ className }: { className?: string }) => (
  <div className={cn("h-8 w-8 bg-primary rounded flex items-center justify-center text-white font-bold text-lg", className)}>
    L
  </div>
);

const SidebarHeader = () => {
  return (
    // Use new green palette styles
    <div className="flex items-center h-16 px-4 border-b border-[#E1EAE5] shrink-0"> 
      {/* Removed texture div, texture is handled by AppLayout */}
      
      <Link to="/" className="flex items-center gap-2"> {/* Removed relative z-10 */}
        <Logo /> {/* Use the Logo component with new primary color */}
        <span className="font-semibold text-[#2D3C35]">Leny.ai</span> {/* Use new text color */}
      </Link>
    </div>
  );
};

export default SidebarHeader;
