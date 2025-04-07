import React, { useState, useEffect } from 'react';
import PublicLayout from "@/components/layout/PublicLayout";
import HeroSection from "@/components/home/HeroSection";
import AIAgentsSection from "@/components/home/SpecialistsSection"; 
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
  NotebookPen, 
  MessageCircle, 
  Search as SearchIcon 
} from 'lucide-react';
import { AgentCategory } from '@/components/agents/AgentCategoryFilters'; 
import { Input } from '@/components/ui/input'; 
import { Button } from '@/components/ui/button'; 
import QuickNotes from "./QuickNotes"; 
import Chat from "./Chat"; 
import ExpertPanelView from "@/components/tumor-board/TumorBoardView"; 
import { Skeleton } from "@/components/ui/skeleton"; 

// Define type for filter/tool items
type FilterItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  type: 'filter' | 'tool'; 
};

// Filter/tool data
const filterCategories: FilterItem[] = [
  { id: 'all', label: 'All AI Agents', icon: Sparkles, type: 'filter' },
  { id: 'expert_panel', label: 'Expert Panel', icon: ClipboardList, type: 'tool' }, 
  { id: 'quick_notes', label: 'Quick Notes', icon: NotebookPen, type: 'tool' },
  // { id: 'chat', label: 'Chat', icon: MessageCircle, type: 'tool' }, // Removed Chat tool from landing
  { id: 'med_students', label: 'Med Students', icon: GraduationCap, type: 'filter' },
  { id: 'nursing', label: 'Nursing', icon: Stethoscope, type: 'filter' },
  { id: 'research', label: 'Research Mode', icon: FlaskConical, type: 'filter' }, 
];


const LandingPage = () => {
  const [activeFilter, setActiveFilter] = useState<AgentCategory | 'all'>('all'); 
  const [activeTool, setActiveTool] = useState<string | null>(null); 
  const [isToolLoading, setIsToolLoading] = useState(false); 
  const [landingSearchTerm, setLandingSearchTerm] = useState(''); 

  useEffect(() => {
    // Preload images if needed
  }, []);

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
        return <QuickNotes />;
      case 'expert_panel':
        return <ExpertPanelView />; 
      default:
        // Pass both filter and search term to AIAgentsSection
        return <AIAgentsSection activeFilter={activeFilter} searchTerm={landingSearchTerm} />; 
    }
  };

  return (
    <PublicLayout showHeader={true} showFooter={!activeTool}> 
      
      <HeroSection isVisible={!activeTool && activeFilter === 'all'} /> 

      {/* Use wider container: max-w-7xl */}
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col flex-1`}>

        {/* Filter/Tool Bar Section with Search */}
        <div className="border-b border-border py-3 my-6 md:my-8"> {/* Use theme border */}
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2"> 
            {/* Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-shrink-0"> 
              {filterCategories.map((category) => (
                // Increased padding, gap, icon size, text size
                <button
                  key={category.id}
                  onClick={() => handleFilterClick(category)} 
                  className={`flex flex-col items-center gap-2 p-3 min-w-[80px] sm:min-w-[90px] cursor-pointer group ${ // Increased gap, p, min-w
                    (activeFilter === category.id && category.type === 'filter' && !activeTool) || (activeTool === category.id && category.type === 'tool')
                      ? 'text-foreground border-b-2 border-primary' // Use theme text/primary border
                      : 'text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-border' // Use theme text/border
                  }`}
                >
                  <category.icon
                    size={26} // Increased icon size
                    className={`transition-opacity ${
                      (activeFilter === category.id && category.type === 'filter' && !activeTool) || (activeTool === category.id && category.type === 'tool')
                       ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                    }`}
                     strokeWidth={(activeFilter === category.id && category.type === 'filter' && !activeTool) || (activeTool === category.id && category.type === 'tool') ? 2 : 1.5}
                   />
                   {/* Increased text size */}
                   <span className="text-sm font-medium whitespace-nowrap">{category.label}</span> 
                 </button>
               ))}
            </div>
            {/* Search Input with Red Button */}
            <div className="relative w-full sm:w-auto sm:max-w-xs flex items-center border border-border rounded-full overflow-hidden shadow-sm bg-card h-11 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary"> {/* Use theme border/bg, increased height */}
              <Input
                type="search"
                placeholder="Search..." 
                className="flex-grow border-none bg-transparent pl-4 pr-2 py-1.5 text-sm h-full focus:outline-none" 
                value={landingSearchTerm}
                onChange={(e) => setLandingSearchTerm(e.target.value)}
              />
              <Button type="submit" size="icon" className="w-9 h-9 rounded-full bg-red-500 hover:bg-red-600 text-white flex-shrink-0 mr-1"> {/* Increased size */}
                 <SearchIcon size={16} /> {/* Increased icon size */}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={`w-full ${activeTool ? '' : 'mb-12 md:mb-16'}`}> 
          {renderMainContent()}
        </div>

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
