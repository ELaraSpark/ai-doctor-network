
import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
import { ArrowUp, Paperclip } from "lucide-react"; // Removed Plus, Send. Kept Paperclip, ArrowUp
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Import cn utility if not already present

interface ChatInputProps {
  onSendMessage: (message: string, attachments?: File[]) => void; // Allow attachments later
  isLoading: boolean;
  agentName: string;
}

const ChatInput = ({ onSendMessage, isLoading, agentName }: ChatInputProps) => {
  const [chatInput, setChatInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for hidden file input
  const [attachments, setAttachments] = useState<File[]>([]); 

  const handleSendMessage = () => {
    // Basic check, might need refinement based on how attachments are handled
    if (!chatInput.trim() && attachments.length === 0) return; 
    
    onSendMessage(chatInput, attachments); 
    setChatInput("");
    setAttachments([]); // Clear attachments after sending
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input value
    }
    adjustTextareaHeight(); // Reset textarea height
  };

  // Adjust textarea height dynamically
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      const scrollHeight = textarea.scrollHeight;
      // Set a max height (e.g., 200px)
      const maxHeight = 200; 
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [chatInput]); // Adjust height when input changes

  // Listen for addToChat events (Keep existing logic)
  useEffect(() => {
    const handleAddToChat = (event: CustomEvent<{ message: string }>) => {
      setChatInput(prev => {
        if (prev.trim()) {
          return prev + "\n\n" + event.detail.message;
        }
        return event.detail.message;
      });
      // Focus and adjust height after adding text programmatically
      setTimeout(() => {
        textareaRef.current?.focus();
        adjustTextareaHeight();
      }, 0);
    };
    window.addEventListener('addToChat', handleAddToChat as EventListener);
    return () => {
      window.removeEventListener('addToChat', handleAddToChat as EventListener);
    };
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setChatInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Trigger hidden file input
  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // Append new files to existing ones (or replace, depending on desired UX)
      // For simplicity, let's replace for now:
      setAttachments(Array.from(event.target.files)); 
      // TODO: Add validation (file size, type, count limits) if needed
    }
  };

  return (
    // Make default border more visible (70% opacity) and solidify on focus
    <div className="flex items-center relative rounded-xl border border-primary/70 bg-background px-6 py-0 h-32 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 shadow-sm transition-colors duration-200"> 
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange}
        multiple // Allow multiple files
        className="hidden" 
        aria-hidden="true"
      />
      
      {/* Attachment Button - More subtle styling */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-[#92A69B] hover:text-primary p-0 h-8 w-8 mr-3 flex-shrink-0 opacity-70" /* Updated colors */
        onClick={handleAttachmentClick}
        aria-label="Add attachment"
        title="Attach files"
      >
        <Paperclip className="h-5 w-5" /> 
      </Button>

      {/* Textarea - Positioned at top with bolder, more visible text */}
      <Textarea
        ref={textareaRef}
        placeholder="How can I help you today?" // More conversational placeholder
        value={chatInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex-1 bg-transparent text-[16px] placeholder:text-gray-600 resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0", /* Removed font-medium and placeholder:font-medium */
          "min-h-[24px] max-h-[150px] pt-6 pb-0" // Positioned at top with padding-top only
        )}
        id="chat-input-textarea"
        aria-label="Chat message input" 
        tabIndex={0}
        rows={1} 
      />
      
      {/* Send Button - Using medical teal color for consistency */}
      <Button 
        onClick={handleSendMessage} 
        disabled={(!chatInput.trim() && attachments.length === 0) || isLoading}
        aria-label="Send message"
        title="Send message"
        variant="accentSolid" // Use the updated solid accent variant
        size="icon" 
        className="rounded-full w-9 h-9 ml-3 flex-shrink-0 shadow-sm" // Removed inline style
      >
        <ArrowUp className="h-5 w-5 text-white" /> {/* Re-confirming white text */}
      </Button>
      
      {/* Display attached file count (optional enhancement - maybe position differently if needed) */}
      {/* 
      {attachments.length > 0 && (
        <div className="absolute bottom-1 left-1 text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full flex items-center gap-1 z-10"> 
           <Paperclip size={12} /> {attachments.length} file(s)
        </div>
      )} 
      */}
    </div> 
  );
};

export default ChatInput;
