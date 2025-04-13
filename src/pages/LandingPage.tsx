import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PublicLayout from "@/components/layout/PublicLayout";
import HeroSection from "@/components/home/HeroSection";
// Removed AIAgentsSection import
import MyAgents from "./MyAgents"; // Import MyAgents
import BenefitsSection from "@/components/home/BenefitsSection";
import SecurityBanner from "@/components/home/SecurityBanner"; 
import CTASection from "@/components/home/CTASection";
import { cn } from '@/lib/utils';
import { 
  GraduationCap, 
  FlaskConical, 
  Stethoscope, 
  Sparkles,
  ClipboardList,
  NotebookPen, // Keep NotebookPen if used elsewhere, or remove if only for QuickNotes
  MessageCircle,
  Search as SearchIcon,
  X,
  ArrowRight,
  ChevronRight,
  Users as UsersIcon,
  Zap
} from 'lucide-react';
import { AgentCategory } from '@/components/agents/AgentCategoryFilters'; 
import { Input } from '@/components/ui/input'; 
import { Button } from '@/components/ui/button';
// Removed QuickNotes import
import MyTemplates from "./MyTemplates"; // Import MyTemplates instead
import PublicChat from "@/components/home/PublicChat";
import ExpertPanelView from "@/components/tumor-board/TumorBoardView";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from 'react-router-dom';
import { PicassoIllustration } from '@/components/illustrations/PicassoIllustration';
import { useTheme } from '@/contexts/ThemeContext';

// Define type for filter/tool items
type FilterItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  type: 'filter' | 'tool'; 
};

