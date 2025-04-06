
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Search, User, Settings, LogOut, Brain, Zap } from "lucide-react"; // Added Brain, Zap icons
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import NotificationsList from "./NotificationsList";

type NavbarProps = {
  className?: string;
};

const Navbar = ({ className }: NavbarProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
  };

  return (
    <div
      className={cn(
        "h-16 border-b border-border bg-white shadow-sm flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10",
        className
      )}
    >
      <div className="flex-1 flex items-center">
        {searchOpen ? (
          <div className="max-w-md w-full animate-fadeIn">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
              <Input
                autoFocus
                type="search"
                placeholder="Search patients, records, or AI agents..."
                className="pl-10 py-2 border-blue-100 focus:border-blue-300"
                onBlur={() => setSearchOpen(false)}
              />
            </div>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Search size={18} />
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Bell size={18} />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-medical-red text-[10px] font-medium text-white">
                2
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <NotificationsList />
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full flex items-center justify-center hover:bg-blue-50"
            >
              <Avatar className="h-8 w-8 border border-blue-100">
                <AvatarImage src="/avatar-placeholder.jpg" alt="Dr. Sarah Chen" />
                <AvatarFallback className="bg-blue-100 text-blue-800">SC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Dr. Sarah Chen</p>
                <p className="text-xs text-muted-foreground">
                  Cardiology Department
                </p>
              </div>
            </DropdownMenuLabel>
            {/* Promotional Banner - Wrapped in DropdownMenuItem */}
            <DropdownMenuItem className="focus:bg-transparent cursor-default hover:bg-transparent p-0">
              <div className="flex items-center space-x-2 rounded-md bg-blue-50 p-2 text-sm text-blue-700 w-full mx-2 my-1">
                <Zap className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span className="whitespace-normal leading-tight">Save up to 70% of your time on admin tasks & docs</span>
              </div>
            </DropdownMenuItem>
             <DropdownMenuSeparator />
            {/* Link to AI Agents page */}
            <DropdownMenuItem asChild>
              <Link to="/agents" className="cursor-pointer">
                 <Brain className="mr-2 h-4 w-4 text-blue-600" />
                 <span>AI Agents</span>
               </Link>
            </DropdownMenuItem>
             {/* Removed redundant Profile link and extra separator */}
            <DropdownMenuItem asChild>
              <Link to="/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4 text-blue-600" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 hover:text-red-700 focus:text-red-700 hover:bg-red-50 focus:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
