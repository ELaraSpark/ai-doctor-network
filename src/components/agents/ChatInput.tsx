
import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
import { ArrowUp, Lightbulb, ChevronDown, Paperclip } from "lucide-react";
import SuggestionsDropdown from "@/components/onboarding/SuggestionsDropdown";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string, attachments?: File[]) => void;
  isLoading: boolean;
  agentName: string;
  onTypingChange?: (isTyping: boolean) => void;
  isAnchored?: boolean;
  submitButtonColor?: 'primary' | 'accent';
  onStyleChange?: (style: string) => void;
  initialStyle?: string;
}

const ChatInput = ({ 
  onSendMessage, 
  isLoading, 
  agentName, 
  onTypingChange, 
  isAnchored = false, 
  submitButtonColor,
  onStyleChange,
  initialStyle = "Professional"
}: ChatInputProps) => {
  const [chatInput, setChatInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [selectedStyle, setSelectedStyle] = useState(initialStyle);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSendMessage = (e?: React.MouseEvent<HTMLButtonElement>) => { 
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!chatInput.trim() && attachments.length === 0) {
      return; 
    }
    
    onSendMessage(chatInput, attachments);
    setChatInput("");
    setAttachments([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
    if (onTypingChange) {
      onTypingChange(false);
    }
  };

  // Auto-focus the textarea when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Listen for addToChat events
  useEffect(() => {
    const handleAddToChat = (event: CustomEvent<{ message: string }>) => {
      setChatInput(prev => {
        if (prev.trim()) {
          return prev + "\n\n" + event.detail.message;
        }
        return event.detail.message;
      });
      
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 0);
    };
    
    window.addEventListener('addToChat', handleAddToChat as EventListener);
    return () => {
      window.removeEventListener('addToChat', handleAddToChat as EventListener);
    };
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setChatInput(newValue);
    
    if (onTypingChange) {
      onTypingChange(newValue.trim().length > 0);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAttachments(Array.from(event.target.files));
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleSuggestionsClick = () => {
    setShowSuggestions(prev => !prev);
  };

  const handleSuggestionSelect = (query: string) => {
    setChatInput(query);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    // Main container - Simplified to match HTML example
    <div className={cn(
      "relative w-full max-w-[900px] mx-auto rounded-xl bg-[#FFFFFF] transition-all duration-200",
      "border border-gray-200 shadow-sm hover:shadow-md"
    )}>
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange}
        multiple
        className="hidden" 
        aria-hidden="true"
      />
      
      {/* Attachments display - only shown when files are attached */}
      {attachments.length > 0 && (
        <div className="flex items-center px-4 pt-3">
          <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center"> 
            <Paperclip className="h-3 w-3 mr-1" />
            <span>{attachments.length} file{attachments.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      )}
      
      {/* Input area with controls */}
      <div className="relative min-h-[120px] flex items-end">
        {/* Semi-transparent overlay when suggestions are shown */}
        {showSuggestions && (
          <div className="fixed inset-0 bg-black/20 z-[9998]" onClick={() => setShowSuggestions(false)} />
        )}
        {/* Suggestions Dropdown */}
        <SuggestionsDropdown 
          isVisible={showSuggestions}
          onSuggestionClick={handleSuggestionSelect}
          onClose={() => setShowSuggestions(false)}
        />
        {/* Textarea with negative margin to align with attachment icon */}
        <textarea
          ref={textareaRef}
          placeholder="Ask me anything..."
          value={chatInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={cn(
            "absolute inset-0 w-full h-full bg-transparent text-lg resize-none border-0 outline-none px-4 py-3 focus:ring-0 text-left placeholder:text-left ml-2 text-[#111111]",
            chatInput.trim() ? "placeholder:text-gray-400" : "placeholder:text-gray-500"
          )}
          aria-label="Chat message input"
        />
        
        {/* Bottom controls container - Positioned absolutely to ensure proper alignment */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-4 py-3 z-10">
          {/* Left side controls */}
          <div className="flex items-center space-x-2">
            {/* Attachment Button */}
            <Button 
              variant="ghost" // Ghost variant now uses primary hover from button.tsx update
              size="sm"
              className="text-gray-500 p-1 h-8 w-8 rounded-full transition-colors" // Removed explicit hover colors
              onClick={handleAttachmentClick}
              aria-label="Add attachment"
            >
              <Paperclip className="h-4 w-4" /> 
            </Button>
            
            {/* Suggestions Button (Lightbulb) */}
            <Button 
              variant="ghost" // Ghost variant now uses primary hover from button.tsx update
              size="sm"
              className="text-gray-500 p-1 h-8 w-8 rounded-full transition-colors" // Removed explicit hover colors
              onClick={handleSuggestionsClick}
              aria-label="Show suggestions"
            >
              <Lightbulb className="h-4 w-4" /> 
            </Button>
          </div>
          
          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Style Dropdown - Only visible when typing */}
            {chatInput.trim().length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" // Ghost variant now uses primary hover from button.tsx update
                    size="sm" 
                    className="h-8 text-xs text-gray-500 flex items-center gap-1 rounded-full px-2 transition-colors" // Removed explicit hover colors
                  >
                    {selectedStyle} <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {
                    setSelectedStyle("Professional");
                    if (onStyleChange) onStyleChange("Professional");
                  }}>
                    Professional
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    setSelectedStyle("Conversational");
                    if (onStyleChange) onStyleChange("Conversational");
                  }}>
                    Conversational
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    setSelectedStyle("Minimalist");
                    if (onStyleChange) onStyleChange("Minimalist");
                  }}>
                    Minimalist
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    setSelectedStyle("Playful");
                    if (onStyleChange) onStyleChange("Playful");
                  }}>
                    Playful
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {/* Send Button */}
            <Button 
              type="button"
              onClick={(e) => handleSendMessage(e)}
              disabled={(!chatInput.trim() && attachments.length === 0) || isLoading}
              aria-label="Send message"
              variant="default" // Default variant now uses primary green from button.tsx update
              size="sm"
              className={cn(
                "rounded-full w-10 h-10 flex items-center justify-center text-white shadow-sm hover:shadow-md transition-all",
                submitButtonColor === 'accent' ? 'bg-accent hover:bg-accent/90' : 'bg-primary hover:bg-primary/90'
              )}
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;


// 🔌 Example usage with Supabase
// const handleSendMessage = async (message: string) => {
//   const { error } = await supabase.from('messages').insert([{
//     sender_id: currentUserId,
//     receiver_id: selectedReceiverId,
//     content: message
//   }])
//   if (error) console.error('Send message error:', error)
// }
