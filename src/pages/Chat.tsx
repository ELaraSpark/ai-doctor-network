import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { User, Bot, Clock, FileText, Search, Pill, Sparkles } from 'lucide-react';
import ChatInput from '@/components/agents/ChatInput';

interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
}

// This component assumes its parent provides the necessary flex container
// (flex-1, min-h-0) when rendered via Index.tsx.
const Chat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('Processing...');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const suggestions = [
        { text: "What's new?", icon: Clock },
        { text: "Find differential", icon: Search },
        { text: "Summarize study", icon: FileText },
        { text: "Find dose", icon: Pill },
    ];

    const handleSendMessage = (messageText: string, attachments?: File[]) => {
        if (!messageText.trim() && (!attachments || attachments.length === 0)) return;
        const userMessage: ChatMessage = { sender: 'user', text: messageText };
        setMessages(prev => [...prev, userMessage]);
        setIsSending(true);
        setTimeout(() => {
            const botResponseText = `Simulated response for: "${userMessage.text}"`;
            const botMessage: ChatMessage = { sender: 'bot', text: botResponseText };
            setMessages(prev => [...prev, botMessage]);
            setIsSending(false);
        }, 1000 + Math.random() * 500);
    };

    useEffect(() => {
        if (messages.length > 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const showInitialState = messages.length === 0;

    const Greeting = () => (
         <div className="flex items-center gap-3 mb-8">
            <div className="text-primary"><Sparkles size={24} strokeWidth={1.5} /></div>
            <h1 className="text-xl font-medium text-foreground">Medical knowledge at your fingertips</h1>
        </div>
    );

    const MessageDisplay = () => (
         // Handles flex growth, scrolling, padding, and spacing.
         <div className="w-full flex-1 overflow-y-auto border border-border rounded-lg bg-card shadow-sm p-4 space-y-4 mb-4">
             {messages.map((msg, index) => (
                 <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`flex items-start gap-2.5 max-w-[75%]`}>
                    {msg.sender === 'bot' && (<div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0"><Bot size={18} /></div>)}
                    <div className={`p-3 rounded-lg shadow-sm ${ msg.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-card text-foreground border border-border rounded-bl-none' }`}>
                        <p className="text-sm">{msg.text}</p>
                    </div>
                    {msg.sender === 'user' && (<div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center flex-shrink-0"><User size={18} /></div>)}
                    </div>
                </div>
            ))}
            {isSending && (
                <div className="flex justify-start"><div className="flex items-start gap-2.5"><div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0"><Bot size={18} /></div><div className="p-3 rounded-lg shadow-sm bg-card text-muted-foreground border border-border rounded-bl-none italic">Typing...</div></div></div>
            )}
             <div ref={messagesEndRef} />
        </div>
    );

    const InputCard = () => (
         // Input card itself has padding
         <div className="w-full bg-card border border-border rounded-xl shadow-md p-3 mb-2">
            <ChatInput onSendMessage={handleSendMessage} isLoading={isSending} agentName="Leny" />
        </div>
    );

    const Suggestions = () => (
        <div className="flex flex-wrap justify-center gap-3">
            {suggestions.map((suggestion, index) => (
                <Button key={index} variant="outline" size="sm" className="rounded-full text-sm h-9 px-5 font-normal text-foreground bg-card border border-border hover:bg-muted hover:border-gray-300 shadow-sm" onClick={() => handleSendMessage(suggestion.text)}>
                    <suggestion.icon className="mr-2 h-4 w-4 text-muted-foreground" />{suggestion.text}
                </Button>
            ))}
        </div>
    );

    // Root div uses flex-col and h-full to fill parent space. Max-width and mx-auto for centering.
    return (
        <div className="w-full h-full flex flex-col max-w-3xl mx-auto"> {/* Added h-full back */}
            {showInitialState ? (
                // Initial State Wrapper - Handles centering. Added flex-1 back.
                <div className="flex flex-1 flex-col items-center justify-center py-8">
                    <Greeting />
                    <InputCard />
                    <Suggestions />
                </div>
            ) : (
                // Active Chat State - Message display grows, input shrinks
                <>
                    <MessageDisplay /> {/* flex-1 and overflow-y-auto */}
                    <div className="w-full flex-shrink-0"> {/* Input section wrapper */}
                        <InputCard />
                        {/* Suggestions removed from active chat state */}
                    </div>
                </>
            )}

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
