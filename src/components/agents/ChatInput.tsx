import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
import { ArrowUp, Paperclip } from "lucide-react"; // Removed Plus, Send. Kept Paperclip, ArrowUp
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Import cn utility if not already present

interface ChatInputProps {
  onSendMessage: (message: string, attachments?: File[]) => void; // Allow attachments later
  isLoading: boolean;
  agentName: string;
  onTypingChange?: (isTyping: boolean) => void; // Add callback for typing state
  isAnchored?: boolean; // Add prop to indicate if the chatbot is anchored
}

const ChatInput = ({ onSendMessage, isLoading, agentName, onTypingChange, isAnchored = false }: ChatInputProps) => {
  const [chatInput, setChatInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for hidden file input
  const [attachments, setAttachments] = useState<File[]>([]); 

  // Modify to accept event object
  const handleSendMessage = (e?: React.MouseEvent<HTMLButtonElement>) => { 
    if (e) {
      e.preventDefault(); // Prevent default button behavior/navigation
      e.stopPropagation(); // Stop the event from bubbling up
    }
    console.log("ChatInput: handleSendMessage triggered."); // Log start
    // Basic check, might need refinement based on how attachments are handled
    if (!chatInput.trim() && attachments.length === 0) {
      console.log("ChatInput: Message empty, returning."); // Log empty case
      return; 
    }
    
    console.log("ChatInput: Calling onSendMessage prop..."); // Log before calling prop
    onSendMessage(chatInput, attachments); 
    console.log("ChatInput: onSendMessage prop finished."); // Log after calling prop
    
    setChatInput("");
    setAttachments([]); // Clear attachments after sending
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input value
    }
    
    // Notify that user is no longer typing
    if (onTypingChange) {
      onTypingChange(false);
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
  
  // Auto-focus the textarea when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

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
    const newValue = e.target.value;
    setChatInput(newValue);
    
    // Call onTypingChange callback if provided
    if (onTypingChange) {
      onTypingChange(newValue.trim().length > 0);
    }
    
    // Log for debugging
    console.log("Input changed:", newValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(); // Call without event object for Enter key press
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
    // Keep the outer wrapper with border styling, but change to flex-col to stack elements
    // Removed focus-within:ring-2, focus-within:ring-primary/30, and shadow-sm to prevent double border effect
    <div className="flex flex-col relative rounded-xl border border-primary/70 bg-background px-6 py-4 h-32 focus-within:border-primary transition-all duration-200"> 
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange}
        multiple // Allow multiple files
        className="hidden" 
        aria-hidden="true"
      />
      
      {/* Textarea - Moved to the top */}
      <div className="flex-1 w-full px-3 pt-2">
        {/* Use a native textarea instead of the component to avoid default styles */}
        <textarea
          ref={textareaRef}
          placeholder={isAnchored ? "Reply to Leny..." : "Ask Leny anything..."} // Change placeholder based on isAnchored
          value={chatInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full bg-transparent text-[16px] placeholder:text-gray-600 resize-none", 
            "min-h-[24px] max-h-[80px] py-0 px-0", // Removed all padding
            "border-0 outline-none shadow-none", // Remove all borders
            "focus:border-0 focus:outline-none focus:ring-0 focus:shadow-none", // Remove all focus styles
            "focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none", // Remove all focus-visible styles
            "hover:border-0 hover:outline-none hover:ring-0 hover:shadow-none", // Remove all hover styles
            "active:border-0 active:outline-none active:ring-0 active:shadow-none" // Remove all active styles
          )}
          style={{ 
            border: 'none', 
            outline: 'none', 
            boxShadow: 'none',
            background: 'transparent'
          }} 
          id="chat-input-textarea"
          aria-label="Chat message input" 
          tabIndex={0}
          rows={1}
          autoFocus // Add autofocus to ensure the textarea is focused on load
        />
      </div>
      
      {/* Bottom controls - Attachment button and Send button */}
      <div className="flex items-center justify-between mt-auto px-3 pb-2">
        {/* Attachment Button - Moved to bottom left */}
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-[#92A69B] hover:text-primary p-0 h-8 w-8 flex-shrink-0 opacity-70" /* Updated colors */
            onClick={handleAttachmentClick}
            aria-label="Add attachment"
            title="Attach files"
          >
            <Paperclip className="h-5 w-5" /> 
          </Button>
          
          {/* Display attached file count */}
          {attachments.length > 0 && (
            <span className="text-xs text-muted-foreground ml-1 bg-muted px-1.5 py-0.5 rounded">
              {attachments.length} file(s)
            </span>
          )}
        </div>
        
        {/* Send Button - Bottom right */}
        <Button 
          type="button" // Explicitly set type to button
          onClick={(e) => handleSendMessage(e)} // Pass event object onClick
          disabled={(!chatInput.trim() && attachments.length === 0) || isLoading}
          aria-label="Send message"
          title="Send message"
          variant="accentSolid" // Use the updated solid accent variant
          size="icon" 
          className="rounded-full w-9 h-9 flex-shrink-0 shadow-sm" // Removed inline style
        >
          <ArrowUp className="h-5 w-5 text-white" /> {/* Re-confirming white text */}
        </Button>
      </div>
    </div> 
  );
};

export default ChatInput;
