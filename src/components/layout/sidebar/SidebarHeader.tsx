import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import icons for toggle button
import { Button } from '@/components/ui/button';

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
  onToggle?: () => void; // Add toggle function prop
}

const SidebarHeader = ({ isCollapsed = false, onToggle }: SidebarHeaderProps) => {
  return (
    // Use new green palette styles
    <div className={cn(
      "flex items-center h-16 border-b border-[#E1EAE5] shrink-0",
      isCollapsed ? "justify-center px-2" : "px-4"
    )}> 
      {/* Logo and title */}
      <div className="flex-1">
        <Link to="/" className={cn(
          "flex items-center",
          isCollapsed ? "justify-center" : "gap-2"
        )}> 
          <Logo />
          {!isCollapsed && <span className="font-semibold text-[#2D3C35]">Leny.ai</span>}
        </Link>
      </div>
      
      {/* Toggle button */}
      {onToggle && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      )}
    </div>
  );
};

export default SidebarHeader;
