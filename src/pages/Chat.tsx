import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { User, Bot, Clock, FileText, Search as SearchIcon, Pill, Sparkles, Coffee, Brain } from 'lucide-react'; // Added more icons
import ChatInput from '@/components/agents/ChatInput'; // Assuming this is styled appropriately or needs update
import { cn } from '@/lib/utils'; // Import cn
import { PicassoIllustration } from '@/components/illustrations/PicassoIllustration';
import { PicassoBackground } from '@/components/illustrations/PicassoBackground';
import { PicassoAvatar } from '@/components/illustrations/PicassoAvatar';
import { AnimatedIllustration, LoadingIllustration } from '@/components/illustrations/AnimatedIllustration';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth to get user info
import { 
    getPersonalizedGreeting, 
    getMedicalJoke, 
    getLoadingMessage, 
    getMedicalFact, 
    getSpecialtyBasedSuggestions,
    getMedicalQuote,
    getHealthcareTip
} from '@/lib/personalityUtils'; // Import our new personality utilities

interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
}

// This component now renders the core chat UI, assuming parent handles layout
const Chat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState<string>("");
    const [showJoke, setShowJoke] = useState<boolean>(false);
    const [currentJoke, setCurrentJoke] = useState<string>("");
    const [currentFact, setCurrentFact] = useState<string>("");
    const [currentQuote, setCurrentQuote] = useState<string>("");
    const [currentTip, setCurrentTip] = useState<string>("");
    // This state is only used to control the visibility of suggestions, not the greeting
    const [isTyping, setIsTyping] = useState<boolean>(false);
    // Store the personalized greeting in state so it doesn't change during the session
    const [personalizedGreeting, setPersonalizedGreeting] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth(); // Get user from auth context

    // Get user's first name from email (temporary until we have proper user profiles)
    const getUserFirstName = () => {
        if (!user?.email) return undefined;
        // Extract name from email (e.g., john.doe@example.com -> John)
        const emailName = user.email.split('@')[0].split('.')[0];
        return emailName.charAt(0).toUpperCase() + emailName.slice(1);
    };

    // Dynamic suggestions based on specialty (could be expanded to use user's actual specialty)
    const suggestions = getSpecialtyBasedSuggestions();

    // Restore original handleSendMessage logic with added logging
    const handleSendMessage = (messageText: string, attachments?: File[]) => {
        console.log("[Chat.tsx] handleSendMessage START", { messageText, attachments });
        if (!messageText.trim() && (!attachments || attachments.length === 0)) {
            console.log("[Chat.tsx] handleSendMessage: Empty message, returning.");
            return;
        }
        
        const userMessage: ChatMessage = { sender: 'user', text: messageText };
        
        console.log("[Chat.tsx] handleSendMessage: Setting user message and isSending=true");
        try {
            setMessages(prev => [...prev, userMessage]);
            setIsSending(true);
            // Set a random loading message
            setLoadingMessage(getLoadingMessage());
        } catch (error) {
            console.error("[Chat.tsx] handleSendMessage: Error during initial state update:", error);
            // Optionally add user feedback here if state update fails
            return; // Stop processing if initial state update fails
        }

        console.log("[Chat.tsx] handleSendMessage: Simulating bot response with setTimeout...");
        // Simulate bot response
        setTimeout(() => {
            console.log("[Chat.tsx] handleSendMessage: setTimeout callback START");
            try {
                const botResponseText = `Simulated response for: "${userMessage.text}"`;
                const botMessage: ChatMessage = { sender: 'bot', text: botResponseText };
                
                console.log("[Chat.tsx] handleSendMessage: Setting bot message and isSending=false");
                setMessages(prev => [...prev, botMessage]);
                setIsSending(false);
                console.log("[Chat.tsx] handleSendMessage: setTimeout callback END");
            } catch (error) {
                 console.error("[Chat.tsx] handleSendMessage: Error during bot response state update:", error);
                 setIsSending(false); // Ensure loading state is reset even on error
            }
        }, 1000 + Math.random() * 500);
        console.log("[Chat.tsx] handleSendMessage END (after setTimeout setup)");
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Initialize random content and personalized greeting on first load
    useEffect(() => {
        setCurrentJoke(getMedicalJoke());
        setCurrentFact(getMedicalFact());
        setCurrentQuote(getMedicalQuote());
        setCurrentTip(getHealthcareTip());
        // Set the personalized greeting once on component mount
        setPersonalizedGreeting(getPersonalizedGreeting(getUserFirstName()));
    }, []);

    const showInitialState = messages.length === 0;

    // Enhanced Greeting Component with personality
    const Greeting = () => (
        <div className="mb-12"> {/* Removed text-center */}
            {/* Flex container to place illustration next to text */}
            <div className="flex items-center justify-center gap-4"> {/* Added flex container */}
                {/* Decorative element */}
                <div className="text-primary"> {/* Use new primary color */}
                    <PicassoIllustration
                        name="healing"
                        size="lg"
                        color="text-primary"
                        className="animate-float" // Removed mx-auto
                    />
                </div>
                 {/* Personal greeting */}
                 <h1 className="text-[32px] font-bold text-foreground"> {/* Ensured font-bold */}
                     {personalizedGreeting || getPersonalizedGreeting(getUserFirstName())}
                 </h1>
             </div>
        </div>
    );

    const MessageDisplay = () => (
        <PicassoBackground
            pattern="abstractArt" // Use the new Picasso-style pattern
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
                        <div className="flex flex-col gap-2">
                            <LoadingIllustration type="ai" size="sm" />
                            <p className="text-sm text-muted-foreground italic">{loadingMessage}</p>
                        </div>
                     </div>
                   </div>
                 </div>
            )}
            <div ref={messagesEndRef} />
        </PicassoBackground>
    );

    const InputArea = ({ isAnchored = false }) => (
        <div className="w-full bg-background">
           <ChatInput
             onSendMessage={handleSendMessage}
             isLoading={isSending}
             agentName="Leny"
             onTypingChange={setIsTyping}
             isAnchored={isAnchored}
           />
       </div>
    );

    // Enhanced Suggestions Component with dynamic content and "More" button
    const Suggestions = () => {
        const [showAllSuggestions, setShowAllSuggestions] = useState(false);
        const initialSuggestionsCount = 8; // Show approximately 2 lines of suggestions initially
        
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
                            
                            // Find the matching illustration based on text content
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
                                    // Make default border more visible (primary with 50% opacity) and darken on hover
                                    className="rounded-full px-4 py-2 text-sm font-medium text-foreground bg-background border-primary/50 hover:bg-primary/5 hover:border-primary hover:text-foreground group transition-colors duration-200" 
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
                
                {/* Fun content cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                    {/* Medical Fact Card */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-100 rounded-full p-2 text-blue-700">
                                <Brain size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-blue-800 mb-1">Did You Know?</h3>
                                <p className="text-sm text-blue-700">{currentFact}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Medical Joke Card */}
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="bg-amber-100 rounded-full p-2 text-amber-700">
                                <Sparkles size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-amber-800 mb-1">Medical Humor</h3>
                                <p className="text-sm text-amber-700">{currentJoke}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Healthcare Tip Card */}
                    <div className="bg-green-50 border border-green-100 rounded-xl p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="bg-green-100 rounded-full p-2 text-green-700">
                                <Coffee size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-green-800 mb-1">Healthcare Pro Tip</h3>
                                <p className="text-sm text-green-700">{currentTip}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Quote Card */}
                    <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="bg-purple-100 rounded-full p-2 text-purple-700">
                                <FileText size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-purple-800 mb-1">Words of Wisdom</h3>
                                <p className="text-sm text-purple-700">{currentQuote}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Refresh button for fun content */}
                <div className="flex justify-center">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => {
                            setCurrentJoke(getMedicalJoke());
                            setCurrentFact(getMedicalFact());
                            setCurrentQuote(getMedicalQuote());
                            setCurrentTip(getHealthcareTip());
                        }}
                    >
                        Refresh content
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full">
            {showInitialState ? (
                // Re-applying flex properties to center content vertically and horizontally
                <div className="flex flex-1 flex-col items-center justify-center p-5"> 
                    {/* Background is handled by AppLayout */}
                    <div className="w-full max-w-[700px] flex flex-col items-center"> 
                        <Greeting />
                        <div className="w-full relative mb-[30px]">
                            <InputArea isAnchored={false} />
                        </div>
                        {/* Only fade out suggestions, not the greeting */}
                        <div className={cn(
                            "transition-opacity duration-300",
                            isTyping ? "opacity-0" : "opacity-100"
                        )}>
                            <Suggestions />
                        </div>
                    </div>
                </div>
            ) : (
                // Apply centering to the parent flex container for the active chat state
                <div className="flex flex-1 flex-col items-center overflow-hidden"> 
                    {/* Message display area: centered, takes up space, scrolls, has bottom padding */}
                    <div className="w-full max-w-3xl flex-1 overflow-y-auto px-4 pt-4 pb-24"> {/* Added pb-24 for input spacing */}
                        <MessageDisplay />
                    </div>
                    {/* Input area: sticky to bottom, centered */}
                    <div className="w-full max-w-3xl sticky bottom-4 bg-background p-0 border-t border-border"> {/* Added bottom-4 to lift it up from the bottom */}
                        <InputArea isAnchored={true} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
