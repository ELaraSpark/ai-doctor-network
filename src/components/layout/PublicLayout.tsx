
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

type PublicLayoutProps = {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
};

const PublicLayout = ({ 
  children, 
  showHeader = true, 
  showFooter = true 
}: PublicLayoutProps) => {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f0f5fa] to-blue-50">
      {showHeader && (
        <header className="border-b bg-white bg-opacity-80 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex items-center justify-between">
              <motion.div 
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-8 h-8 rounded-md bg-gradient-to-r from-medical-purple to-blue-500 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">LA</span>
                </div>
                <span className="font-display font-bold text-lg gradient-text">
                  LENY-AI
                </span>
              </motion.div>
              <motion.div
                className="hidden md:flex items-center space-x-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Link to="/features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
                <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button className="gradient-btn-blue text-white">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost">Log in</Button>
                    </Link>
                    <Link to="/register">
                      <Button className="gradient-btn-blue text-white">Sign up</Button>
                    </Link>
                  </>
                )}
              </motion.div>
            </nav>
          </div>
        </header>
      )}

      <main className="flex-1">
        {children}
      </main>

      {showFooter && (
        <footer className="bg-white bg-opacity-80 backdrop-blur-sm py-8">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} LENY-AI Health Technologies. All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default PublicLayout;
