import React from 'react';
import { Button } from '@/components/ui/button'; 
import { cn } from '@/lib/utils'; 

interface HealthcareCardProps {
  imageUrl: string;
  logoIconText: string;
  logoText: string;
  location: string; 
  rating: number | string; 
  reviewCount?: number;
  description: string;
  services: string[];
  isFavorite?: boolean;
  onFavoriteToggle?: () => void; 
}

const HealthcareCard: React.FC<HealthcareCardProps> = ({
  imageUrl,
  logoIconText,
  logoText,
  location,
  rating,
  reviewCount,
  description,
  services,
  isFavorite = false,
  onFavoriteToggle,
}) => {
  const displayRating = typeof rating === 'number' ? rating.toFixed(1) : rating;
  const displayReviewCount = reviewCount ? `(${reviewCount.toLocaleString()})` : '';

  return (
    // Use theme colors: bg-card, border-border
    <div className="w-full max-w-sm rounded-lg overflow-hidden shadow-sm bg-card border border-border h-full flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      {/* Image Container - Use bg-muted */}
      <div className="relative w-full h-72 bg-muted"> 
        <img
          src={imageUrl || '/api/placeholder/400/320'} 
          alt={logoText}
          className="w-full h-full object-cover object-top" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; 
            target.src = '/api/placeholder/400/320'; 
            target.alt = 'Placeholder Image';
          }}
        />
        {/* Favorite Button */}
        <button
          onClick={onFavoriteToggle}
          className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors"
          aria-label="Toggle favorite"
        >
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
             // Use foreground for stroke when not favorited
            className={cn(`block h-4 w-4 stroke-2 overflow-visible`, 
              isFavorite ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-foreground' 
            )}
          >
            <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
          </svg>
        </button>
      </div>

      {/* Content Area - Use p-6 */}
      <div className="p-6 flex flex-col flex-grow"> 
        {/* Logo Row */}
        <div className="flex items-center gap-2 mb-3"> 
          <div className="w-6 h-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs flex-shrink-0"> 
            {logoIconText}
          </div>
           {/* Use foreground color */}
          <div className="font-semibold text-base text-foreground truncate">{logoText}</div> 
        </div>

        <div className="flex-grow">
          {/* Title and Rating Row - Increase title font size */}
          <div className="flex justify-between items-start mb-1">
             {/* Use foreground color, increase font size */}
            <div className="font-semibold text-lg text-foreground">{location}</div> {/* Changed to text-lg */}
            {displayRating && (
             // Use foreground color (slightly muted)
            <div className="flex items-center font-medium text-sm text-foreground/90 flex-shrink-0 ml-2"> 
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                className="h-3.5 w-3.5 fill-current mr-1" // Keep star color for now
              >
                <path
                  d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
                  fillRule="evenodd"
                ></path>
              </svg>
              {displayRating}
               {/* Use muted foreground */}
              {displayReviewCount && <span className="text-muted-foreground ml-1">{displayReviewCount}</span>} 
            </div>
          )}
        </div>

        {/* Description - Use muted foreground, text-base */}
        <div className="text-base text-muted-foreground mb-4">{description}</div> 

          {/* "New" Badge - Consider making slightly larger/bolder if needed */}
          {/* <Badge variant="secondary" className="absolute top-2 left-2">New</Badge> */}

          {/* Services Tags - Use muted bg/fg */}
          {services && services.length > 0 && (
            <div className="pt-4 border-t border-border/50 flex flex-wrap gap-2"> {/* Lighter border */}
              {services.map((service, index) => (
                <div
                key={index}
                className="bg-muted px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground" 
              >
                {service}
              </div>
                ))}
              </div>
            )}
        </div> 

        {/* Try Me Button */}
        <Button variant="default" size="sm" className="w-full mt-4 flex-shrink-0"> 
           Try me
        </Button>
      </div>
    </div>
  );
};

export default HealthcareCard;
