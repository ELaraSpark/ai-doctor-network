import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils'; // Import cn if needed for logo styling

// Example Logo component (replace with your actual logo SVG or component)
const Logo = ({ className }: { className?: string }) => (
  <div className={cn("h-8 w-8 bg-perplexity-teal rounded flex items-center justify-center text-white font-bold text-lg", className)}>
    L
  </div>
);

const SidebarHeader = () => {
  return (
    // Use new perplexity styles
    <div className="flex items-center h-16 px-4 border-b border-perplexity-border shrink-0"> 
      <Link to="/" className="flex items-center gap-2"> {/* Use gap for spacing */}
        <Logo /> {/* Use the Logo component */}
        <span className="font-medium text-perplexity-text-primary">Leny.ai</span>
      </Link>
    </div>
  );
};

export default SidebarHeader;
