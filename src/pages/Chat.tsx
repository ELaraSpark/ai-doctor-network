import React, { useState, useRef, useCallback, useEffect } from 'react';
// Using Button for toggle options for consistency
import { Button } from "@/components/ui/button"; 
// Added Sparkles icon for greeting and relevant suggestion icons
import { User, Bot, Clock, FileText, Search, Pill, Sparkles } from 'lucide-react'; 
import ChatInput from '@/components/agents/ChatInput'; // ChatInput contains only the internal elements

type ChatMode = 'patient' | 'provider';
interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
}

const Chat = () => {
    const [mode, setMode] = useState<ChatMode>('provider');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const [loadingText, setLoadingText] = useState('Processing...'); 
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Placeholder suggestions from example
    const suggestions = [
        { text: "What's new?", icon: Clock },
        { text: "Find differential", icon: Search },
        { text: "Summarize study", icon: FileText },
        { text: "Find dose", icon: Pill },
    ];

    const handleModeChange = (value: ChatMode) => {
        if (mode !== value) {
            setMode(value);
            setMessages([]); // Clear messages on mode change
        }
    };

    const handleSendMessage = (messageText: string, attachments?: File[]) => { 
        if (!messageText.trim() && (!attachments || attachments.length === 0)) return;

        const userMessage: ChatMessage = { sender: 'user', text: messageText };
        setMessages(prev => [...prev, userMessage]);
        setIsSending(true); 

        // Simulate bot response
        setTimeout(() => {
            const botResponseText = `Simulated response in ${mode} mode for: "${userMessage.text}"`;
            const botMessage: ChatMessage = { sender: 'bot', text: botResponseText };
            setMessages(prev => [...prev, botMessage]);
            setIsSending(false);
        }, 1000 + Math.random() * 500);
    };

    // Scroll effect
    useEffect(() => {
        // Only scroll if there are messages
        if (messages.length > 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const showInitialState = messages.length === 0;

    // Mode Toggle Component - Fixed Top Left
    const ModeToggle = () => (
        <div className="fixed top-4 left-4 z-50 flex bg-card rounded-md overflow-hidden shadow-md border border-border"> {/* Fixed Top Left */}
            <button 
                onClick={() => handleModeChange('patient')}
                className={`px-4 py-2 text-sm transition-colors duration-200 ${mode === 'patient' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
            >
                Patient
            </button>
            <button 
                onClick={() => handleModeChange('provider')}
                className={`px-4 py-2 text-sm transition-colors duration-200 ${mode === 'provider' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
            >
                Provider
            </button>
        </div>
    );

    // Greeting Component
    const Greeting = () => (
         <div className="flex items-center gap-3 mb-8">
            <div className="text-primary"> {/* Use project's primary color */}
                <Sparkles size={24} strokeWidth={1.5} />
            </div>
            <h1 className="text-xl font-medium text-foreground"> {/* Adjusted size */}
                Medical knowledge at your fingertips
            </h1>
        </div>
    );

    // Message Display Component - Renders the scrollable message list
    const MessageDisplay = () => (
         // This div fills the available space and scrolls internally
         // Added min-h-0 to prevent flex item from overflowing parent
         <div className="w-full flex-1 overflow-y-auto space-y-4 mb-4 p-4 border border-border rounded-lg bg-card shadow-sm min-h-0"> 
            {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start gap-2.5 max-w-[75%]`}>
                    {msg.sender === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            <Bot size={18} />
                        </div>
                    )}
                    <div className={`p-3 rounded-lg shadow-sm ${
                        msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-none'
                            : 'bg-card text-foreground border border-border rounded-bl-none' 
                    }`}>
                        <p className="text-sm">{msg.text}</p>
                    </div>
                    {msg.sender === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center flex-shrink-0"> 
                            <User size={18} />
                        </div>
                    )}
                    </div>
                </div>
            ))}
            {isSending && (
                <div className="flex justify-start">
                    <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            <Bot size={18} />
                        </div>
                        <div className="p-3 rounded-lg shadow-sm bg-card text-muted-foreground border border-border rounded-bl-none italic">
                            Typing...
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} /> 
        </div>
    );

    // Input Card Component
    const InputCard = () => (
         <div className="w-full bg-card border border-border rounded-xl shadow-md p-3 mb-2"> {/* Reduced mb */}
            <ChatInput 
                onSendMessage={handleSendMessage}
                isLoading={isSending} 
                agentName="Leny" // Default name
            />
        </div>
    );

    // Suggestions Component
    const Suggestions = () => (
        <div className="flex flex-wrap justify-center gap-3">
            {suggestions.map((suggestion, index) => (
                <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="rounded-full text-sm h-9 px-5 font-normal text-foreground bg-card border border-border hover:bg-muted hover:border-gray-300 shadow-sm" 
                    onClick={() => handleSendMessage(suggestion.text)} 
                >
                    <suggestion.icon className="mr-2 h-4 w-4 text-muted-foreground" /> 
                    {suggestion.text}
                </Button>
            ))}
        </div>
    );

    return (
        // Main container: Full screen height, flex column, overflow hidden. Padding top for fixed toggle.
        <div className="flex flex-col h-screen bg-background pt-16 px-4 pb-4 overflow-hidden"> 
            
            <ModeToggle /> {/* Fixed position toggle top-left */}

            {/* Content container: centers horizontally, takes full height, handles vertical layout & overflow */}
            {/* Removed flex-grow, added h-full */}
            <div className={`w-full max-w-3xl mx-auto flex flex-col items-center h-full overflow-hidden ${showInitialState ? 'justify-center' : ''}`}>
                
                {/* Initial State: Centered Greeting, Input, Suggestions */}
                {showInitialState && (
                    <div className="flex flex-col items-center"> {/* Wrapper for initial state */}
                        <Greeting />
                        <InputCard />
                        <Suggestions />
                    </div>
                )}

                {/* Active Chat State: Messages take space, Input/Suggestions at bottom */}
                {!showInitialState && (
                    <>
                        <MessageDisplay /> {/* Has flex-1 and overflow-y-auto */}
                        <div className="w-full flex-shrink-0"> {/* Wrapper for bottom elements */}
                          <InputCard />
                          <Suggestions />
                        </div>
                    </>
                )}

            </div>

            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-background/80 flex flex-col items-center justify-center z-[60]"> 
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <div className="mt-3 font-medium text-foreground">{loadingText}</div>
                </div>
            )}
        </div> 
    ); 
}; 

export default Chat;
