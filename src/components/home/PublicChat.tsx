import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PicassoIllustration } from '@/components/illustrations/PicassoIllustration';
import { PicassoBackground } from '@/components/illustrations/PicassoBackground';
import { PicassoAvatar } from '@/components/illustrations/PicassoAvatar';
import { 
    getPersonalizedGreeting, 
    getMedicalJoke, 
    getMedicalFact, 
    getSpecialtyBasedSuggestions,
    getMedicalQuote,
    getHealthcareTip,
    getLoadingMessage // Import loading message utility
} from '@/lib/personalityUtils';
import { useNavigate } from 'react-router-dom';
import ChatInput from '@/components/agents/ChatInput'; // Import the shared ChatInput

interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
}

// This component renders a simplified version of the chat UI for public users
const PublicChat = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [chatInput, setChatInput] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState<string>("");
    const [currentJoke, setCurrentJoke] = useState<string>("");
    const [currentFact, setCurrentFact] = useState<string>("");
    const [currentQuote, setCurrentQuote] = useState<string>("");
    const [currentTip, setCurrentTip] = useState<string>("");
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [personalizedGreeting, setPersonalizedGreeting] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Dynamic suggestions based on specialty
    const suggestions = getSpecialtyBasedSuggestions();

    // Refined message handler for public view
    const handleSendMessage = (messageText: string, attachments?: File[]) => { // Match ChatInput signature
        if (!messageText.trim()) {
            return;
        }
        
        const userMessage: ChatMessage = { sender: 'user', text: messageText };
        
        setMessages(prev => [...prev, userMessage]);
        // ChatInput handles clearing its own state via onSendMessage callback
        setIsSending(true);
        setLoadingMessage(getLoadingMessage()); // Show a loading message

        // Simulate a brief "thinking" period
        setTimeout(() => {
            let botResponseText = "";
            // Generate a response based on the user's question
            botResponseText = `Thanks for your question about "${messageText.substring(0, 30)}...". Here's what I can tell you:

Based on medical literature, this is a common question. While I can provide general information, please note that this is not a substitute for professional medical advice.

${getHealthcareTip()}

Is there anything specific about this topic you'd like me to elaborate on?`;

            const botMessage: ChatMessage = { 
                sender: 'bot', 
                text: botResponseText
            };
            setMessages(prev => [...prev, botMessage]);
            setIsSending(false);
        }, 1200 + Math.random() * 600); // Slightly longer delay
    };

    // Removed handleKeyDown, handleInputChange, adjustTextareaHeight, and related useEffect 
    // as these are now handled by ChatInput component

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Initialize random content and personalized greeting on first load
    useEffect(() => {
        setCurrentJoke(getMedicalJoke());
        setCurrentFact(getMedicalFact());
        setCurrentQuote(getMedicalQuote());
        setCurrentTip(getHealthcareTip());
        setPersonalizedGreeting(getPersonalizedGreeting());
        
        // Auto-focus the textarea when the component mounts
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    const showInitialState = messages.length === 0;

    // Enhanced Greeting Component with personality
    const Greeting = () => (
        <div className="mb-12">
             {/* Centered the greeting text */}
            <div className="flex items-center justify-center">
                {/* Removed Logo Span */}
                <h1 className="text-[32px] font-bold text-foreground"> 
                    {personalizedGreeting} 
                </h1> 
            </div>
        </div>
    );

    const MessageDisplay = () => (
        <PicassoBackground
            pattern="abstractArt"
            color="text-primary"
            opacity={5}
            className="w-full flex-1 overflow-y-auto space-y-4 pb-4"
        >
            {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start gap-2.5 max-w-[85%]`}>
                   {msg.sender === 'bot' && (
                     <PicassoAvatar
                        name="Leny"
                        illustrationType="healing"
                        size="sm"
                        color="text-primary"
                        className="flex-shrink-0"
                     />
                   )}
                   <div className={cn(
                     "p-3 rounded-lg text-base",
                     msg.sender === 'user'
                       ? 'bg-primary text-primary-foreground rounded-br-none'
                       : 'bg-muted text-foreground rounded-bl-none'
                   )}>
                       <p className="leading-relaxed">{msg.text}</p>
                       {/* Removed sign-in button */}
                   </div>
                    </div>
                </div>
            ))}
            {isSending && (
                 <div className="flex justify-start">
                   <div className="flex items-start gap-2.5">
                     <PicassoAvatar
                        name="Leny"
                        illustrationType="brain"
                        size="sm"
                        color="text-primary"
                        className="flex-shrink-0"
                     />
                     <div className="p-3 rounded-lg bg-muted">
                        <div className="flex justify-center">
                            <PicassoIllustration
                                name="healing"
                                size="sm"
                                color="text-primary"
                                className="w-8 h-8 animate-float"
                            />
                        </div>
                     </div>
                   </div>
                 </div>
            )}
            <div ref={messagesEndRef} />
        </PicassoBackground>
    );

    // Use the shared ChatInput component
    const InputArea = ({ isAnchored = false }) => (
       <div className="w-full bg-background">
           <ChatInput
             onSendMessage={handleSendMessage} // Pass the refined handler
             isLoading={isSending}
             agentName="Leny" // Keep agent name consistent
             onTypingChange={setIsTyping}
             isAnchored={isAnchored}
             // Note: Attachments are passed to handleSendMessage but not explicitly handled in public view beyond the prompt
           />
       </div>
    );

    // Enhanced Suggestions Component with dynamic content
    const Suggestions = () => {
        const [showAllSuggestions, setShowAllSuggestions] = useState(false);
        const initialSuggestionsCount = 8;
        
        const displayedSuggestions = showAllSuggestions 
            ? suggestions 
            : suggestions.slice(0, initialSuggestionsCount);
            
        return (
            <div className="space-y-6 mt-6">
                {/* Chat suggestions */}
                <div className="flex flex-col items-center">
                    <div className="flex flex-wrap justify-center gap-3 max-h-[88px] overflow-hidden">
                        {displayedSuggestions.map((suggestion, index) => {
                            const illustrationMap: Record<string, string> = {
                                "What's the latest research": "chart",
                                "Help me interpret": "brain",
                                "What are the side effects": "stethoscope",
                                "Differential diagnosis": "healing",
                            };
                            
                            let illustrationType = "empty";
                            for (const [key, value] of Object.entries(illustrationMap)) {
                                if (suggestion.includes(key)) {
                                    illustrationType = value;
                                    break;
                                }
                            }

                            return (
                                <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="rounded-full px-4 py-2 text-sm font-medium text-foreground bg-background border-primary/50 hover:bg-primary/5 hover:border-primary hover:text-foreground group transition-colors duration-200" 
                                    // Use handleSendMessage to trigger the public flow when suggestion is clicked
                                    onClick={() => handleSendMessage(suggestion)} 
                                >
                                    <div className="mr-2 w-4 h-4">
                                        <PicassoIllustration
                                            name={illustrationType as any}
                                            size="xs"
                                            color="text-primary"
                                            className="group-hover:animate-pulse"
                                        />
                                    </div>
                                    {suggestion}
                                </Button>
                            );
                        })}
                    </div>
                    
                    {/* More/Less button */}
                    {suggestions.length > initialSuggestionsCount && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowAllSuggestions(!showAllSuggestions)}
                        >
                            {showAllSuggestions ? "Show Less" : "More Suggestions"}
                        </Button>
                    )}
                </div>
                
                {/* Fun content cards REMOVED */}
                
                {/* Medical Information box removed */}
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full">
            {showInitialState ? (
                <div className="flex flex-1 flex-col items-center justify-center p-5"> 
                    <div className="w-full max-w-[700px] flex flex-col items-center"> 
                        <Greeting />
                        <div className="w-full relative mb-[30px]">
                            {/* Pass isAnchored prop */}
                            <InputArea isAnchored={false} /> 
                        </div>
                        <div className={cn(
                            "transition-opacity duration-300",
                            isTyping ? "opacity-0" : "opacity-100"
                        )}>
                            <Suggestions />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-1 flex-col items-center overflow-hidden relative h-full"> 
                    <div className="w-full max-w-3xl flex-1 overflow-y-auto px-4 pt-4 pb-24">
                        <MessageDisplay />
                    </div>
                    <div className="w-full max-w-3xl fixed bottom-0 left-0 right-0 mx-auto bg-background p-0 border-t border-border z-10">
                         {/* Pass isAnchored prop */}
                        <InputArea isAnchored={true} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PublicChat;
