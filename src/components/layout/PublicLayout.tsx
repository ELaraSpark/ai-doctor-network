
import React from "react";
// Removed duplicate React import
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, User, Settings, LogOut, Brain } from "lucide-react"; // Added icons
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
              {/* Simplified Logo */}
              <Link to="/" className="flex items-center text-decoration-none">
                {/* Removed icon div */}
                {/* Removed flex-col div */}
                <span className="font-bold text-2xl text-primary leading-none"> {/* Adjusted size/leading */}
                  Leny.ai
                </span>
                {/* Removed tagline span */}
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
                      <Button
                        variant="ghost"
                        className="relative h-9 w-9 rounded-full flex items-center justify-center hover:bg-gray-100" // Adjusted hover
                      >
                        <Avatar className="h-8 w-8 border border-gray-200"> {/* Adjusted border */}
                          {/* TODO: Use actual user avatar src */}
                          <AvatarImage src="/avatar-placeholder.jpg" alt={user?.email || 'User'} />
                          {/* TODO: Use actual user initials */}
                          <AvatarFallback className="bg-gray-200 text-gray-700">
                            {user?.email?.substring(0, 2).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          {/* TODO: Display actual user name/email */}
                          <p className="text-sm font-medium">{user?.email || 'My Account'}</p>
                          {/* <p className="text-xs text-muted-foreground">Role/Dept</p> */}
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                       {/* Placeholder for Recent Agents */}
                       <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                         <Brain className="mr-2 h-4 w-4" />
                         <span>Recent Agents (coming soon)</span>
                       </DropdownMenuItem>
                       <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/settings" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4 text-primary" /> {/* Adjusted color */}
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/settings" className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4 text-primary" /> {/* Adjusted color */}
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

      {/* Remove gradient from main content area if layout handles bg */}
      <main className="flex-1 bg-white"> 
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
