import PublicLayout from "@/components/layout/PublicLayout";
import SpecialistsSection from "@/components/home/SpecialistsSection";
import CTASection from "@/components/home/CTASection";
// import SearchSection from "@/components/home/SearchSection"; // Placeholder for new component
// import FilterBar from "@/components/home/FilterBar"; // Placeholder for new component
import { useEffect } from "react";
import { Link } from "react-router-dom"; 
import { Button } from "@/components/ui/button"; 
import { FileText, Users } from "lucide-react"; // <-- Added Users import

const Index = () => {
  // Preload agent profile images (Keep this logic)
  useEffect(() => {
    const agentIds = ["cardio", "neuro", "path", "gen", "opth", "radiology", "pharma"];
    agentIds.forEach(id => {
      const img = new Image();
      img.src = `/agents/${id}.jpg`;
    });
  }, []);

  return (
    // PublicLayout likely handles the Header and Footer
    <PublicLayout showHeader={true}> 
      {/* Remove the gradient background and min-height from here, apply to body or layout if needed */}
      <div> 
        {/* Placeholder for Search Section - To be implemented */}
        <div className="border-b border-gray-200 py-4">
          <div className="container mx-auto px-6">
            <div className="flex items-center max-w-3xl mx-auto border border-gray-300 rounded-full shadow-sm bg-white overflow-hidden">
              <input 
                type="text" 
                className="flex-grow px-8 py-3.5 border-none text-sm font-medium focus:outline-none" 
                placeholder="Search AI specialists or medical tasks..." 
              />
              <button className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center m-1 mr-2 flex-shrink-0">
                {/* Search Icon SVG */}
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="block fill-none h-4 w-4 stroke-current stroke-[4] overflow-visible">
                  <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="container mx-auto px-6 pt-4 pb-2 text-center"> {/* Added padding */}
          <h3 className="text-sm font-semibold text-gray-500 mb-3">Quick Actions:</h3>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link to="/tools/document-transformer">
              <Button variant="outline" size="sm" className="text-xs">
                <FileText size={14} className="mr-1.5" /> {/* Example Icon */}
                Transform Document
              </Button>
            </Link>
            {/* Added Collaboration Hub Quick Action */}
            <Link to="/collaboration-hub">
              <Button variant="outline" size="sm" className="text-xs">
                <Users size={14} className="mr-1.5" /> {/* Example Icon */}
                Start Collaboration
              </Button>
            </Link>
            {/* Add more quick action buttons here if needed */}
          </div>
        </div>

        {/* Placeholder for Filter Bar - To be implemented */}
        <div className="container mx-auto px-6 border-t pt-2"> {/* Added border-t and pt-2 */}
          <div className="flex items-center gap-2 py-5 overflow-x-auto">
            {/* Example Filter Items (repeat as needed) - Using colored divs as icon placeholders */}
            <div className="flex flex-col items-center gap-2 p-2 min-w-[80px] cursor-pointer text-gray-600 border-b-2 border-transparent hover:text-black data-[active=true]:border-black data-[active=true]:text-black" data-active={true}>
              <div className="w-6 h-6 rounded bg-gray-500"></div> {/* Placeholder Icon */}
              <span className="text-xs font-semibold whitespace-nowrap">All Specialists</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-2 min-w-[80px] cursor-pointer text-gray-600 border-b-2 border-transparent hover:text-black data-[active=true]:border-black data-[active=true]:text-black" data-active={false}>
              <div className="w-6 h-6 rounded bg-red-500"></div> {/* Placeholder Icon */}
              <span className="text-xs font-semibold whitespace-nowrap">Cardiology</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-2 min-w-[80px] cursor-pointer text-gray-600 border-b-2 border-transparent hover:text-black data-[active=true]:border-black data-[active=true]:text-black" data-active={false}>
              <div className="w-6 h-6 rounded bg-blue-500"></div> {/* Placeholder Icon */}
              <span className="text-xs font-semibold whitespace-nowrap">Neurology</span>
            </div>
            {/* Add more filter items here... */}
            
            {/* Filter Button */}
            <button className="ml-auto flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-full bg-white text-xs font-semibold cursor-pointer hover:border-gray-500 flex-shrink-0">
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="block h-3.5 w-3.5 fill-gray-700"><path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></svg>
              Filters
            </button>
          </div>
        </div>
        
        {/* Specialist Section (Keep and ensure it's inside the main container) */}
        <div className="container mx-auto px-6 mt-8 mb-12"> {/* Added margins */}
           {/* Remove the container div from SpecialistsSection itself if it has one */}
          <SpecialistsSection /> 
        </div>

        {/* CTA Section (Keep, will modify later if needed) */}
        <CTASection /> 
      </div>
    </PublicLayout>
  );
};

export default Index;
