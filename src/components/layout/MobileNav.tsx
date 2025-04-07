import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import SidebarHeader from './sidebar/SidebarHeader'; // Reuse SidebarHeader
import NavItem from './sidebar/NavItem'; // Reuse NavItem
import { cn } from '@/lib/utils';
import {
  Menu,
  MessageSquare,
  BookOpen,
  Users,
  FileText,
  Zap,
  Gift,
  List,
  Settings,
  LogOut,
  Plus,
  MoreVertical,
  Clock,
} from 'lucide-react';

// Define navigation items (same as Sidebar)
const mainNavItems = [
  { to: '/library', label: 'Library', icon: BookOpen },
  { to: '/my-agents', label: 'My Agents', icon: Users, subItems: [
      { to: '/tasks', label: 'My Tasks', icon: List } 
    ] 
  },
  { to: '/my-templates', label: 'Templates', icon: FileText },
  { to: '/integrations', label: 'Integrations', icon: Zap },
  { to: '/referrals', label: 'Referrals', icon: Gift },
];

// Example recent chats (should match Sidebar)
const recentChats = [
  { id: 'chat1', title: 'Cardiology Consult' },
  { id: 'chat2', title: 'Radiology Report Review' },
];

const MobileNav = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    signOut();
    // Optionally add toast notification here if needed
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* Hamburger button - visible only on small screens */}
        <Button variant="ghost" size="icon" className="lg:hidden mr-2 text-perplexity-text-secondary"> {/* Use new text color */}
          <Menu size={20} />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex flex-col w-60 bg-perplexity-bg-sidebar border-r border-perplexity-border"> {/* Match sidebar width and style */}
        {/* Replicate Sidebar structure */}
        <SidebarHeader />

        {/* Ask AI Button */}
        <div className="px-3 pt-4 pb-2">
          <SheetClose asChild>
            <Button 
              variant="outline" 
              className="w-full justify-start text-perplexity-text-secondary border-perplexity-border hover:bg-perplexity-bg-hover"
              onClick={() => navigate('/')} 
            >
              <Plus size={16} className="mr-2" />
              <span>Ask AI</span>
            </Button>
          </SheetClose>
        </div>

        <ScrollArea className="flex-1 px-3 py-2">
          {/* Recent Chats Section */}
          <div className="space-y-1 mb-3">
            {recentChats.map((chat) => (
              <SheetClose asChild key={chat.id}>
                <Link 
                  to={`/chat/${chat.id}`} 
                  className={cn(
                    "flex items-center px-3 py-1.5 rounded-md text-sm transition-colors text-perplexity-text-secondary hover:bg-perplexity-bg-hover hover:text-perplexity-text-primary",
                    location.pathname === `/chat/${chat.id}` ? "bg-perplexity-bg-active text-perplexity-teal font-medium" : ""
                  )}
                >
                  <MessageSquare size={16} className="mr-3 flex-shrink-0" />
                  <span className="truncate">{chat.title}</span>
                </Link>
              </SheetClose>
            ))}
            <SheetClose asChild>
              <Link 
                to="/recent-chats" 
                className="flex items-center px-3 py-1.5 rounded-md text-xs transition-colors text-perplexity-text-tertiary hover:bg-perplexity-bg-hover hover:text-perplexity-text-primary"
              >
                <Clock size={14} className="mr-3 flex-shrink-0" />
                <span>View all chats</span>
              </Link>
            </SheetClose>
          </div>

          <Separator className="bg-perplexity-border my-3" />

          {/* Main Navigation Section */}
          <nav className="space-y-1">
            {mainNavItems.map((item) => (
              <React.Fragment key={item.to}>
                <SheetClose asChild>
                  <NavItem
                    to={item.to}
                    icon={item.icon}
                    label={item.label}
                  />
                </SheetClose>
                {item.subItems && item.subItems.length > 0 && (
                  <div className="pl-6 space-y-1 mt-1">
                    {item.subItems.map((subItem) => (
                      <SheetClose asChild key={subItem.to}>
                        <NavItem
                          to={subItem.to}
                          icon={subItem.icon}
                          label={subItem.label}
                          isSubItem={true}
                        />
                      </SheetClose>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </nav>
        </ScrollArea>

        {/* Footer section */}
        <div className="border-t border-perplexity-border p-3">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src={"/avatar-placeholder.jpg"} alt={user?.email || 'User'} />
              <AvatarFallback className="bg-perplexity-bg-hover text-perplexity-text-secondary">
                {user?.email?.substring(0, 2).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="ml-2 overflow-hidden">
              <p className="text-sm font-medium text-perplexity-text-primary truncate">
                {user?.email || 'User'}
              </p>
            </div>
            {/* Settings and Logout are now in a dropdown */}
          </div>
          <div className="mt-2">
            <SheetClose asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-perplexity-text-secondary hover:bg-perplexity-bg-hover"
                onClick={() => navigate('/settings')}
              >
                <Settings size={16} className="mr-2" />
                Settings
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-600"
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-2" />
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
