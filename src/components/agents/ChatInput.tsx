
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
    // New container structure with hidden file input
    <div className="flex flex-col w-full p-3 border bg-background rounded-xl shadow-sm relative">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange}
        multiple // Allow multiple files
        className="hidden" 
        aria-hidden="true"
      />
      
      {/* Display attached file count (optional enhancement) */}
      {attachments.length > 0 && (
        <div className="absolute top-1 left-10 text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full flex items-center gap-1">
           <Paperclip size={12} /> {attachments.length} file(s)
           {/* TODO: Add button to clear attachments */}
        </div>
      )}

      {/* Textarea takes up main space */}
      <Textarea
        ref={textareaRef}
        placeholder={`Ask ${agentName}...`} // Simplified placeholder
        value={chatInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex-1 w-full bg-transparent text-sm placeholder-muted-foreground resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 pr-10", // Basic styling, remove default rings, add padding-right for send button
          "min-h-[24px]" // Ensure minimum height for one line
        )}
        id="chat-input-textarea"
        aria-label={`Message to ${agentName}`}
        tabIndex={0}
        rows={1} // Start with one row
      />
      {/* Bottom row for buttons */}
      <div className="flex items-center justify-between mt-2">
        {/* Attachment Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-foreground"
          onClick={handleAttachmentClick}
          aria-label="Add attachment"
        >
          <Paperclip className="h-5 w-5" /> {/* Changed icon to Paperclip */}
        </Button>

        {/* Send Button */}
        <Button 
          onClick={handleSendMessage} 
          disabled={(!chatInput.trim() && attachments.length === 0) || isLoading}
          aria-label="Send message"
          size="icon" // Make it icon-sized
          className="bg-primary text-primary-foreground rounded-md w-8 h-8" // Style similar to Claude example
        >
          <ArrowUp className="h-4 w-4" /> 
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
