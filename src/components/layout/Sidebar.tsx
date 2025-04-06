import React from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import SidebarHeader from './sidebar/SidebarHeader';
import NavItem from './sidebar/NavItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Clock, Search, Users, Bookmark, Zap, List, Settings, LogOut, Gift // Added Gift
} from 'lucide-react';

// Define navigation items based on the avatar menu structure
const navItems = [
  { to: '/recent-chats', label: 'Recent Chats', icon: Clock },
  // Removed Recent Searches
  { to: '/my-agents', label: 'My Agents', icon: Users },
  { to: '/my-templates', label: 'My Templates', icon: Bookmark }, // Updated path and label
  { to: '/integrations', label: 'Integrations', icon: Zap },
  { to: '/tasks', label: 'Tasks', icon: List },
  { to: '/referrals', label: 'Referrals', icon: Gift }, // Added Referrals link
];

const Sidebar = () => {
  const { user, signOut } = useAuth();
  // Removed isCollapsed state for initial mobile responsiveness

  return (
    // Hide on small screens, show as flex column on large screens
    <aside className={cn(
      "hidden lg:flex flex-col h-screen bg-card border-r border-border transition-all duration-300 ease-in-out w-64" // Fixed width for large screens
    )}>
      <SidebarHeader />

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              // Removed isCollapsed prop
            />
          ))}
        </nav>
      </ScrollArea>

      <Separator />

      {/* Footer section with User Info, Settings, Logout */}
      <div className="p-3"> {/* Removed isCollapsed conditional padding */}
        <div className="flex items-center justify-between"> {/* Removed isCollapsed conditional justify */}
           {/* User Avatar/Info */}
           <div className="flex items-center"> {/* Removed isCollapsed conditional class */}
             <Avatar className="h-8 w-8 mr-2">
               <AvatarImage src="/avatar-placeholder.jpg" alt={user?.email || 'User'} />
               <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                 {user?.email?.substring(0, 2).toUpperCase() || 'U'}
               </AvatarFallback>
             </Avatar>
             <div className="text-xs overflow-hidden">
                <p className="font-medium truncate">{user?.email || 'User'}</p>
                {/* <p className="text-muted-foreground truncate">Role</p> */}
             </div>
           </div>
           {/* Collapsed state might just show icons or nothing */}
        </div>

        {/* Settings and Logout */}
        <div className="mt-3 space-y-1"> {/* Removed isCollapsed conditional classes */}
           <NavItem
             to="/settings"
             icon={Settings}
             label="Settings"
             // Removed isCollapsed prop
           />
           <Button
             variant="ghost"
             size="default" // Removed isCollapsed conditional size
             className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive" // Removed isCollapsed conditional classes
             onClick={signOut} // Use signOut directly
           >
             <LogOut size={20} className="mr-3" /> {/* Removed isCollapsed conditional class */}
             <span>Log Out</span> {/* Removed isCollapsed conditional rendering */}
           </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
