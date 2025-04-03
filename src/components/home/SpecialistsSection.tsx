import SpecialistCard from "@/components/home/SpecialistCard";
import { agents } from "@/components/agents/data/agentsData";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Import Carousel components

// Define interface for the mapped specialist object to satisfy TypeScript
interface MappedSpecialist {
  id: string;
  logoText: string; 
  specialty: string; 
  description: string;
  services: string[]; 
  imageUrl: string; 
  delay: number;
  isNew: boolean;
  logoIconText: string; 
  logoColor: string;
  rating: number | 'New'; // Explicitly type rating
  reviewCount?: number; 
  availability: string; 
  price: string; 
  pricePeriod: string; 
}

const SpecialistsSection = () => {
  // Map agents data to the LENY-AI SpecialistCard props
  // Displaying all agents now instead of slicing
  const specialists: MappedSpecialist[] = agents.map((agent, index) => { // Type the specialists array
    const isNewAgent = index < 3; // Mark first 3 as new for example
    return {
      id: agent.id,
      logoText: agent.name, 
      specialty: agent.specialty, 
      description: agent.description,
      services: agent.capabilities.slice(0, 2), // Limit capabilities shown
      imageUrl: `/agents/${agent.id}.jpg`, // Assuming images exist at this path
      delay: 0.1 * (index + 1), // Keep delay for potential staggered animation if needed elsewhere
      // Props specific to LENY-AI style
      isNew: isNewAgent, 
      logoIconText: agent.name.substring(0, 2), 
      logoColor: `bg-${agent.color || 'primary'}`, // Use agent color or default
      rating: isNewAgent ? 'New' : (4.7 + Math.random() * 0.3), 
      reviewCount: isNewAgent ? undefined : Math.floor(500 + Math.random() * 1500), 
      availability: index % 2 === 0 ? "Available Mon-Fri" : "Available 24/7", 
      price: isNewAgent ? "$0" : `$${10 + index * 5}`, 
      pricePeriod: isNewAgent ? "for first consultation" : "per consultation", 
    };
  });
  
  // Return Carousel instead of grid
  return (
    <Carousel 
      opts={{
        align: "start",
        loop: true, // Loop the carousel
      }}
      className="w-full relative" // Added relative positioning for nav buttons
    >
      <CarouselContent className="-ml-4"> {/* Negative margin for item spacing */}
        {specialists.map((specialist, index) => (
          <CarouselItem key={specialist.id || index} className="pl-4 md:basis-1/2 lg:basis-1/3"> {/* Use specialist.id as key */}
            <div className="p-1 h-full"> {/* Padding for item content, h-full for consistent height */}
              <SpecialistCard 
                // Pass all props from the mapped specialist object
                {...specialist} 
                delay={0} // Override delay for carousel items
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Position nav buttons inside the container, slightly offset */}
      <CarouselPrevious className="absolute left-[-20px] top-1/2 -translate-y-1/2 hidden sm:flex z-10" /> 
      <CarouselNext className="absolute right-[-20px] top-1/2 -translate-y-1/2 hidden sm:flex z-10" />
    </Carousel>
  );
};
export default SpecialistsSection;
