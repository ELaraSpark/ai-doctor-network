
import { ReactNode } from "react";
import { AgentCategory } from "../AgentCategoryFilters"; // Import the category type

export interface Agent {
  id: string;
  name: string;
  specialty: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  // color: string; // Removed color property
  capabilities: string[];
  category?: AgentCategory | 'general'; 
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
