import React, { useState, useMemo } from 'react'; // Import useMemo
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Added Select components
import { Bot, User, Search, Trash2, Play, Pin, PinOff, ArrowUpDown } from 'lucide-react'; // Added ArrowUpDown
import { format, isToday, isYesterday, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';

// Example data structure
interface RecentChatItem {
  id: string;
  agentName: string;
  lastMessage: string;
  timestamp: Date;
  agentAvatar?: string;
  pinned?: boolean;
}

// Initial example data
const now = new Date();
const initialExampleChats: RecentChatItem[] = [
  { id: '1', agentName: 'Cardiology Consult AI', lastMessage: 'Based on the ECG, consider ruling out...', timestamp: new Date(now.getTime() - 10 * 60 * 1000), agentAvatar: '/agents/cardio.jpg', pinned: true },
  { id: '5', agentName: 'Oncology Second Opinion', lastMessage: 'Reviewing the pathology report provided...', timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), agentAvatar: '', pinned: true },
  { id: '2', agentName: 'Radiology Report AI', lastMessage: 'The findings suggest moderate degenerative changes...', timestamp: new Date(now.getTime() - 60 * 60 * 1000), agentAvatar: '/agents/radiology.jpg', pinned: false },
  { id: '3', agentName: 'Pharmacology Advisor', lastMessage: 'Recommend checking for interactions with Warfarin.', timestamp: new Date(now.getTime() - 25 * 60 * 60 * 1000), agentAvatar: '/agents/pharma.jpg', pinned: false }, // Yesterday
  { id: '6', agentName: 'Neurology Consult', lastMessage: 'Differential includes migraine vs tension headache.', timestamp: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), agentAvatar: '/agents/neuro.jpg', pinned: false }, // 10 days ago
  { id: '4', agentName: 'General Practice AI', lastMessage: 'Patient presents with symptoms consistent with...', timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), agentAvatar: '/agents/gen.jpg', pinned: false }, // 2 days ago
];

// Helper function to group chats by date (unchanged)
const groupChatsByDate = (chats: RecentChatItem[]) => {
  const groups: { [key: string]: RecentChatItem[] } = { Today: [], Yesterday: [], 'Previous 7 Days': [], Older: [] };
  const today = new Date();
  chats.forEach(chat => {
    if (isToday(chat.timestamp)) groups.Today.push(chat);
    else if (isYesterday(chat.timestamp)) groups.Yesterday.push(chat);
    else if (differenceInDays(today, chat.timestamp) < 7) groups['Previous 7 Days'].push(chat);
    else groups.Older.push(chat);
  });
  // No sorting here, handled separately by useMemo
  return groups;
};

type SortOption = 'dateDesc' | 'dateAsc' | 'nameAsc' | 'nameDesc';

