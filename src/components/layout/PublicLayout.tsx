
import React from "react";
// Removed duplicate React import
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
// Added new icons: Clock, Search, Users, Bookmark, Zap, List, Gift
import { User, Settings, LogOut, Brain, Clock, Search as SearchIcon, Users as UsersIcon, Bookmark, Zap, List, Gift } from "lucide-react"; // Added Gift
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Added DropdownMenu components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Added Avatar components
import { useToast } from "@/hooks/use-toast"; // Added useToast

type PublicLayoutProps = {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  forceHideHeader?: boolean; // New prop
};

const PublicLayout = ({ 
  children, 
  showHeader = true, 
  showFooter = true,
  forceHideHeader = false // Default to false
}: PublicLayoutProps) => {
  const { user, signOut } = useAuth(); // Added signOut
  const isAuthenticated = !!user;
  const navigate = useNavigate(); // Added navigate
  const { toast } = useToast(); // Added toast

  const handleLogout = () => {
    signOut();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
    // Navigate to home or login after logout from public page
    navigate("/");
  };


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f0f5fa] to-blue-50">
      {/* Conditionally render header based on showHeader AND forceHideHeader */}
      {showHeader && !forceHideHeader && ( 
        // Updated header styles: sticky, white bg, border
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
          {/* Use max-w-screen-xl for consistency if needed, or keep container */}
          <div className="container mx-auto px-6"> 
            {/* Reduced padding py-3 */}
            <nav className="flex items-center justify-between py-3">
              {/* Logo Link */}
              <Link to="/" className="flex items-center text-decoration-none">
                <span className="font-bold text-2xl text-primary leading-none"> 
                  Leny.ai
                </span>
              </Link>
              
              {/* Updated Nav Links */}
              <div className="hidden md:flex items-center gap-8"> {/* Increased gap */}
                <Link to="/features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
                {/* Added Link to the new Tool */}
                <Link to="/tools/document-transformer" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Tools</Link> 
                {/* Removed About Us link */}
              </div>

              {/* Updated User Actions */}
              <div className="flex items-center gap-3"> {/* Reduced gap */}
                {isAuthenticated ? (
                  // Render Avatar Dropdown if authenticated
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      {/* Using Avatar directly as trigger */}
                      <Avatar className="h-9 w-9 border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity">
                        {/* TODO: Use actual user avatar src */}
                        <AvatarImage src="/avatar-placeholder.jpg" alt={user?.email || 'User'} />
                        {/* TODO: Use actual user initials */}
                        <AvatarFallback className="bg-gray-200 text-gray-700 font-medium">
                          {user?.email?.substring(0, 2).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    {/* Adjusted width w-64 */}
                    <DropdownMenuContent align="end" className="w-64 border border-gray-200 shadow-lg rounded-lg">
                      {/* User Info Section */}
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                             <AvatarImage src="/avatar-placeholder.jpg" alt={user?.email || 'User'} />
                             <AvatarFallback className="bg-gray-200 text-gray-700 font-medium">
                               {user?.email?.substring(0, 2).toUpperCase() || 'U'}
                             </AvatarFallback>
                          </Avatar>
                          <div>
                            {/* TODO: Replace with actual user name */}
                            <div className="font-medium text-sm">Medical User</div>
                            <div className="text-xs text-gray-500">{user?.email || 'user@hospital.org'}</div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items Section */}
                      <div className="py-2">
                        {/* Updated items to use Link */}
                        <DropdownMenuItem asChild>
                          <Link to="/recent-chats" className="cursor-pointer">
                            <Clock size={16} className="mr-3 text-gray-500" />
                            <span>Recent Chats</span>
                          </Link>
                        </DropdownMenuItem>
                        {/* Removed Recent Searches */}
                        <DropdownMenuItem asChild>
                           <Link to="/my-agents" className="cursor-pointer">
                             <UsersIcon size={16} className="mr-3 text-gray-500" />
                             <span>My Agents</span>
                           </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                           <Link to="/my-templates" className="cursor-pointer"> {/* Updated path */}
                             <Bookmark size={16} className="mr-3 text-gray-500" />
                             <span>My Templates</span> {/* Updated label */}
                           </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                           <Link to="/integrations" className="cursor-pointer">
                             <Zap size={16} className="mr-3 text-gray-500" />
                             <span>Integrations</span>
                           </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                           <Link to="/tasks" className="cursor-pointer">
                             <List size={16} className="mr-3 text-gray-500" />
                             <span>Tasks</span>
                           </Link>
                        </DropdownMenuItem>
                        {/* Added Referrals Link */}
                        <DropdownMenuItem asChild>
                           <Link to="/referrals" className="cursor-pointer">
                             <Gift size={16} className="mr-3 text-gray-500" />
                             <span>Referrals</span>
                           </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/settings" className="cursor-pointer">
                            <Settings size={16} className="mr-3 text-gray-500" />
                            <span>Settings</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 hover:text-red-700 focus:text-red-700 hover:bg-red-50 focus:bg-red-50">
                          <LogOut size={16} className="mr-3" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </div>

                      {/* Pro Upgrade Banner */}
                      <div className="p-3 bg-gray-50 border-t border-gray-200 text-xs rounded-b-lg">
                        <div className="font-medium mb-1">Free Plan</div>
                        {/* TODO: Link this button */}
                        <button className="text-primary font-medium hover:underline">Upgrade to Pro</button>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  // Render Login/Signup if not authenticated
                  <>
                    <Link to="/login">
                      {/* Use base Button and add specific classes */}
                      <Button variant="ghost" className="text-sm font-semibold rounded-lg px-4 py-2.5 text-gray-600 hover:bg-gray-100">Log in</Button>
                    </Link>
                    <Link to="/register">
                      {/* Use base Button and add specific classes */}
                      <Button className="bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-lg px-4 py-2.5">Sign up</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </header>
      )}

      {/* Main content area needs min-h-0 for nested flex-1 children. Removed overflow-hidden. */}
      <main className="flex-1 bg-white min-h-0">
        {children}
      </main>

      {showFooter && (
        // Updated footer styles: white bg, top border
        <footer className="bg-white border-t border-gray-200 pt-10 pb-5">
          <div className="container mx-auto px-6">
            {/* Footer columns */}
            <div className="flex flex-wrap justify-between gap-8 mb-8">
              <div className="w-full sm:w-1/2 md:w-auto">
                <h3 className="text-base font-semibold mb-5 text-gray-800">Support</h3>
                <ul className="space-y-3">
                  <li><Link to="/help" className="text-sm text-gray-600 hover:underline">Help Center</Link></li>
                  <li><Link to="/privacy" className="text-sm text-gray-600 hover:underline">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-sm text-gray-600 hover:underline">Terms of Service</Link></li>
                  <li><Link to="/contact" className="text-sm text-gray-600 hover:underline">Contact Us</Link></li>
                </ul>
              </div>
              <div className="w-full sm:w-1/2 md:w-auto">
                <h3 className="text-base font-semibold mb-5 text-gray-800">Features</h3>
                <ul className="space-y-3">
                  <li><Link to="/features#agents" className="text-sm text-gray-600 hover:underline">AI Agents</Link></li> {/* Updated text and potentially link fragment */}
                  <li><Link to="/features#transcription" className="text-sm text-gray-600 hover:underline">Medical Transcription</Link></li>
                  <li><Link to="/features#research" className="text-sm text-gray-600 hover:underline">Research Assistance</Link></li>
                  <li><Link to="/features#analytics" className="text-sm text-gray-600 hover:underline">Healthcare Analytics</Link></li>
                </ul>
              </div>
              <div className="w-full sm:w-1/2 md:w-auto">
                <h3 className="text-base font-semibold mb-5 text-gray-800">About</h3>
                <ul className="space-y-3">
                  <li><Link to="/about#story" className="text-sm text-gray-600 hover:underline">Our Story</Link></li>
                  <li><Link to="/careers" className="text-sm text-gray-600 hover:underline">Careers</Link></li>
                  <li><Link to="/press" className="text-sm text-gray-600 hover:underline">Press</Link></li>
                  <li><Link to="/blog" className="text-sm text-gray-600 hover:underline">Blog</Link></li>
                </ul>
              </div>
            </div>
            {/* Copyright */}
            <div className="border-t border-gray-200 pt-6 mt-8 text-center">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} LENY-AI, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default PublicLayout;
