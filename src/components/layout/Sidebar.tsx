import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import SidebarHeader from './sidebar/SidebarHeader'; // Keep using SidebarHeader
import NavItem from './sidebar/NavItem'; // Keep using NavItem
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MessageSquare, // Ask AI / Home
  BookOpen, // Library
  Users, // My Agents
  FileText, // Templates
  Zap, // Integrations
  Gift, // Referrals
  List, // Tasks
  Settings,
  LogOut,
  Plus, // New Thread / Ask AI
  MoreVertical, // User menu
  Clock, // History icon (example)
} from 'lucide-react';

// Define navigation items based on the new structure
const mainNavItems = [
  // Ask AI is handled separately now
  { to: '/library', label: 'Library', icon: BookOpen },
  { to: '/my-agents', label: 'My Agents', icon: Users, subItems: [
      { to: '/tasks', label: 'My Tasks', icon: List } // Nested Task
    ] 
  },
  { to: '/my-templates', label: 'Templates', icon: FileText }, // Renamed from My Templates
  { to: '/integrations', label: 'Integrations', icon: Zap },
  { to: '/referrals', label: 'Referrals', icon: Gift },
];

// Example recent chats (replace with actual data fetching)
const recentChats = [
  { id: 'chat1', title: 'Cardiology Consult' },
  { id: 'chat2', title: 'Radiology Report Review' },
];

const Sidebar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get location for active state

  const handleLogout = () => {
    signOut();
    // Optional: Add toast notification
  };

  return (
    // Use new perplexity styles
    <aside className={cn(
      "hidden lg:flex flex-col h-screen bg-perplexity-bg-sidebar border-r border-perplexity-border transition-all duration-300 ease-in-out w-60" // Adjusted width
    )}>
      <SidebarHeader /> {/* Keep using the existing header */}

      {/* Ask AI Button */}
      <div className="px-3 pt-4 pb-2">
        <Button 
          variant="outline" 
          className="w-full justify-start text-perplexity-text-secondary border-perplexity-border hover:bg-perplexity-bg-hover"
          onClick={() => navigate('/')} // Navigate to home/Ask AI page
        >
          <Plus size={16} className="mr-2" />
          <span>Ask AI</span>
          {/* Optional: Add keyboard shortcut display if needed */}
          {/* <span className="ml-auto text-xs text-perplexity-text-tertiary">⌘ K</span> */}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-2">
        {/* Recent Chats Section */}
        <div className="space-y-1 mb-3">
          {recentChats.map((chat) => (
            <Link 
              key={chat.id}
              to={`/chat/${chat.id}`} // Example route
              className={cn(
                "flex items-center px-3 py-1.5 rounded-md text-sm transition-colors text-perplexity-text-secondary hover:bg-perplexity-bg-hover hover:text-perplexity-text-primary",
                location.pathname === `/chat/${chat.id}` ? "bg-perplexity-bg-active text-perplexity-teal font-medium" : ""
              )}
            >
              <MessageSquare size={16} className="mr-3 flex-shrink-0" />
              <span className="truncate">{chat.title}</span>
            </Link>
          ))}
          {/* Optional: Add a "View all chats" link */}
          <Link 
            to="/recent-chats" // Link to the full history page
            className="flex items-center px-3 py-1.5 rounded-md text-xs transition-colors text-perplexity-text-tertiary hover:bg-perplexity-bg-hover hover:text-perplexity-text-primary"
          >
            <Clock size={14} className="mr-3 flex-shrink-0" />
            <span>View all chats</span>
          </Link>
        </div>

        <Separator className="bg-perplexity-border my-3" />

        {/* Main Navigation Section */}
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <React.Fragment key={item.to}>
              <NavItem
                to={item.to}
                icon={item.icon}
                label={item.label}
              />
              {/* Render nested items if they exist */}
              {item.subItems && item.subItems.length > 0 && (
                <div className="pl-6 space-y-1 mt-1"> {/* Indentation */}
                  {item.subItems.map((subItem) => (
                    <NavItem
                      key={subItem.to}
                      to={subItem.to}
                      icon={subItem.icon}
                      label={subItem.label}
                      isSubItem={true} // Add prop for potential styling differences
                    />
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>
      </ScrollArea>

      {/* User Profile Section */}
      <div className="border-t border-perplexity-border p-3">
        <div className="flex items-center">
          <Avatar className="h-8 w-8">
            {/* Removed user?.avatarUrl */}
            <AvatarImage src={"/avatar-placeholder.jpg"} alt={user?.email || 'User'} /> 
            <AvatarFallback className="bg-perplexity-bg-hover text-perplexity-text-secondary">
              {user?.email?.substring(0, 2).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="ml-2 overflow-hidden">
            <p className="text-sm font-medium text-perplexity-text-primary truncate">
              {/* Removed user?.displayName */}
              {user?.email || 'User'} 
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 text-perplexity-text-secondary hover:bg-perplexity-bg-hover">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48"> {/* Adjusted width */}
              <DropdownMenuItem onSelect={() => navigate('/settings')}>
                <Settings size={16} className="mr-2" />
                Settings
              </DropdownMenuItem>
              {/* Add other user menu items here if needed */}
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                <LogOut size={16} className="mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
