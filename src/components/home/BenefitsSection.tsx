import React from 'react';
import { Clock, BarChart, FileText, Lock } from 'lucide-react'; // Using lucide icons

interface BenefitItemProps {
  icon: React.ReactNode;
  text: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ icon, text }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
      {icon}
    </div>
    <span className="text-gray-700">{text}</span>
  </div>
);

const BenefitsSection = () => {
  const benefits = [
    { icon: <Clock size={20} />, text: "Save time on documentation" },
    { icon: <BarChart size={20} />, text: "Evidence-based insights" }, // Changed icon from example
    { icon: <FileText size={20} />, text: "EHR integration" }, // Changed icon from example
    { icon: <Lock size={20} />, text: "HIPAA compliant" },
  ];

  return (
    <section className="py-6 md:py-10 bg-gray-50"> {/* Added a light background */}
      <div className="container mx-auto px-6">
        {/* Adapted flex layout and gap from example */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-x-12 lg:gap-x-16">
          {benefits.map((benefit, index) => (
            <BenefitItem key={index} icon={benefit.icon} text={benefit.text} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
