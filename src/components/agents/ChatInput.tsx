
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
    // Container is now just a fragment, no outer div needed here
    <> 
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange}
        multiple // Allow multiple files
        className="hidden" 
        aria-hidden="true"
      />
      
      {/* Textarea styled like .input-field */}
      <Textarea
        ref={textareaRef}
        placeholder="What can I help you with today?" 
        value={chatInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={cn(
          "w-full bg-transparent text-base placeholder:text-muted-foreground resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 py-3", // Adjusted padding, text size
          "min-h-[24px] max-h-[150px]" // Min/Max height from example
        )}
        id="chat-input-textarea"
        aria-label="Chat message input" // Generic label
        tabIndex={0}
        rows={1} 
      />
      {/* Input Actions Row */}
      <div className="flex justify-between items-center pt-1">
          {/* Left Action Buttons */}
          <div className="flex gap-2">
              {/* Attachment Button - Styled like .icon-button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:bg-muted rounded p-2 h-9 w-9" // Style from .icon-button
                onClick={handleAttachmentClick}
                aria-label="Add attachment"
                title="Attach files"
              >
                <Paperclip className="h-5 w-5" /> 
              </Button>
              {/* Add other icon buttons here if needed */}
          </div>
          
          {/* Send Button - Styled like .send-button */}
          <Button 
            onClick={handleSendMessage} 
            disabled={(!chatInput.trim() && attachments.length === 0) || isLoading}
            aria-label="Send message"
            title="Send message"
            size="icon" 
            className="bg-muted hover:bg-border rounded-lg w-9 h-9" // Style from .send-button
          >
            {/* Using ArrowUp instead of the complex send icon for simplicity */}
            <ArrowUp className="h-5 w-5 text-muted-foreground" /> 
          </Button>
      </div>
      {/* Display attached file count (optional enhancement) */}
      {attachments.length > 0 && (
        <div className="absolute bottom-1 left-1 text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full flex items-center gap-1 z-10"> 
           <Paperclip size={12} /> {attachments.length} file(s)
        </div>
      )}
    </>
  );
};

export default ChatInput;
