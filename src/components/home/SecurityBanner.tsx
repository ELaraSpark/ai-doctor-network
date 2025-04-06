import React from 'react';
import { ShieldCheck, Lock, FileBadge } from 'lucide-react'; // Using relevant lucide icons

interface SecurityBadgeProps {
  icon: React.ReactNode;
  text: string;
}

const SecurityBadge: React.FC<SecurityBadgeProps> = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-sm text-gray-600">
    {icon}
    <span>{text}</span>
  </div>
);

const SecurityBanner = () => {
  const badges = [
    { icon: <ShieldCheck size={16} className="text-gray-500" />, text: "HIPAA Compliant" },
    { icon: <Lock size={16} className="text-gray-500" />, text: "End-to-End Encryption" },
    { icon: <FileBadge size={16} className="text-gray-500" />, text: "SOC 2 Certified" }, // Changed icon
  ];

  return (
    <section className="py-4 md:py-6 bg-gray-100 border-t border-gray-200 mt-8 md:mt-12"> {/* Added background, border, margin */}
      <div className="container mx-auto px-6">
        {/* Adapted flex layout and gap from example */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8 md:gap-12">
          {badges.map((badge, index) => (
            <SecurityBadge key={index} icon={badge.icon} text={badge.text} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityBanner;
