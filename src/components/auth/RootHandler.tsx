import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Index from '@/pages/Index'; // Authenticated App main page (Chat UI)
import LandingPage from '@/pages/LandingPage'; // Public Landing Page

// This component decides whether to show the public landing page 
// or the authenticated app's main page based on auth state.
export const RootHandler = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // Show a full-page loading indicator while checking auth state
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        {/* You can use a more sophisticated spinner/skeleton here */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-perplexity-teal"></div> 
      </div>
    );
  }

  // TEMPORARY BYPASS COMMENTED OUT: Always show the authenticated Index page for testing
  // return <Index />;

  // Original logic: RESTORED
  // If user is authenticated, show the main app page (Index -> AppLayout -> Chat)
  if (user) {
    return <Index />;
  }
  
  // If user is not authenticated, show the public landing page
  return <LandingPage />;
};
