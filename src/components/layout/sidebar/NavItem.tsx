import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'; // Assuming Tooltip is used

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isSubItem?: boolean; // Added optional prop for sub-items
}

const NavItem = ({ to, icon: Icon, label, isSubItem }: NavItemProps) => { 
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

  const linkContent = (
    <>
      <Icon size={20} className={cn("transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
      {/* Label is always visible now */}
      <span className={cn(
        "ml-3 text-sm font-medium transition-colors",
        isActive ? "text-primary" : "text-foreground group-hover:text-foreground"
        // Removed isCollapsed conditional class
      )}>
        {label}
      </span>
    </>
  );

  // Use refined colors: sidebar-selected for active bg, primary for active text, primary/10 for hover bg
  const linkClasses = cn(
    "flex items-center px-3 py-1.5 rounded-md group transition-colors text-sm", 
    isActive 
      ? "bg-sidebar-selected text-sidebar-primary font-medium" // Use sidebar-specific active colors
      : "text-perplexity-text-secondary hover:bg-primary/10 hover:text-perplexity-text-primary", // Use primary tint for hover bg
    isSubItem ? "py-1 text-xs" : "" // Make sub-item text slightly smaller too
  );

  return (
    // Removed "no-underline" class to use default link behavior
    <Link to={to} className={linkClasses}> 
      <Icon size={isSubItem ? 14 : 16} className="mr-3 flex-shrink-0" /> 
      <span className="truncate">{label}</span> 
    </Link>
  );
};

export default NavItem;
