import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout'; // Use the updated layout
// Remove Card imports if not used directly
// import { Card, CardContent } from '@/components/ui/card'; 
import { ScrollArea } from '@/components/ui/scroll-area';
// Remove Avatar imports if handled by ThreadCard
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; 
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search as SearchIcon, Trash2, Play, Pin, PinOff, ArrowUpDown, Bot } from 'lucide-react'; // Use SearchIcon alias
import { format, isToday, isYesterday, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { ThreadCard } from '@/components/library/ThreadCard'; // Import the new ThreadCard
import { EmptyState } from '@/components/library/EmptyState'; // Import EmptyState
import { CardSkeleton } from '@/components/library/CardSkeleton'; // Import skeleton

// Update data structure if needed (ThreadCard expects title, preview, date)
interface RecentChatItem {
  id: string;
  agentName: string; // Will be used as title
  lastMessage: string; // Will be used as preview
  timestamp: Date; // Will be used as date
  agentAvatar?: string; // Can be passed to ThreadCard if customized
  pinned?: boolean;
}

// Keep example data, but map it to ThreadCard props later
const now = new Date();
const initialExampleChats: RecentChatItem[] = [
  { id: '1', agentName: 'Cardiology Consult AI', lastMessage: 'Based on the ECG, consider ruling out...', timestamp: new Date(now.getTime() - 10 * 60 * 1000), agentAvatar: '/agents/cardio.jpg', pinned: true },
  { id: '5', agentName: 'Oncology Second Opinion', lastMessage: 'Reviewing the pathology report provided...', timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), agentAvatar: '', pinned: true },
  { id: '2', agentName: 'Radiology Report AI', lastMessage: 'The findings suggest moderate degenerative changes...', timestamp: new Date(now.getTime() - 60 * 60 * 1000), agentAvatar: '/agents/radiology.jpg', pinned: false },
  { id: '3', agentName: 'Pharmacology Advisor', lastMessage: 'Recommend checking for interactions with Warfarin.', timestamp: new Date(now.getTime() - 25 * 60 * 60 * 1000), agentAvatar: '/agents/pharma.jpg', pinned: false }, // Yesterday
  { id: '6', agentName: 'Neurology Consult', lastMessage: 'Differential includes migraine vs tension headache.', timestamp: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), agentAvatar: '/agents/neuro.jpg', pinned: false }, // 10 days ago
  { id: '4', agentName: 'General Practice AI', lastMessage: 'Patient presents with symptoms consistent with...', timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), agentAvatar: '/agents/gen.jpg', pinned: false }, // 2 days ago
];

// Helper function to group chats by date
const groupChatsByDate = (chats: RecentChatItem[]) => {
  // Grouping logic remains similar
  const groups: { [key: string]: RecentChatItem[] } = { Today: [], Yesterday: [], 'Previous 7 Days': [], Older: [] };
  const today = new Date();
  chats.forEach(chat => {
    if (isToday(chat.timestamp)) groups.Today.push(chat);
    else if (isYesterday(chat.timestamp)) groups.Yesterday.push(chat);
    else if (differenceInDays(today, chat.timestamp) < 7) groups['Previous 7 Days'].push(chat);
    else groups.Older.push(chat);
  });
  return groups;
};

type SortOption = 'dateDesc' | 'dateAsc' | 'nameAsc' | 'nameDesc';

