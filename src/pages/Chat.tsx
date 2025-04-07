import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { User, Bot, Clock, FileText, Search as SearchIcon, Pill, Sparkles } from 'lucide-react'; // Use SearchIcon alias
import ChatInput from '@/components/agents/ChatInput'; // Assuming this is styled appropriately or needs update
import { cn } from '@/lib/utils'; // Import cn

interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
}

// This component now renders the core chat UI, assuming parent handles layout
const Chat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isSending, setIsSending] = useState(false);
    // isLoading and loadingText seem unused now, remove if confirmed
    // const [isLoading, setIsLoading] = useState(false); 
    // const [loadingText, setLoadingText] = useState('Processing...');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Suggestions might be styled differently or placed elsewhere in the new design
    const suggestions = [
        { text: "What's new?", icon: Clock },
        { text: "Find differential", icon: SearchIcon },
        { text: "Summarize study", icon: FileText },
        { text: "Find dose", icon: Pill },
    ];

    const handleSendMessage = (messageText: string, attachments?: File[]) => {
        // Keep existing send logic
        if (!messageText.trim() && (!attachments || attachments.length === 0)) return;
        const userMessage: ChatMessage = { sender: 'user', text: messageText };
        setMessages(prev => [...prev, userMessage]);
        setIsSending(true);
        // Simulate bot response
        setTimeout(() => {
            const botResponseText = `Simulated response for: "${userMessage.text}"`;
            const botMessage: ChatMessage = { sender: 'bot', text: botResponseText };
            setMessages(prev => [...prev, botMessage]);
            setIsSending(false);
        }, 1000 + Math.random() * 500);
    };

    useEffect(() => {
        // Scroll to bottom when new messages are added
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const showInitialState = messages.length === 0;

    // --- Sub-components for better structure ---

    const Greeting = () => (
        <div className="flex items-center gap-3 mb-6"> {/* Reduced margin */}
           {/* Use primary color */}
           <div className="text-primary"><Sparkles size={24} strokeWidth={1.5} /></div> 
           {/* Increase size, use foreground */}
           <h1 className="text-2xl font-medium text-foreground">Hi. Let's do great things together</h1> 
       </div>
    );

    const MessageDisplay = () => (
        // Use flex-1 to grow, remove border/shadow/bg - parent handles container
        <div className="w-full flex-1 overflow-y-auto space-y-4 pb-4"> 
            {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start gap-2.5 max-w-[85%]`}> {/* Increased max-width slightly */}
                   {/* Bot Avatar */}
                   {msg.sender === 'bot' && (
                     <div className="w-7 h-7 rounded-full bg-perplexity-bg-hover text-perplexity-teal flex items-center justify-center flex-shrink-0">
                       <Bot size={16} />
                     </div>
                   )}
                   {/* Message Bubble - Use theme colors and base text size */}
                   <div className={cn(
                     "p-3 rounded-lg text-base", // Use text-base
                     msg.sender === 'user' 
                       ? 'bg-primary text-primary-foreground rounded-br-none' // Use primary theme colors
                       : 'bg-muted text-foreground rounded-bl-none' // Use muted bg and foreground text
                   )}>
                       {/* TODO: Add Markdown rendering here */}
                       <p className="leading-relaxed">{msg.text}</p> {/* Ensure relaxed leading */}
                   </div>
                   {/* User Avatar (Optional) */}
                   {/* {msg.sender === 'user' && (<div className="w-7 h-7 rounded-full bg-muted text-muted-foreground flex items-center justify-center flex-shrink-0"><User size={16} /></div>)} */}
                    </div>
                </div>
            ))}
            {isSending && (
                 <div className="flex justify-start">
                   <div className="flex items-start gap-2.5">
                     {/* Use theme colors */}
                     <div className="w-7 h-7 rounded-full bg-muted text-primary flex items-center justify-center flex-shrink-0"><Bot size={16} /></div> 
                     <div className="p-3 rounded-lg bg-muted text-muted-foreground italic">Typing...</div> 
                   </div>
                 </div>
            )}
            <div ref={messagesEndRef} /> {/* For scrolling */}
        </div>
    );

    const InputArea = () => (
        // Use perplexity styles, remove extra padding/border/shadow if ChatInput handles it
        <div className="w-full bg-background pt-2"> {/* Slight top padding */}
           {/* Assuming ChatInput is updated or styles are applied here */}
           <ChatInput 
             onSendMessage={handleSendMessage} 
             isLoading={isSending} 
             agentName="Leny" 
             // Pass theme props if needed by ChatInput
           />
       </div>
    );

    const Suggestions = () => (
        // Style suggestions like Pathway/Perplexity
        <div className="flex flex-wrap justify-center gap-2 mt-4"> 
            {suggestions.map((suggestion, index) => (
                <Button 
                   key={index} 
                   variant="outline" 
                   size="sm" 
                   // Use theme colors explicitly
                   className="rounded-full px-4 py-1.5 text-sm font-normal text-muted-foreground bg-background border-border hover:bg-muted" 
                   onClick={() => handleSendMessage(suggestion.text)}
                 >
                    <suggestion.icon className="mr-1.5 h-4 w-4" /> 
                    {suggestion.text}
                </Button>
            ))}
        </div>
    );

    // Remove the outer div with max-width, let parent handle centering/width
    // Use flex-col and h-full to fill the space provided by Index.tsx
    return (
        <div className="flex flex-col h-full"> 
            {showInitialState ? (
                // Center initial state content vertically and horizontally
                <div className="flex flex-1 flex-col items-center justify-center">
                    <Greeting />
                    <div className="w-full max-w-2xl"> {/* Constrain input width */}
                      <InputArea />
                      <Suggestions />
                    </div>
                </div>
            ) : (
                // Active chat: messages grow, input stays at bottom
                <>
                    <MessageDisplay /> {/* Takes flex-1 space */}
                    <div className="w-full max-w-3xl mx-auto flex-shrink-0 px-4 pb-2"> {/* Constrain input width */}
                      <InputArea />
                    </div>
                </>
            )}
            {/* Remove loading overlay if not used */}
        </div>
    );
};

export default Chat;
