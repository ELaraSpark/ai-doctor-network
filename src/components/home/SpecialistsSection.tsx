import React, { useState } from 'react'; // Added useState
import HealthcareCard from "@/components/home/HealthcareCard";
import { agents } from "@/components/agents/data/agentsData";
import { Button } from '@/components/ui/button'; // Added Button import
import { ChevronDown } from 'lucide-react'; // Added icon for button

// Define interface for the mapped agent object
interface MappedAgentForHC { // Renamed interface
  id: string;
  logoText: string;
  location: string; // Changed from specialty
  description: string;
  services: string[];
  imageUrl: string; 
  delay: number;
  isNew: boolean;
  logoIconText: string;
  // logoColor is not directly used by HealthcareCard
  rating: number | 'New';
  reviewCount?: number;
  // availability: string; // Removed
  // price: string; // Removed
  // pricePeriod: string; // Removed
}

const INITIAL_VISIBLE_COUNT = 3; // Show 3 agents initially

const AIAgentsSection = () => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  // Map agents data
  const aiAgents: MappedAgentForHC[] = agents.map((agent, index) => {
    const isNewAgent = index < 3;
    return {
      id: agent.id,
      logoText: agent.name,
      location: agent.specialty, // Map specialty to location
      description: agent.description,
      services: agent.capabilities.slice(0, 2), // Show first 2 capabilities as services
      // Map specific images or use placeholder
      imageUrl: agent.id === 'cardio' ? '/agents/female-doctor-scrubs.jpg' :
                agent.id === 'neuro' ? '/agents/male-doctor-labcoat.jpg' :
                agent.id === 'path' ? '/agents/female-surgeon-cap.jpg' :
                '/placeholder.svg', // Placeholder for others
      logoIconText: agent.name.substring(0, 2).toUpperCase(),
      rating: isNewAgent ? 'New' : parseFloat((4.7 + Math.random() * 0.3).toFixed(1)),
      reviewCount: isNewAgent ? undefined : Math.floor(500 + Math.random() * 1500),
      // availability: index % 2 === 0 ? "Available Mon-Fri" : "Available 24/7", // Removed mapping
      // price: isNewAgent ? "$0" : `$${10 + index * 5}`, // Removed mapping
      // pricePeriod: isNewAgent ? "for first consultation" : "per consultation", // Removed mapping
      delay: 0,
      isNew: isNewAgent, // Keep the isNew logic if needed elsewhere, though not used by card
    };
  });

  const handleShowMore = () => {
    // Show all agents when clicked
    setVisibleCount(aiAgents.length);
  };

  const visibleAgents = aiAgents.slice(0, visibleCount);
  const showMoreButtonVisible = visibleCount < aiAgents.length;

  return (
    <div className="w-full">
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleAgents.map((aiAgent, index) => (
          <div key={aiAgent.id || index} className="h-full"> {/* Ensure grid items take full height */}
            <HealthcareCard
              {...aiAgent}
              // Pass delay based on index for staggered animation if needed
              // delay={index * 0.05}
            />
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {showMoreButtonVisible && (
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={handleShowMore}>
            More Agents <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
export default AIAgentsSection; // Renamed export
