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
  Coffee, // Doctor's Lounge
} from 'lucide-react';

// Add interface for props to accept className, isCollapsed, and onMouseEnter
interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  onMouseEnter?: () => void;
}

// Define the NEW main navigation items with sub-items
const mainNavItems = [
  { to: '/chat', label: 'Ask AI', icon: MessageSquare, subItem: { to: '/recent-chats', label: 'View all chats', icon: Clock } },
  // { to: '/library', label: 'Library', icon: BookOpen }, // Removed Library again
  { to: '/my-agents', label: 'My Agents', icon: Users, subItem: { to: '/tasks', label: 'My Tasks', icon: List } },
  { to: '/my-templates', label: 'Templates', icon: FileText },
  // { to: '/integrations', label: 'Integrations', icon: Zap }, // Removed Integrations again
  { to: '/referrals', label: 'Referrals', icon: Gift },
  { to: '/tumor-board', label: 'Expert Panel', icon: ClipboardList },
  { to: '/doctors-lounge', label: 'Doctor\'s Lounge', icon: Coffee },
];


// Example recent chats (replace with actual data fetching) - This section might be removed or repurposed
const recentChats = [
  // { id: 'chat1', title: 'Cardiology Consult' }, // Removed
  // { id: 'chat2', title: 'Radiology Report Review' }, // Removed
];

// Update component signature to accept props
const Sidebar = ({ className, isCollapsed = false, onMouseEnter }: SidebarProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get location for active state

  const handleLogout = () => {
    signOut();
    // Optional: Add toast notification
  };

  return (
    // Apply passed className and remove internal texture div
    <aside 
      className={cn(
        "hidden lg:flex flex-col h-screen bg-[#F4F7F5] border-r border-[#E1EAE5] transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-60", // Adjust width based on collapsed state
        className // Apply className passed from AppLayout
      )}
      onMouseEnter={onMouseEnter} // Add mouse enter handler to expand sidebar
    >
      {/* Removed internal texture div */}
      <SidebarHeader isCollapsed={isCollapsed} /> {/* Pass isCollapsed to SidebarHeader */}

      {/* REMOVE Old Ask AI Button */}
      {/* <div className="px-3 pt-4 pb-2"> ... </div> */}

      <ScrollArea className="flex-1 px-3 py-2">
        {/* REMOVE Recent Chats Section */}
        {/* <div className="space-y-1 mb-3"> ... </div> */}
        {/* REMOVE Separator */}
        {/* <Separator className="bg-[#E1EAE5] my-3" /> */}

        {/* Main Navigation Section - RENDER AS BUTTONS */}
        <nav className="space-y-1 px-1 pt-2"> {/* Added padding */}
          {mainNavItems.map((item) => {
            // Determine active state for main item and potential sub-item
            // Fix for Ask AI button: Always consider /chat as active when on /chat path
            const isMainActive = location.pathname === item.to || 
                                (item.to === '/chat' && location.pathname === '/chat') || 
                                (item.to !== '/chat' && location.pathname.startsWith(item.to));
            const isSubItemActive = item.subItem && location.pathname.startsWith(item.subItem.to);
            const isParentActive = isMainActive || isSubItemActive; // Parent is active if itself or sub-item is active
            const showSubItem = isParentActive && item.subItem; // Show sub-item only if parent is active and sub-item exists

            return (
            <React.Fragment key={item.to}>
              <Button
                variant={isParentActive ? "outline" : "ghost"} // Use outline only when active, otherwise ghost
                className={cn(
                  "w-full font-medium group transition-all duration-200 ease-in-out mb-1", // Common styles
                  isCollapsed ? "justify-center px-2" : "justify-start", // Center when collapsed
                  isParentActive
                    ? "bg-primary/10 border-primary/50 text-primary ring-1 ring-primary/30 hover:text-white hover:bg-accent hover:border-accent/50 hover:ring-accent/30" // Active styles with white text on accent background for better contrast
                    : "text-muted-foreground hover:text-primary hover:bg-transparent" // Inactive ghost styles + text hover only, ensure no bg on hover
                )}
                onClick={() => navigate(item.to)}
                title={isCollapsed ? item.label : undefined} // Add tooltip when collapsed
              >
                <div className={cn("w-4 h-4", isCollapsed ? "mr-0" : "mr-2")}>
                  {/* Use item.icon directly */}
                  <item.icon size={16} className={cn(
                     isParentActive ? "text-primary group-hover:text-white" : "text-muted-foreground group-hover:text-primary", // Match text color state with hover effects - white for active hover
                  )} />
                </div>
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
              {/* Conditionally render sub-item - only when not collapsed */}
              {showSubItem && !isCollapsed && (
                <Link
                  to={item.subItem.to}
                  className={cn(
                    "flex items-center pl-9 pr-3 py-1.5 rounded-md text-xs font-medium group transition-all duration-200 ease-in-out mb-2", // Indented style
                    isSubItemActive
                      ? "text-primary font-semibold" // Active sub-item style
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5" // Default sub-item style
                  )}
                >
                  <div className="mr-2 w-3.5 h-3.5">
                     {/* Use item.subItem.icon directly */}
                     <item.subItem.icon size={14} className={cn(
                       isSubItemActive ? "text-primary" : "text-muted-foreground",
                       "group-hover:text-primary"
                     )} />
                  </div>
                  <span>{item.subItem.label}</span>
                </Link>
              )}
            </React.Fragment>
          )})}
        </nav>
      </ScrollArea>

      {/* Removed Decorative Illustration */}

      {/* User Profile Section - Simplified when collapsed */}
      <div className="border-t border-[#E1EAE5] p-3">
        <div className={cn("flex items-center", isCollapsed ? "justify-center" : "")}>
          <PicassoAvatar
            email={user?.email || 'User'}
            size="sm"
            color="text-primary" // Use new primary color
            className="flex-shrink-0"
          />
          
          {/* Only show these elements when not collapsed */}
          {!isCollapsed && (
            <>
              <div className="ml-2 overflow-hidden">
                <p className="text-sm font-medium text-[#2D3C35] truncate">
                  {/* Removed user?.displayName */}
                  {user?.email || 'User'}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* Use muted-foreground for default text color */}
                  <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 text-muted-foreground font-medium hover:bg-primary/5 hover:text-primary transition-all duration-200 ease-in-out">
                    <MoreVertical size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48"> {/* Adjusted width */}
                  {/* Remove custom hover/focus styles to use default */}
                  <DropdownMenuItem onSelect={() => navigate('/settings')} className="font-medium">
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
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
