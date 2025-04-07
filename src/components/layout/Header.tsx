import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import MobileNav from './MobileNav'; // Keep MobileNav for hamburger menu
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6", // Use background color
        className
      )}
    >
      <MobileNav /> {/* Hamburger menu for mobile */}
      
      {/* Centered Search Bar */}
      <div className="flex-1 flex justify-center">
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xl"> {/* Max width for search */}
          <Search 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-perplexity-text-tertiary pointer-events-none" 
          />
          <Input
            type="search"
            placeholder="Search threads, pages, agents..." // General placeholder
            className="w-full rounded-full bg-perplexity-bg-hover border-perplexity-border pl-10 pr-4 py-2 text-sm focus:bg-background focus:ring-1 focus:ring-perplexity-teal focus:border-perplexity-teal" // Use new colors and styles
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
      
      {/* Placeholder for potential right-aligned actions if needed later */}
      <div className="w-10"> {/* Maintain balance */}
        {/* Add user menu or other actions here if required */}
      </div>
    </header>
  );
};

export default Header;
