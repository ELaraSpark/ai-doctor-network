
import React, { useState, useRef, useEffect } from 'react';
import { Agent } from '../agents/types/agentTypes';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { generateAIResponse } from '@/components/agents/services/agentService';
import { MessageSquare, Mic, Send, X, RefreshCw } from 'lucide-react';

interface AgentChatInterfaceProps {
  agent: Agent;
  onClose: () => void;
}

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AgentChatInterface = ({ agent, onClose }: AgentChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello, I'm ${agent.name}, your AI assistant specializing in ${agent.specialty}. How can I help you today? This is an immersive 3D consultation environment.`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    // Animation for chat interface appearance
    const timeout = setTimeout(() => {
      setAnimationComplete(true);
    }, 600);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Call AI service to generate response
      const response = await generateAIResponse(input, agent);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const toggleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      // Here you would normally connect to a voice recognition API
      // For now, we'll just simulate it
      setTimeout(() => {
        setInput(prev => prev + "I'm simulating voice input for this demo. ");
        setIsListening(false);
      }, 2000);
    } else {
      setIsListening(false);
    }
  };
  
  return (
    <Card 
      className={`w-full h-full flex flex-col bg-white/90 backdrop-blur-md border-2 border-medical-blue/30 rounded-xl shadow-xl ${
        animationComplete ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      } transition-all duration-500`}
    >
      <CardHeader className="py-3 px-4 border-b flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-medical-blue to-teal-400 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">{agent.name}</h3>
            <p className="text-xs text-muted-foreground">{agent.specialty}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-auto p-3">
        <div className="space-y-3">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 ${
                  msg.role === 'user'
                    ? 'bg-medical-blue text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <span className="text-xs opacity-70 block mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-3 py-2 bg-gray-100">
                <div className="flex space-x-1 items-center">
                  <div className="w-2 h-2 rounded-full bg-medical-blue animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-medical-blue animate-pulse delay-150"></div>
                  <div className="w-2 h-2 rounded-full bg-medical-blue animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <CardFooter className="p-3 border-t">
        <div className="flex items-center w-full space-x-2">
          <Button
            variant={isListening ? "default" : "outline"}
            size="sm"
            className={`h-9 w-9 p-0 ${isListening ? "bg-medical-blue" : ""}`}
            onClick={toggleVoiceInput}
          >
            <Mic className={`h-4 w-4 ${isListening ? "text-white animate-pulse" : ""}`} />
          </Button>
          
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="min-h-9 h-9 resize-none py-2"
            disabled={isLoading}
          />
          
          <Button
            disabled={!input.trim() || isLoading}
            onClick={handleSendMessage}
            size="sm"
            className="h-9 w-9 p-0 bg-medical-blue"
          >
            {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AgentChatInterface;
