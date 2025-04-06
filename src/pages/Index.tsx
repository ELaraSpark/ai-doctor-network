import PublicLayout from "@/components/layout/PublicLayout";
// Removed AnimatePresence import
import HeroSection from "@/components/home/HeroSection"; // Import HeroSection
import AIAgentsSection from "@/components/home/SpecialistsSection"; // Updated import name (file path remains for now)
import BenefitsSection from "@/components/home/BenefitsSection"; // Import BenefitsSection
import SecurityBanner from "@/components/home/SecurityBanner"; // Import SecurityBanner
import CTASection from "@/components/home/CTASection";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Keep useNavigate for potential future use
import { Button } from "@/components/ui/button";
import {
  FileText,
  Users,
  Search,
  SlidersHorizontal,
  HeartPulse, // Cardiology (Placeholder, not used)
  Brain, // Neurology (Placeholder, not used)
  Microscope, // Pathology
  Bone, // Orthopedics (Example - will be replaced)
  Eye, // Ophthalmology (will be replaced)
  FlaskConical, // Pharma/Labs & Research
  Stethoscope, // General Practice & Nursing
  Sparkles, // All/General Icon
  ClipboardList, // Added for Tumor Board filter
  NotebookPen, // Added for Quick Notes filter
  GraduationCap, // Added for Med Students
  MessageCircle, // Added for Chat
} from "lucide-react";
import QuickNotes from "./QuickNotes"; // Import QuickNotes
import Chat from "./Chat"; // Import Chat
import ExpertPanelView from "@/components/tumor-board/TumorBoardView"; // Import Renamed Component (path is still old name)
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton for loading

// Define type for filter/tool items
type FilterItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  type: 'filter' | 'tool'; // Simplified type
};

// Updated filter/tool data
const filterCategories: FilterItem[] = [
  { id: 'all', label: 'All AI Agents', icon: Sparkles, type: 'filter' },
  { id: 'tumor-board', label: 'Expert Panel', icon: ClipboardList, type: 'tool' }, // Renamed label
  { id: 'quick-notes', label: 'Quick Notes', icon: NotebookPen, type: 'tool' },
  { id: 'chat', label: 'Chat', icon: MessageCircle, type: 'tool' },
  { id: 'med-students', label: 'Med Students', icon: GraduationCap, type: 'filter' },
  { id: 'nursing', label: 'Nursing', icon: Stethoscope, type: 'filter' },
  { id: 'research', label: 'Research Mode', icon: FlaskConical, type: 'filter' }, // Added Research Mode filter
  // Add more relevant categories
];

