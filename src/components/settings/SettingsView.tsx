
import { useState, useEffect } from "react"; // Combined imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
// Import the renamed and merged component
import ProfileSecurityTab from "./tabs/ProfileSecurityTab";
import AppearanceTab from "./tabs/AppearanceTab";
import NotificationsTab from "./tabs/NotificationsTab";
// Removed SecurityTab import
import AIConfigTab from "./tabs/AIConfigTab";

const SettingsView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Default to the new combined tab value
  const [activeTab, setActiveTab] = useState("profile-security");

  // Extract the path after /settings/
  const settingsPath = location.pathname.split('/').slice(2)[0] || '';
  
  // Handle specific settings routes
  if (settingsPath === 'ai-experts') {
    return <Navigate to="/settings/ai-experts" replace />;
  }
  
  // Sync activeTab state with URL hash on mount and change
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    const validTabs = ['profile-security', 'appearance', 'notifications', 'ai-config'];
    if (hash && validTabs.includes(hash)) {
      setActiveTab(hash);
    } else {
      // If no hash or invalid hash, set default and update URL
      setActiveTab('profile-security');
      navigate(location.pathname + '#profile-security', { replace: true });
    }
  }, [location.hash, navigate, location.pathname]);


  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Update URL hash when tab changes
    navigate(location.pathname + `#${value}`, { replace: true });
  };

  return (
    // Apply consistent panel styling
    <div className="bg-white border border-gray-400 rounded-xl shadow-xl p-6 space-y-8">
      <div className="flex flex-col space-y-1">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Use the activeTab state for value and defaultValue */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          {/* Updated grid columns to 4 */}
          <TabsList className="grid w-full grid-cols-4">
            {/* Updated first trigger */}
            <TabsTrigger value="profile-security">Profile & Security</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            {/* Removed Security Trigger */}
            <TabsTrigger value="ai-config">AI Config</TabsTrigger>
          </TabsList>

          {/* Updated first content section */}
          <TabsContent value="profile-security" className="mt-6">
            <ProfileSecurityTab />
          </TabsContent>

          <TabsContent value="appearance" className="mt-6">
            <AppearanceTab />
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <NotificationsTab />
          </TabsContent>

          {/* Removed Security Content Section */}

          <TabsContent value="ai-config" className="mt-6">
            <AIConfigTab />
          </TabsContent>
        </Tabs>
      {/* Removed closing div for flex wrapper */}
    </div>
  );
};

export default SettingsView;