// Filter/tool data - Updated Quick Notes icon if desired, or keep NotebookPen
const filterCategories: FilterItem[] = [
  { id: 'all', label: 'All Specialists', icon: Sparkles, type: 'filter' },
  { id: 'expert_panel', label: 'Expert Panel', icon: ClipboardList, type: 'tool' },
  { id: 'quick_notes', label: 'Quick Notes', icon: Zap, type: 'tool' }, // Changed icon to Zap to match sidebar
  { id: 'cardiology', label: 'Cardiology', icon: GraduationCap, type: 'filter' },
  { id: 'neurology', label: 'Neurology', icon: Stethoscope, type: 'filter' },
  { id: 'oncology', label: 'Oncology', icon: FlaskConical, type: 'filter' },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { colorTheme } = useTheme();
  const [activeFilter, setActiveFilter] = useState<AgentCategory | 'all'>('all'); 
  const [activeTool, setActiveTool] = useState<string | null>(null); 
  const [isToolLoading, setIsToolLoading] = useState(false); 
  const [landingSearchTerm, setLandingSearchTerm] = useState(''); 
  const [showPreview, setShowPreview] = useState(false);

  // Always use classic theme gradient
  const getGradientClass = () => {
    return 'bg-gradient-green';
  };

  const handleFilterClick = (item: FilterItem) => {
    if (item.type === 'filter') {
      setActiveFilter(item.id as AgentCategory | 'all'); 
      setActiveTool(null); 
      setIsToolLoading(false); 
    } else if (item.type === 'tool') {
      const newTool = activeTool === item.id ? null : item.id;
      setActiveTool(newTool);
      setActiveFilter('all'); 
      if (newTool) { 
        setIsToolLoading(true);
        setTimeout(() => setIsToolLoading(false), 300); 
      } else {
        setIsToolLoading(false);
      }
    }
  };

  // Conditionally render main content
  const renderMainContent = () => {
    if (isToolLoading) {
       return (
         <div className="space-y-4 w-full mt-8">
           <Skeleton className="h-12 w-1/2" />
           <Skeleton className="h-[400px] w-full" />
         </div>
       );
    }
    
    switch (activeTool) {
      case 'quick_notes':
        // Render MyTemplates instead of QuickNotes for the public view
        // MyTemplates does not accept isPublicView prop
        return <MyTemplates />;
      case 'expert_panel':
         // Pass isPublicView prop
        return <ExpertPanelView isPublicView={true} />;
      case 'ask_ai':
        // PublicChat doesn't need isPublicView as it's inherently public
        return <PublicChat />; 
      default: // activeTool is null, show Specialists/MyAgents
         // Pass isPublicView prop
        return <MyAgents isPublicView={true} />; 
        // Note: We might need to adjust MyAgents to accept/ignore activeFilter and searchTerm from LandingPage state if needed, or handle filtering internally based on isPublicView
    }
  };

  return (
    <PublicLayout showHeader={true} showFooter={!activeTool}> 
      
      <HeroSection isVisible={!activeTool && activeFilter === 'all'} /> 

      {/* Main container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col flex-1">

        {/* Filter/Tool Bar Section with Sidebar-style Navigation */}
        <div className="border-b border-border py-3 my-6 md:my-8">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            {/* Navigation Items */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
              {/* Ask AI */}
              <button
                onClick={() => {
                  setActiveTool('ask_ai');
                  setActiveFilter('all');
                }}
                className={`flex items-center font-medium group transition-all duration-200 ease-in-out p-3 min-w-[80px] sm:min-w-[90px] cursor-pointer rounded-md ${
                  activeTool === 'ask_ai'
                    ? "bg-primary/10 border border-primary/50 text-primary hover:text-white hover:bg-accent hover:border-accent/50"
                    : "text-muted-foreground hover:text-primary hover:bg-transparent"
                }`}
                title="Interact with AI for medical queries"
              >
                <div className="w-4 h-4 mr-2">
                  <MessageCircle size={16} className={
                    activeTool === 'ask_ai' ? "text-primary group-hover:text-white" : "text-muted-foreground group-hover:text-primary"
                  } />
                </div>
                <span className="text-sm font-medium whitespace-nowrap">Ask AI</span>
              </button>

              {/* Specialists */}
              <button
                onClick={() => {
                  setActiveTool(null);
                  setActiveFilter('all');
                }}
                className={`flex items-center font-medium group transition-all duration-200 ease-in-out p-3 min-w-[80px] sm:min-w-[90px] cursor-pointer rounded-md ${
                  !activeTool
                    ? "bg-primary/10 border border-primary/50 text-primary hover:text-white hover:bg-accent hover:border-accent/50"
                    : "text-muted-foreground hover:text-primary hover:bg-transparent"
                }`}
                title="View all available specialists"
              >
                <div className="w-4 h-4 mr-2">
                  <UsersIcon size={16} className={
                    !activeTool ? "text-primary group-hover:text-white" : "text-muted-foreground group-hover:text-primary"
                  } />
                </div>
                <span className="text-sm font-medium whitespace-nowrap">Specialists</span>
              </button>

              {/* Quick Notes */}
              <button
                onClick={() => {
                  setActiveTool('quick_notes');
                  setActiveFilter('all');
                }}
                className={`flex items-center font-medium group transition-all duration-200 ease-in-out p-3 min-w-[80px] sm:min-w-[90px] cursor-pointer rounded-md ${
                  activeTool === 'quick_notes'
                    ? "bg-primary/10 border border-primary/50 text-primary hover:text-white hover:bg-accent hover:border-accent/50"
                    : "text-muted-foreground hover:text-primary hover:bg-transparent"
                }`}
                title="Create and manage quick notes"
              >
                <div className="w-4 h-4 mr-2">
                  <Zap size={16} className={
                    activeTool === 'quick_notes' ? "text-primary group-hover:text-white" : "text-muted-foreground group-hover:text-primary"
                  } />
                </div>
                <span className="text-sm font-medium whitespace-nowrap">Quick Notes</span>
              </button>

              {/* Expert Panel */}
              <button
                onClick={() => {
                  setActiveTool('expert_panel');
                  setActiveFilter('all');
                }}
                className={`flex items-center font-medium group transition-all duration-200 ease-in-out p-3 min-w-[80px] sm:min-w-[90px] cursor-pointer rounded-md ${
                  activeTool === 'expert_panel'
                    ? "bg-primary/10 border border-primary/50 text-primary hover:text-white hover:bg-accent hover:border-accent/50"
                    : "text-muted-foreground hover:text-primary hover:bg-transparent"
                }`}
                title="Consult with the expert panel"
              >
                <div className="w-4 h-4 mr-2">
                  <ClipboardList size={16} className={
                    activeTool === 'expert_panel' ? "text-primary group-hover:text-white" : "text-muted-foreground group-hover:text-primary"
                  } />
                </div>
                <span className="text-sm font-medium whitespace-nowrap">Expert Panel</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={`w-full ${activeTool ? '' : 'mb-12 md:mb-16'}`}> 
          {renderMainContent()}
        </div>
        
        {/* Preview of Authenticated Experience */}
        {!activeTool && (
          <div className="mb-16 bg-background/80 backdrop-blur-sm rounded-xl border border-border overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Preview the Full Experience</h2>
              <p className="text-muted-foreground mb-6">Sign up to access all features including personalized AI specialists, secure medical chat, and collaboration tools.</p>
              
              <div className="relative overflow-hidden rounded-lg border border-border h-[300px] mb-6">
                <div className={`absolute inset-0 opacity-10 ${getGradientClass()}`}></div>
                
                {/* Sidebar Preview */}
                <div className="absolute left-0 top-0 bottom-0 w-[60px] border-r border-border bg-background/90 flex flex-col items-center py-4 gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <MessageCircle size={16} className="text-primary" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
                    <UsersIcon size={16} className="text-muted-foreground" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
                    <NotebookPen size={16} className="text-muted-foreground" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
                    <ClipboardList size={16} className="text-muted-foreground" />
                  </div>
                </div>
                
                {/* Content Preview */}
                <div className="absolute left-[60px] right-0 top-0 bottom-0 p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <PicassoIllustration name="brain" size="sm" color="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">AI Medical Assistant</h3>
                      <p className="text-xs text-muted-foreground">Personalized healthcare AI</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3 mb-3 max-w-[80%]">
                    <p className="text-sm">How can I help with your medical questions today?</p>
                  </div>
                  
                  <div className="bg-primary/10 rounded-lg p-3 mb-3 max-w-[80%] ml-auto">
                    <p className="text-sm">I need information about recent treatments for...</p>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-background border border-border rounded-lg h-10 flex items-center px-3">
                      <span className="text-sm text-muted-foreground">Type your message...</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded-lg text-sm font-medium flex items-center"
                  onClick={() => navigate('/register')}
                >
                  Sign up for free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline"
                  className="border-primary/30 text-primary hover:bg-primary/5 py-2 px-4 rounded-lg text-sm font-medium"
                  onClick={() => navigate('/login')}
                >
                  Log in
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Other Landing Page Sections */}
        {!activeTool && (
          <>
            <div className="my-12 md:my-16"> 
              <BenefitsSection />
            </div>
            <div className="mb-16">
              <CTASection />
            </div>
            <div className="mb-16">
               <SecurityBanner />
            </div>
          </>
        )}

      </div>
    </PublicLayout>
  );
};

export default LandingPage;
