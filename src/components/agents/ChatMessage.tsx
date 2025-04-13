
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Message } from "./types/agentTypes";
import { Agent } from "./types/agentTypes";
import { agents } from "./data/agentsData";

interface ChatMessageProps {
  message: Message;
  selectedAgent?: Agent;
}

const ChatMessage = ({ message, selectedAgent }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  const [animationClass, setAnimationClass] = useState<string>("");
  const [gradientClass, setGradientClass] = useState<string>("");
  
  // Find the agent for styling if not provided directly
  useEffect(() => {
    if (!isUser && selectedAgent) {
      // Set animation class based on agent's style
      if (selectedAgent.animationStyle) {
        switch (selectedAgent.animationStyle) {
          case 'pulse':
            setAnimationClass("animate-pulse-subtle");
            break;
          case 'bounce':
            setAnimationClass("hover:animate-bounce-subtle");
            break;
          case 'breathe':
            setAnimationClass("animate-breathe");
            break;
          case 'heartbeat':
            setAnimationClass("animate-heartbeat");
            break;
          default:
            setAnimationClass("");
        }
      }
      
      // Set gradient class if available
      if (selectedAgent.gradientColors) {
        setGradientClass(`bg-gradient-to-br ${selectedAgent.gradientColors} bg-opacity-10`);
      }
    }
  }, [isUser, selectedAgent]);
  
  // Get agent color for styling
  const agentColor = !isUser && selectedAgent?.color ? selectedAgent.color : "#4287f5";
  
  // Get personality tooltip if available
  const personalityTooltip = !isUser && selectedAgent?.personality ? selectedAgent.personality : "";
  
  return (
    <div 
      className={cn(
        "flex w-full animate-fadeIn", 
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div 
        className={cn(
          "max-w-[85%] px-4 py-3 rounded-lg shadow-sm transition-all duration-300",
          isUser 
            ? "bg-aida-500 text-white rounded-tr-none" 
            : `${gradientClass || "bg-slate-100 dark:bg-slate-800"} rounded-tl-none ${animationClass}`
        )}
        style={!isUser && selectedAgent?.color ? { borderLeftColor: agentColor, borderLeftWidth: '4px' } : {}}
        title={personalityTooltip}
      >
        {!isUser && selectedAgent?.personality && (
          <div className="mb-1.5 text-xs text-gray-500 italic hidden sm:block">
            {selectedAgent.personality.split(',')[0]}
          </div>
        )}
        
        <p className={cn(
          "text-sm whitespace-pre-wrap",
          isUser ? "text-white" : "text-foreground"
        )}>
          {message.content}
        </p>
        
        <p className={cn(
          "text-xs mt-2 text-right",
          isUser ? "text-white/70" : "text-muted-foreground"
        )}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
