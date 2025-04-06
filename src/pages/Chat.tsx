import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"; // Re-import ToggleGroup
// Removed RadioGroup and Label imports
import { User, Bot } from 'lucide-react';
import ChatInput from '@/components/agents/ChatInput'; // Import the reusable ChatInput

type ChatMode = 'patient' | 'provider';
interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
}

const Chat = () => {
    const [mode, setMode] = useState<ChatMode>('provider');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Keep for potential future use
    const [loadingText, setLoadingText] = useState('Processing...'); // Keep for potential future use
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleModeChange = (value: string) => {
        if (value === 'patient' || value === 'provider') {
            setMode(value as ChatMode);
            setMessages([]);
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
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        // Main container without the outer box styling
        <div className="flex flex-col max-w-4xl mx-auto"> 
            
            {/* New Title, Subtitle, and Toggle Section */}
            <div className="pt-8 pb-4 text-center flex flex-col items-center"> 
                {/* Optional Logo Placeholder */}
                {/* <img src="/path/to/leny-logo.svg" alt="Leny Logo" className="h-10 mb-2" /> */}
                <h1 className="text-3xl font-semibold text-gray-800 mb-1">
                    Hi, I'm Leny.
                </h1>
                <div className="flex items-center justify-center gap-3 mt-1">
                    <p className="text-md text-gray-600 mr-3"> {/* Adjusted margin */}
                        How can I help you today?
                    </p>
                    {/* Reverted to ToggleGroup with enhanced styling */}
                    <ToggleGroup
                        type="single"
                        value={mode}
                        onValueChange={handleModeChange}
                        className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 border" // Container styling
                        size="sm" 
                    >
                        <ToggleGroupItem 
                            value="patient" 
                            aria-label="Toggle patient mode" 
                            className="px-3 py-1 text-xs rounded-md data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=off]:text-gray-500 data-[state=off]:hover:bg-gray-200" // Styling for on/off states
                        >
                            Patient mode
                        </ToggleGroupItem>
                        <ToggleGroupItem 
                            value="provider" 
                            aria-label="Toggle provider mode" 
                            className="px-3 py-1 text-xs rounded-md data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=off]:text-gray-500 data-[state=off]:hover:bg-gray-200" // Styling for on/off states
                        >
                            Provider mode
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </div>

            {/* Message Display Area - Removed bg-gray-50/50 */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                                    ? 'bg-primary text-white rounded-br-none'
                                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                            }`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                             {msg.sender === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center flex-shrink-0">
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
                             <div className="p-3 rounded-lg shadow-sm bg-white text-gray-500 border border-gray-100 rounded-bl-none italic">
                                 Typing...
                             </div>
                         </div>
                     </div>
                 )}
                 <div ref={messagesEndRef} /> 
            </div>

            {/* Input Area - Removed border-t */}
            <div className="p-4 bg-white relative"> 
                {/* Removed Mode Toggle Group div */}
                
                {/* Reusable ChatInput */}
                <ChatInput 
                    onSendMessage={handleSendMessage}
                    isLoading={isSending} 
                    agentName={mode === 'patient' ? 'Patient Assistant' : 'Provider Assistant'} 
                />
            </div>
            
            {/* Loading Overlay (kept outside the main chat flow div) */}
            {isLoading && (
                <div className="loading-overlay fixed inset-0 bg-white/80 flex flex-col items-center justify-center z-[2000] transition-opacity duration-300 opacity-100">
                    <div className="loading-spinner w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <div className="mt-3 font-medium text-gray-700">{loadingText}</div>
                </div>
            )}
        </div> // Close main container div
    ); // Close return statement
}; // Close component function

export default Chat; // Ensure export is clean
