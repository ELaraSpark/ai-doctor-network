import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// Using alias paths again, assuming they might work after build/cache clear, 
// but user might need to fix these if errors persist.
import { useAuth } from '@/contexts/AuthContext'; 
import { useAppContext } from '@/contexts/AppContext'; 
import {
  sidebarItems as adminSidebarItems,
  settingsItems,
  logoutItem, // Contains icon and title
  patientSidebarItems,
} from '@/constants/SidebarItems'; 
import SidebarHeader from '@/layouts/components/sidebar/SidebarHeader'; 

// Define types for sidebar items if not already defined elsewhere
interface SidebarItem {
  title: string;
  path: string;
  icon: React.ElementType;
  color?: string; // Optional color for patient items - WILL BE IGNORED FOR NOW
}

const Sidebar = () => {
  const location = useLocation();
  const { signOut, user } = useAuth(); 
  const { viewMode } = useAppContext(); 
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(); 
  };

  // Function to determine if an admin menu item is active
  const isAdminActive = (path: string): string => {
    const isActive = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
    // Using CSS variables defined in index.css for admin theme
    return isActive
      ? 'bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))]' 
      : 'text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-hover-bg))] hover:text-[hsl(var(--sidebar-hover-fg))]';
  };

  // Function to return specific active/inactive classes for patient view (Green Theme)
  // Ignores 'color' prop from SidebarItems for now, uses primary green for active state.
  const getPatientNavItemClasses = (path: string) => {
    const isActive = location.pathname === path;
    const baseClasses = 'flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-all';
    
    // Explicit classes using the green theme's primary color for active state
    const activeClasses = 'bg-primary text-primary-foreground shadow-md'; // bg-primary should map to green via CSS var
    const inactiveClasses = 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm';
    // Icon color uses primary green when active, gray otherwise
    const iconClass = isActive ? 'text-primary' : 'text-gray-500 group-hover:text-primary'; 

    return {
      link: `${baseClasses} ${isActive ? activeClasses : inactiveClasses} group`, // Added group for icon hover
      icon: iconClass
    };
  };

  // Reusable menu item component for admin view
  const AdminNavItem: React.FC<{ item: SidebarItem }> = ({ item }) => {
    const Icon = item.icon;
    return (
      <Link
        to={item.path}
        className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isAdminActive(item.path)}`}
      >
        <Icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
        {item.title}
      </Link>
    );
  };

  // Reusable menu item component for patient view - Uses explicit classes
  const PatientNavItem: React.FC<{ item: SidebarItem }> = ({ item }) => {
    const Icon = item.icon;
    // Ignores item.color, uses primary green for active state
    const { link: linkClasses, icon: iconClass } = getPatientNavItemClasses(item.path); 

    return (
      <Link
        to={item.path}
        className={linkClasses}
      >
        <div className={`${iconClass} mr-3 transition-colors`}>
          <Icon className="h-5 w-5" />
        </div>
        <span>{item.title}</span>
      </Link>
    );
  };

  // Determine which items to render based on viewMode
  const itemsToRender = viewMode === 'admin' ? adminSidebarItems : patientSidebarItems;
  const NavItemComponent = viewMode === 'admin' ? AdminNavItem : PatientNavItem;

  return (
    // Use CSS variables for admin sidebar background/text/border
    <div className={`w-64 flex-col h-full border-r hidden md:flex ${ 
      viewMode === 'admin' 
        ? 'bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] border-[hsl(var(--sidebar-border))]' 
        : 'bg-gray-50 border-gray-200' // Light theme for patient
    }`}>
      {/* Use SidebarHeader component */}
      <SidebarHeader /> 

      <nav className={`flex-1 px-3 py-4 space-y-1 overflow-y-auto`}>
        {itemsToRender.map((item) => (
          <NavItemComponent key={item.path} item={item} />
        ))}
        
        {/* Render Settings only for admin */}
        {viewMode === 'admin' && (
          <>
            <div className="pt-4">
              <hr className="border-[hsl(var(--sidebar-border))]" />
            </div>
            {settingsItems.map((item) => (
              <AdminNavItem key={item.path} item={item} />
            ))}
          </>
        )}
      </nav>

      {/* Logout Button */}
      <div className={`p-4 mt-auto border-t ${viewMode === 'admin' ? 'border-[hsl(var(--sidebar-border))]' : 'border-gray-200'}`}>
        <button
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md w-full ${
            viewMode === 'admin' 
              ? 'text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-hover-bg))] hover:text-[hsl(var(--sidebar-hover-fg))]' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
          onClick={handleSignOut} // Use handleSignOut which calls signOut
        >
          {logoutItem.icon && <logoutItem.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />}
          {logoutItem.title}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
