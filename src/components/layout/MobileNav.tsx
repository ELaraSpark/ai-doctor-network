import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose, // Import SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Clock, Users, Bookmark, Zap, List, Settings, LogOut, Gift } from 'lucide-react'; // Import necessary icons
import { cn } from '@/lib/utils';
import SidebarHeader from './sidebar/SidebarHeader'; // Reuse SidebarHeader
import NavItem from './sidebar/NavItem'; // Reuse NavItem
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Define navigation items (same as Sidebar)
const navItems = [
  { to: '/recent-chats', label: 'Recent Chats', icon: Clock },
  { to: '/my-agents', label: 'My Agents', icon: Users },
  { to: '/my-templates', label: 'My Templates', icon: Bookmark },
  { to: '/integrations', label: 'Integrations', icon: Zap },
  { to: '/tasks', label: 'Tasks', icon: List },
  { to: '/referrals', label: 'Referrals', icon: Gift },
];

const MobileNav = () => {
  const { user, signOut } = useAuth();

  // Function to handle logout and close sheet
  const handleLogout = () => {
    signOut();
    // Optionally add toast notification here if needed
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* Hamburger button - visible only on small screens */}
        <Button variant="ghost" size="icon" className="lg:hidden mr-2">
          <Menu size={20} />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex flex-col w-64 bg-card border-r"> {/* Match sidebar width and style */}
        {/* Replicate Sidebar structure */}
        <SidebarHeader />

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              // Wrap NavItem with SheetClose to close the sheet on navigation
              <SheetClose asChild key={item.to}>
                <NavItem
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                />
              </SheetClose>
            ))}
          </nav>
        </ScrollArea>

        <Separator />

        {/* Footer section */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
             <div className="flex items-center">
               <Avatar className="h-8 w-8 mr-2">
                 <AvatarImage src="/avatar-placeholder.jpg" alt={user?.email || 'User'} />
                 <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                   {user?.email?.substring(0, 2).toUpperCase() || 'U'}
                 </AvatarFallback>
               </Avatar>
               <div className="text-xs overflow-hidden">
                  <p className="font-medium truncate">{user?.email || 'User'}</p>
               </div>
             </div>
          </div>

          <div className="space-y-1">
             {/* Wrap Settings NavItem with SheetClose */}
             <SheetClose asChild>
               <NavItem
                 to="/settings"
                 icon={Settings}
                 label="Settings"
               />
             </SheetClose>
             {/* Wrap Logout Button with SheetClose */}
             <SheetClose asChild>
               <Button
                 variant="ghost"
                 size="default"
                 className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                 onClick={handleLogout}
               >
                 <LogOut size={20} className="mr-3" />
                 <span>Log Out</span>
               </Button>
             </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
