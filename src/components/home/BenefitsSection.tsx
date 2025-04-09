import React from 'react';
import { PicassoIllustration, IllustrationName } from '@/components/illustrations'; // Import PicassoIllustration
import { PicassoBackground } from '@/components/illustrations/PicassoBackground'; // Use named import

interface BenefitItemProps {
  illustrationName: IllustrationName; // Use illustration name
  text: string;
  colorClass: string; // e.g., 'text-accent1', 'bg-accent1/10'
}

const BenefitItem: React.FC<BenefitItemProps> = ({ illustrationName, text, colorClass }) => (
  <div className="flex items-center gap-3">
    {/* Use PicassoIllustration */}
    <div className={`w-10 h-10 rounded-full ${colorClass.replace('text-', 'bg-')}/10 flex items-center justify-center flex-shrink-0`}>
      <PicassoIllustration name={illustrationName} size="sm" className={colorClass} />
    </div>
    <span className="text-gray-700">{text}</span>
  </div>
);

const BenefitsSection = () => {
  // Map benefits to illustration names and colors (using green theme)
  const benefits: BenefitItemProps[] = [
    { illustrationName: "healing", text: "Save time on documentation", colorClass: "text-primary" }, // Use primary green
    { illustrationName: "chart", text: "Evidence-based insights", colorClass: "text-accent" }, // Use accent orange
    { illustrationName: "template", text: "EHR integration", colorClass: "text-primary" }, // Use primary green
    { illustrationName: "dna", text: "HIPAA compliant", colorClass: "text-accent" }, // Use accent orange
  ];

  return (
    <section className="relative py-10 md:py-16 bg-gray-50 overflow-hidden"> 
      {/* Add subtle background */}
      <PicassoBackground opacity={5} /> 
      <div className="relative z-10 container mx-auto px-6">
        {/* Title (Optional) */}
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-8 md:mb-12">
          Why Choose Leny AI?
        </h2>
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
          {benefits.map((benefit, index) => (
            <BenefitItem 
              key={index} 
              illustrationName={benefit.illustrationName} 
              text={benefit.text} 
              colorClass={benefit.colorClass} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
