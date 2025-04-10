import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils'; // Import cn if needed for logo styling

// Logo component now uses the animation.webp image
const Logo = ({ className }: { className?: string }) => (
  <img 
    src="/illustrations/animation.webp" // Corrected path relative to the public folder
    alt="Leny.ai Logo" 
    className={cn("h-8 w-8 object-contain", className)} // Adjust size as needed
  />
);

interface SidebarHeaderProps {
  isCollapsed?: boolean;
}

const SidebarHeader = ({ isCollapsed = false }: SidebarHeaderProps) => {
  return (
    // Use new green palette styles
    <div className={cn(
      "flex items-center h-16 border-b border-[#E1EAE5] shrink-0",
      isCollapsed ? "justify-center px-2" : "px-4"
    )}> 
      {/* Removed texture div, texture is handled by AppLayout */}
      
      <Link to="/" className={cn(
        "flex items-center",
        isCollapsed ? "justify-center" : "gap-2"
      )}> 
        <Logo /> {/* Use the Logo component with new primary color */}
        {!isCollapsed && <span className="font-semibold text-[#2D3C35]">Leny.ai</span>} {/* Use new text color */}
      </Link>
    </div>
  );
};

export default SidebarHeader;