const RecentChats = () => {
  const [chats, setChats] = useState<RecentChatItem[]>(initialExampleChats);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOption>('dateDesc');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  // Filter and Sort Logic
  const processedChats = useMemo(() => {
    // Simulate loading on search/sort change
    setIsLoading(true); 
    
    let filtered = chats.filter(chat =>
      chat.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortOrder) {
        case 'dateAsc': return a.timestamp.getTime() - b.timestamp.getTime();
        case 'nameAsc': return a.agentName.localeCompare(b.agentName);
        case 'nameDesc': return b.agentName.localeCompare(a.agentName);
        case 'dateDesc': 
        default: return b.timestamp.getTime() - a.timestamp.getTime();
      }
    });

    // Separate pinned after sorting
    const pinned = filtered.filter(chat => chat.pinned);
    const unpinned = filtered.filter(chat => !chat.pinned);
    
    // Simulate loading finished
    setTimeout(() => setIsLoading(false), 300); // Short delay for visual feedback

    return { pinned, unpinned };
  }, [chats, searchTerm, sortOrder]);

  // Group the unpinned chats
  const groupedUnpinnedChats = groupChatsByDate(processedChats.unpinned);

  // --- Action Handlers ---
  const handleContinueChat = (chatId: string) => { navigate(`/chat/${chatId}`); }; // Navigate to specific chat
  const handleDeleteChat = (chatId: string) => { 
    // Add confirmation dialog here ideally
    setChats(prev => prev.filter(c => c.id !== chatId)); 
    // Add API call to delete chat
  };
  const handleTogglePin = (chatId: string) => { 
    setChats(prev => prev.map(c => c.id === chatId ? { ...c, pinned: !c.pinned } : c).sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.timestamp.getTime() - a.timestamp.getTime())); // Keep pinned on top after toggle
    // Add API call to update pin status
  };

  // --- Render Logic ---
  return (
    <AppLayout>
      {/* Use container for consistent padding/width */}
      <div className="container mx-auto max-w-4xl px-4 py-6 h-full flex flex-col"> 
        <h1 className="text-2xl font-semibold text-perplexity-text-primary mb-4">Recent Chats</h1>

        {/* Search and Sort Controls - Use new styles */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-perplexity-text-tertiary pointer-events-none" />
            <Input 
              type="search" 
              placeholder="Search chat history..." 
              className="w-full rounded-full bg-perplexity-bg-hover border-perplexity-border pl-10 pr-4 py-2 text-sm focus:bg-background focus:ring-1 focus:ring-perplexity-teal focus:border-perplexity-teal" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
          <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOption)}>
            <SelectTrigger className="w-full sm:w-[180px] bg-background border-perplexity-border text-perplexity-text-secondary">
              <ArrowUpDown size={14} className="mr-2" />
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dateDesc">Date: Newest</SelectItem>
              <SelectItem value="dateAsc">Date: Oldest</SelectItem>
              <SelectItem value="nameAsc">Name: A-Z</SelectItem>
              <SelectItem value="nameDesc">Name: Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Remove outer Card, use ScrollArea directly */}
        <ScrollArea className="flex-1 -mx-4"> {/* Negative margin to extend dividers */}
          <div className="px-4"> {/* Add padding back inside ScrollArea */}
            {isLoading ? (
              <CardSkeleton count={5} />
            ) : (
              <>
                {/* Pinned Section */}
                {processedChats.pinned.length > 0 && (
                  <div className="mb-1">
                    <h3 className="text-xs font-semibold uppercase text-amber-700 px-3 py-1.5 bg-amber-50/50 border-b border-t border-amber-100">
                      Pinned
                    </h3>
                    <div className="divide-y divide-perplexity-border">
                      {processedChats.pinned.map((chat) => (
                        <ThreadCard
                          key={chat.id}
                          id={chat.id}
                          title={chat.agentName}
                          preview={chat.lastMessage}
                          date={chat.timestamp}
                          onClick={() => handleContinueChat(chat.id)}
                          onDelete={() => handleDeleteChat(chat.id)}
                          pinned={chat.pinned} // Pass pinned status
                          onPinToggle={() => handleTogglePin(chat.id)} // Pass toggle handler
                          className="group" 
                        /> // Remove children
                      ))}
                    </div>
                  </div>
                )}

                {/* Date Grouped Section */}
                {Object.entries(groupedUnpinnedChats).map(([groupName, chatsInGroup]) => (
                  chatsInGroup.length > 0 && (
                    <div key={groupName} className="mb-1">
                      <h3 className="text-xs font-semibold uppercase text-perplexity-text-tertiary px-3 py-1.5 bg-perplexity-bg-hover/50 border-b border-t border-perplexity-border">
                        {groupName}
                      </h3>
                      <div className="divide-y divide-perplexity-border">
                        {chatsInGroup.map((chat) => (
                           <ThreadCard
                            key={chat.id}
                            id={chat.id}
                            title={chat.agentName}
                            preview={chat.lastMessage}
                            date={chat.timestamp}
                            onClick={() => handleContinueChat(chat.id)}
                            onDelete={() => handleDeleteChat(chat.id)}
                            pinned={chat.pinned} // Pass pinned status
                            onPinToggle={() => handleTogglePin(chat.id)} // Pass toggle handler
                            className="group" 
                          /> // Remove children
                        ))}
                      </div>
                    </div>
                  )
                ))}

                {/* No Results Message */}
                {processedChats.pinned.length === 0 && processedChats.unpinned.length === 0 && !isLoading && (
                   <EmptyState
                      title="No chats found"
                      description={searchTerm ? 'Try adjusting your search terms.' : 'Start a new chat to see it here.'}
                      actionLabel="Ask AI"
                      onAction={() => navigate('/')}
                    />
                )}
              </>
            )}
          </div>
        </ScrollArea>
      </div>
    </AppLayout>
  );
};

export default RecentChats;
