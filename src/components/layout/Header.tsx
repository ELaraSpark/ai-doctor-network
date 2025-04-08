import React, { useState } from 'react';
import MobileNav from './MobileNav'; // Keep MobileNav for hamburger menu
import { cn } from '@/lib/utils';
import { History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatHistoryModal, ChatHistoryEntry } from '@/components/agents/ChatHistoryModal';

// Mock data for chat history
const mockChatHistory: ChatHistoryEntry[] = [
  {
    id: '1',
    title: 'Brucella infection diagnosis',
    preview: 'Brucella is a genus of Gram-negative, facultative intracellular bacteria responsible for brucellosis...',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: '2',
    title: 'Differential diagnosis for fever and joint pain',
    preview: 'The differential diagnosis for fever and joint pain includes infectious arthritis, rheumatoid arthritis...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
  },
  {
    id: '3',
    title: 'Treatment options for hypertension',
    preview: 'First-line medications for hypertension include thiazide diuretics, calcium channel blockers...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: '4',
    title: 'Interpreting CBC results',
    preview: 'When interpreting a Complete Blood Count (CBC), key parameters to consider include...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  },
  {
    id: '5',
    title: 'Guidelines for antibiotic stewardship',
    preview: 'Antibiotic stewardship involves selecting the appropriate antibiotic, dose, route, and duration...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
  },
];

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const handleSelectChat = (chatId: string) => {
    console.log(`Selected chat: ${chatId}`);
    // Here you would load the selected chat
    setIsHistoryModalOpen(false);
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center gap-4 px-4 md:px-6", // Removed border and background classes
        className // Keep className prop for flexibility from AppLayout
      )}
    >
      {/* Texture is now handled by AppLayout, removed from here */}
      <MobileNav /> {/* Hamburger menu for mobile */}
      
      {/* Right-aligned actions */}
      <div className="flex-1 flex justify-end items-center gap-2"> 
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsHistoryModalOpen(true)}
          className="text-muted-foreground hover:text-foreground"
          title="Chat History"
        >
          <History className="h-5 w-5" />
        </Button>
        
        {/* Chat History Modal */}
        <ChatHistoryModal 
          isOpen={isHistoryModalOpen}
          onClose={() => setIsHistoryModalOpen(false)}
          onSelectChat={handleSelectChat}
          chatHistory={mockChatHistory}
        />
      </div>
    </header>
  );
};

export default Header;
