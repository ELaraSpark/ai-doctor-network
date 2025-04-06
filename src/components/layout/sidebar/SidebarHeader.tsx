import React from 'react';
import { Link } from 'react-router-dom';

const SidebarHeader = () => {
  return (
    <div className="flex items-center justify-center h-16 border-b border-border px-4 shrink-0">
      {/* Link the logo/name to the homepage or dashboard */}
      <Link to="/" className="flex items-center gap-2 text-primary font-semibold text-lg">
        {/* Optional: Add an icon here if desired */}
        {/* <YourIcon size={24} /> */}
        <span>Leny.ai</span>
      </Link>
    </div>
  );
};

export default SidebarHeader;
