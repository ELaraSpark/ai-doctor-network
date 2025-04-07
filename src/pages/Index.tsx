import React from 'react'; // Import React
import AppLayout from "@/components/layout/AppLayout"; 
import Chat from "./Chat"; 

// This page now represents the main "Ask AI" view within the authenticated app
const Index = () => {
  
  return (
    // Use AppLayout for the authenticated view
    <AppLayout>
      {/* 
        The AppLayout already provides the main container. 
        We render the Chat component directly.
        Chat.tsx handles its internal layout and scrolling.
      */}
      {/* Add padding around the Chat component if needed */}
      <div className="h-full p-4 sm:p-6 lg:p-8 flex flex-col"> 
        <Chat /> 
      </div>
    </AppLayout>
  );
};

export default Index;
