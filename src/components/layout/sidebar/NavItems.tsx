
import React from "react";
import NavItem from "./NavItem";
import {
  LayoutDashboard,
  Brain,
  FileText,
  Users,
  Settings,
  Microscope,
  Phone,
  Monitor,
  Bell,
  ClipboardList, // Added icon for Tumor Board
  // User icon might be needed for fallback or alternative styling
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar components
import { cn } from "@/lib/utils"; // Import cn utility

type NavItemsProps = {
  collapsed: boolean;
};

const NavItems = ({ collapsed }: NavItemsProps) => {
  // Define a simple Avatar component to use as the icon
  const UserAvatarIcon = () => (
    <Avatar className={cn("h-5 w-5", collapsed ? "h-6 w-6" : "")}> {/* Adjust size based on collapsed state */}
      <AvatarImage src="/avatar-placeholder.jpg" alt="User" className="object-cover"/>
      <AvatarFallback className={cn("text-[10px]", collapsed ? "text-xs" : "")}>U</AvatarFallback> {/* Adjust fallback size */}
    </Avatar>
  );

  return (
    <nav className="px-2 space-y-3"> {/* Increased spacing from space-y-2 */}
      {/* Removed Dashboard NavItem */}
      <NavItem
        to="/agents"
        icon={Brain}
        label="AI Agents"
        collapsed={collapsed}
      />
      {/* Removed AI Experts NavItem */}
      <NavItem
        to="/patients"
        icon={FileText}
        label="Patient Records"
        collapsed={collapsed}
      />
      <NavItem
        to="/followup-scheduler"
        icon={Phone}
        label="Follow-up Calls"
        collapsed={collapsed}
      />
      {/* Removed Call Monitoring NavItem */}
      <NavItem
        to="/collaboration"
        icon={Users}
        label="Collaboration"
        collapsed={collapsed}
      />
      <NavItem
        to="/tumor-board" // Route path kept for now
        icon={ClipboardList}
        label="Expert Panel" // Changed label
        collapsed={collapsed}
      />
      <NavItem
        to="/notifications"
        icon={Bell}
        label="Notifications"
        collapsed={collapsed}
      />
    </nav>
  );
};

export default NavItems;
