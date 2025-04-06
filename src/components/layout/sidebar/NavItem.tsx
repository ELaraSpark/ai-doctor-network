
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar components

type NavItemProps = {
  to: string;
  icon: LucideIcon;
  label: string;
  collapsed: boolean;
};

const NavItem = ({ to, icon: Icon, label, collapsed }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all",
          isActive
            ? "bg-aida-50 text-aida-700"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
          collapsed ? "justify-center" : "space-x-3"
        )
      }
    >
      {/* Conditionally render Avatar for Dashboard, otherwise render the passed Icon */}
      {to === "/dashboard" ? (
        // Define and render Avatar inline for simplicity
        <Avatar className={cn("h-5 w-5", collapsed ? "h-6 w-6" : "")}>
          <AvatarImage src="/avatar-placeholder.jpg" alt="User" className="object-cover"/>
          <AvatarFallback className={cn("text-[10px]", collapsed ? "text-xs" : "")}>U</AvatarFallback>
        </Avatar>
      ) : (
        <Icon size={20} className={collapsed ? "mx-auto" : ""} />
      )}
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

export default NavItem;
