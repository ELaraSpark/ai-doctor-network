import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'; // Assuming Tooltip is used

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  // Removed isCollapsed prop
}

const NavItem = ({ to, icon: Icon, label }: NavItemProps) => { // Removed isCollapsed from destructuring
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

  const linkClasses = cn(
    "flex items-center px-4 py-2.5 rounded-md group transition-colors",
    isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
  );

  // Removed the isCollapsed conditional rendering logic
  return (
    <Link to={to} className={linkClasses}>
      {linkContent}
    </Link>
  );
};

export default NavItem;