const RecentChats = () => {
  const [chats, setChats] = useState<RecentChatItem[]>(initialExampleChats);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOption>('dateDesc'); // Default sort
  const navigate = useNavigate();

  // Filter and Sort Logic using useMemo for optimization
  const processedChats = useMemo(() => {
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
        case 'dateDesc': // Fallthrough default
        default: return b.timestamp.getTime() - a.timestamp.getTime();
      }
    });

    // Separate pinned after sorting
    const pinned = filtered.filter(chat => chat.pinned);
    const unpinned = filtered.filter(chat => !chat.pinned);

    return { pinned, unpinned };
  }, [chats, searchTerm, sortOrder]);

  // Group the unpinned chats
  const groupedUnpinnedChats = groupChatsByDate(processedChats.unpinned);

  const handleContinueChat = (chatId: string) => { navigate('/'); };
  const handleDeleteChat = (chatId: string) => { setChats(prev => prev.filter(c => c.id !== chatId)); };
  const handleTogglePin = (chatId: string) => { setChats(prev => prev.map(c => c.id === chatId ? { ...c, pinned: !c.pinned } : c)); };
  const formatTimestamp = (timestamp: Date): string => {
    if (isToday(timestamp)) return format(timestamp, 'p');
    if (isYesterday(timestamp)) return 'Yesterday';
    return format(timestamp, 'MMM d');
  };

  // Reusable component for rendering a chat item
  const ChatListItem = ({ chat }: { chat: RecentChatItem }) => (
     <div key={chat.id} className={cn("flex items-center p-3 group", chat.pinned ? "bg-amber-50/50 hover:bg-amber-50/80" : "hover:bg-gray-50")}>
       <Avatar className="h-9 w-9 mr-3">
         <AvatarImage src={chat.agentAvatar} alt={chat.agentName} />
         <AvatarFallback className="bg-primary/10 text-primary text-xs">
           <Bot size={18} />
         </AvatarFallback>
       </Avatar>
       <div className="flex-1 min-w-0 cursor-pointer" onClick={() => handleContinueChat(chat.id)}>
          <p className="text-sm font-medium text-gray-900 truncate">{chat.agentName}</p>
          <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
        </div>
        {/* Stack timestamp/buttons vertically on mobile, row on sm+ */}
        {/* Always visible on mobile, hover visible on sm+ */}
        <div className="ml-auto sm:ml-3 flex flex-col sm:flex-row items-end sm:items-center space-y-1 sm:space-y-0 sm:space-x-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
           {/* Allow timestamp to wrap on mobile */}
           <span className="text-xs text-gray-400 sm:whitespace-nowrap sm:mr-1">{formatTimestamp(chat.timestamp)}</span>
           {/* Button container */}
           <div className="flex space-x-1">
             <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-amber-600 hover:bg-amber-100/50" onClick={(e) => { e.stopPropagation(); handleTogglePin(chat.id); }}>
                {chat.pinned ? <PinOff size={14} className="text-amber-600" /> : <Pin size={14} />}
             </Button>
             <Button variant="ghost" size="icon" className="h-7 w-7 text-primary hover:bg-primary/10" onClick={(e) => { e.stopPropagation(); handleContinueChat(chat.id); }}>
                <Play size={14} />
             </Button>
             <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:bg-destructive/10" onClick={(e) => { e.stopPropagation(); handleDeleteChat(chat.id); }}>
                <Trash2 size={14} />
             </Button>
           </div>
           {/* Removed extra </Button> here, added missing one above */}
        </div>
      </div>
  );

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 h-full flex flex-col">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Recent Chats</h1>

        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search chat history..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOption)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <ArrowUpDown size={14} className="mr-2 text-muted-foreground" />
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

        <Card className="flex-1 flex flex-col overflow-hidden">
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full">
              {/* Pinned Section */}
              {processedChats.pinned.length > 0 && (
                <div className="mb-1 last:mb-0">
                  <h3 className="text-xs font-semibold uppercase text-amber-700 px-3 py-1.5 bg-amber-50 border-b border-t border-amber-100">
                    Pinned
                  </h3>
                  <div className="divide-y divide-amber-100">
                    {processedChats.pinned.map((chat) => <ChatListItem key={chat.id} chat={chat} />)}
                  </div>
                </div>
              )}

              {/* Date Grouped Section */}
              {Object.entries(groupedUnpinnedChats).map(([groupName, chatsInGroup]) => (
                chatsInGroup.length > 0 && (
                  <div key={groupName} className="mb-1 last:mb-0">
                    <h3 className="text-xs font-semibold uppercase text-muted-foreground px-3 py-1.5 bg-muted/50 border-b border-t">
                      {groupName}
                    </h3>
                    <div className="divide-y divide-gray-200">
                      {chatsInGroup.map((chat) => <ChatListItem key={chat.id} chat={chat} />)}
                    </div>
                  </div>
                )
              ))}

              {/* No Results Message */}
              {processedChats.pinned.length === 0 && processedChats.unpinned.length === 0 && (
                 <p className="text-gray-500 text-sm p-6 text-center">
                   {searchTerm ? 'No matching chats found.' : 'No recent chats yet.'}
                 </p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default RecentChats;
