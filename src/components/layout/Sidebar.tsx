import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import SidebarHeader from './sidebar/SidebarHeader'; // Keep using SidebarHeader
import PicassoNavItem from './sidebar/PicassoNavItem'; // Use our custom Picasso NavItem
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { PicassoAvatar } from '@/components/illustrations/PicassoAvatar';
import { PicassoIllustration } from '@/components/illustrations/PicassoIllustration';
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
  ClipboardList, // Expert Panel / Tumor Board
  Settings,
  LogOut,
  Plus, // New Thread / Ask AI
  MoreVertical, // User menu
  Clock, // History icon (example)
} from 'lucide-react';

// Add interface for props to accept className
interface SidebarProps {
  className?: string;
}

// Define navigation items based on the new structure
const mainNavItems = [
  // Ask AI is handled separately now
  // { to: '/library', label: 'Library', icon: BookOpen }, // Removed Library
  { to: '/my-agents', label: 'My Agents', icon: Users, subItems: [
      { to: '/tasks', label: 'My Tasks', icon: List } // Nested Task remains
    ] 
  },
  { to: '/my-templates', label: 'Templates', icon: FileText }, // Kept Templates
  // { to: '/integrations', label: 'Integrations', icon: Zap }, // Removed Integrations
  { to: '/referrals', label: 'Referrals', icon: Gift }, // Kept Referrals
  { to: '/tumor-board', label: 'Expert Panel', icon: ClipboardList }, // Added Expert Panel
];

// Example recent chats (replace with actual data fetching)
const recentChats = [
  // { id: 'chat1', title: 'Cardiology Consult' }, // Removed
  // { id: 'chat2', title: 'Radiology Report Review' }, // Removed
];

// Update component signature to accept props
const Sidebar = ({ className }: SidebarProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get location for active state

  const handleLogout = () => {
    signOut();
    // Optional: Add toast notification
  };

  return (
    // Apply passed className and remove internal texture div
    <aside className={cn(
      "hidden lg:flex flex-col h-screen bg-[#F4F7F5] border-r border-[#E1EAE5] transition-all duration-300 ease-in-out w-60", // Removed relative positioning and internal texture div
      className // Apply className passed from AppLayout
    )}>
      {/* Removed internal texture div */}
      <SidebarHeader /> {/* Keep using the existing header */}

      {/* Ask AI Button */}
      <div className="px-3 pt-4 pb-2">
        <Button 
          variant="outline"
          className="w-full justify-start text-[#5A6D64] border-[#E1EAE5] font-medium hover:bg-primary/5 hover:text-primary hover:border-primary group transition-all duration-200 ease-in-out"
          onClick={() => navigate('/chat')} // Navigate to the chat page
        >
          <div className="mr-2 w-4 h-4">
              <PicassoIllustration 
                name="chat" 
                size="xs" 
                color="text-[#5A6D64]"
                className="group-hover:text-primary" // Use new primary color
            />
          </div>
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
                "flex items-center px-3 py-1.5 rounded-md text-sm font-medium group transition-all duration-200 ease-in-out", // Added font-medium default
                location.pathname === `/chat/${chat.id}` 
                  ? "bg-primary/5 text-primary font-semibold" // Use new primary color
                  : "text-[#5A6D64] hover:bg-primary/5 hover:text-primary" // Use new colors
              )}
            >
              <div className="mr-3 flex-shrink-0 w-4 h-4">
                <PicassoIllustration 
                  name="chat" 
                  size="xs" 
                  color={location.pathname === `/chat/${chat.id}` ? "text-primary" : "text-[#5A6D64]"} // Use new primary color
                  className="group-hover:text-primary" // Use new primary color
                />
              </div>
              <span className="truncate">{chat.title}</span>
            </Link>
          ))}
          {/* Optional: Add a "View all chats" link */}
          <Link 
            to="/recent-chats" // Link to the full history page
            className="flex items-center px-3 py-1.5 rounded-md text-xs font-medium group transition-all duration-200 ease-in-out text-[#92A69B] hover:bg-primary/5 hover:text-primary"
          >
            <div className="mr-3 flex-shrink-0 w-3.5 h-3.5">
              <PicassoIllustration 
                name="chart" 
                size="xs" 
                color="text-[#92A69B]"
                className="group-hover:text-primary" // Use new primary color
              />
            </div>
            <span>View all chats</span>
          </Link>
        </div>

        <Separator className="bg-[#E1EAE5] my-3" />

        {/* Main Navigation Section */}
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <React.Fragment key={item.to}>
              <PicassoNavItem
                to={item.to}
                label={item.label}
              />
              {/* Render nested items if they exist */}
              {item.subItems && item.subItems.length > 0 && (
                <div className="pl-6 space-y-1 mt-1"> {/* Indentation */}
                  {item.subItems.map((subItem) => (
                    <PicassoNavItem
                      key={subItem.to}
                      to={subItem.to}
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

      {/* Removed Decorative Illustration */}

      {/* User Profile Section */}
      <div className="border-t border-[#E1EAE5] p-3">
        <div className="flex items-center">
          <PicassoAvatar 
            email={user?.email || 'User'} 
            size="sm" 
            color="text-primary" // Use new primary color
            className="flex-shrink-0"
          />
          <div className="ml-2 overflow-hidden">
            <p className="text-sm font-medium text-[#2D3C35] truncate">
              {/* Removed user?.displayName */}
              {user?.email || 'User'} 
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 text-[#92A69B] font-medium hover:bg-primary/5 hover:text-primary transition-all duration-200 ease-in-out">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48"> {/* Adjusted width */}
              <DropdownMenuItem onSelect={() => navigate('/settings')} className="font-medium hover:bg-primary/5 hover:text-primary focus:bg-primary/5 focus:text-primary transition-all duration-200 ease-in-out">
                <div className="mr-2 w-4 h-4">
                  <PicassoIllustration 
                    name="brain" 
                    size="xs" 
                    color="text-[#5A6D64]"
                    className="group-hover:text-primary" // Use new primary color
                  />
                </div>
                Settings
              </DropdownMenuItem>
              {/* Add other user menu items here if needed */}
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleLogout} className="text-red-600 font-medium focus:text-red-600 focus:bg-red-50"> {/* Added font-medium default */}
                <div className="mr-2 w-4 h-4">
                  <PicassoIllustration 
                    name="empty" 
                    size="xs" 
                    color="text-red-600"
                  />
                </div>
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