const Index = () => {
  const [activeFilter, setActiveFilter] = useState('all'); // For filtering AI Agents Section
  const [activeTool, setActiveTool] = useState<string | null>(null); // State for active tool view
  const [isToolLoading, setIsToolLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate(); // Keep for potential future use

  // Preload agent profile images (Keep this logic)
  useEffect(() => {
    const agentIds = ["cardio", "neuro", "path", "gen", "opth", "radiology", "pharma"];
    agentIds.forEach(id => {
      const img = new Image();
      img.src = `/agents/${id}.jpg`;
    });
  }, []);

  const handleFilterClick = (item: FilterItem) => {
    if (item.type === 'filter') {
      setActiveFilter(item.id);
      setActiveTool(null); // Hide any open tool when a filter is clicked
    } else if (item.type === 'tool') {
      // Toggle tool visibility: if same tool clicked, hide it, otherwise show it
      setActiveTool(prevTool => prevTool === item.id ? null : item.id);
      setActiveFilter('all'); // Reset AI Agent filter when a tool is opened
      // Show loading briefly
      setIsToolLoading(true);
      setTimeout(() => setIsToolLoading(false), 300); // Adjust delay as needed
    }
  };

  // Determine which main content component to render below the filter bar
  const renderMainContent = () => {
    switch (activeTool) {
      case 'quick-notes':
        return <QuickNotes />;
      case 'chat':
        return <Chat />;
      case 'tumor-board':
        return <ExpertPanelView />; // Use Renamed Component
      default:
        // Pass activeFilter to AIAgentsSection (or renamed component) if it uses it for filtering
        return <AIAgentsSection /* activeFilter={activeFilter} */ />; // Use updated component name
    }
  };

  return (
    // Always render PublicLayout with the header
    <PublicLayout showHeader={true} showFooter={!activeTool}> {/* Hide footer when tool is active */}
      
      {/* Render HeroSection always, control visibility via prop */}
      <HeroSection isVisible={!activeTool && activeFilter === 'all'} />

      {/* Main content area with padding - Added flex-1, min-h-0 back. Always center content vertically. */}
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col flex-1 min-h-0 justify-center`}>

        {/* Combined Search and Filter/Tool Bar Section */}
        {/* Restored sticky positioning */}
        <div className="sticky top-[60px] z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3">
          {/* Stack vertically on small screens, row on medium+ */}
          <div className="container mx-auto flex flex-col md:flex-row items-center gap-3 md:gap-4"> {/* Adjusted gap for stacking */}

            {/* Filter/Tool Buttons Area - Allow shrinking on smaller screens if needed */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto"> {/* Full width on mobile */}
              {filterCategories.map((category) => (
                <button
                key={category.id}
                onClick={() => handleFilterClick(category)} // Use the updated handler
                className={`flex flex-col items-center gap-1.5 p-2 min-w-[70px] sm:min-w-[80px] cursor-pointer group ${
                  // Highlight if it's the active filter OR the active tool
                  (activeFilter === category.id && category.type === 'filter') || (activeTool === category.id && category.type === 'tool')
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300'
                }`}
              >
                <category.icon
                  size={22}
                  className={`transition-opacity ${
                    // Highlight icon if active filter or tool
                    (activeFilter === category.id && category.type === 'filter') || (activeTool === category.id && category.type === 'tool')
                     ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                  }`}
                  strokeWidth={(activeFilter === category.id && category.type === 'filter') || (activeTool === category.id && category.type === 'tool') ? 2 : 1.5}
                />
                <span className="text-xs font-medium whitespace-nowrap">{category.label}</span>
              </button>
            ))}
            </div>

            {/* Search Input Area - Removed ml-auto, adjusted width/margins */}
            <div className="flex items-center w-full md:w-auto md:max-w-xs border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden h-12 mt-2 md:mt-0"> {/* Added top margin on mobile */}
              <input
                type="text"
                className="flex-grow px-5 py-2 border-none text-sm placeholder-gray-500 focus:outline-none w-full" // Ensure input takes full width inside container
                placeholder="Search..." // Shortened placeholder
              />
              <button className="bg-primary text-white w-9 h-9 rounded-full flex items-center justify-center mr-1.5 flex-shrink-0 hover:bg-primary/90 transition-colors">
                <Search size={14} strokeWidth={3} />
              </button>
            </div>

          </div>
        </div>

        {/* Main Content Area (Specialists or Tool) - Adjusted min-height for mobile */}
        {/* Chat state has no flex/height classes, relies on Chat component's height */}
        {/* Apply min-h only on medium screens and up */}
        <div className={`${activeTool === 'chat' ? '' : 'mt-6 md:mt-8 mb-12 md:mb-16 md:min-h-[500px] w-full'}`}>
          {isToolLoading ? (
            // Show Skeleton loaders while tool loads
            <div className="space-y-4 w-full">
              <Skeleton className="h-12 w-1/2" />
              <Skeleton className="h-[400px] w-full" />
            </div>
          ) : (
            renderMainContent()
          )}
        </div>

        {/* Benefits, CTA, and Security Banner - Conditionally hide if a tool is active */}
        {!activeTool && (
          <>
            <div className="my-12 md:my-16"> {/* Added margin */}
              <BenefitsSection />
            </div>
            <div className="mb-16">
              <CTASection />
            </div>
            <div className="mb-16"> {/* Added margin */}
               <SecurityBanner />
            </div>
          </>
        )}

      </div>
      {/* Footer is handled by PublicLayout, SecurityBanner will appear above it */}
    </PublicLayout>
  );
};

export default Index;
