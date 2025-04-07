
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // Removed motion import if not used directly here
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RootHandler } from "@/components/auth/RootHandler"; // Import the new RootHandler
// Index import might not be needed here directly if RootHandler handles it
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard"; // Removed unused import
import PatientRecords from "./pages/PatientRecords";
import Agents from "./pages/Agents";
import Collaboration from "./pages/Collaboration";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import FollowupScheduler from "./pages/FollowupScheduler";
// Removed FollowupMonitoring import as the page was deleted
import Features from "./pages/Features";
import AboutUs from "./pages/AboutUs";
import Notifications from "./pages/Notifications";
import AIExpertsSettings from "./pages/AIExpertsSettings";
import EditAIExpert from "./pages/EditAIExpert";
import DocumentTransformer from "./pages/DocumentTransformer";
import CollaborationHub from "./pages/CollaborationHub";
import ExpertPanelView from "@/components/tumor-board/TumorBoardView"; // Updated import name
import QuickNotes from "./pages/QuickNotes";
import Chat from "./pages/Chat";
// Import new placeholder pages
import RecentChats from "./pages/RecentChats";
import RecentSearches from "./pages/RecentSearches"; // This import might be unused now
import MyAgents from "./pages/MyAgents";
import MyTemplates from "./pages/MyTemplates"; // Updated import name
import Integrations from "./pages/Integrations";
import Tasks from "./pages/Tasks";
import CreateAgentPage from "./pages/CreateAgentPage";
import Referrals from "./pages/Referrals"; 
import Library from "./pages/Library"; 
import LandingPage from "./pages/LandingPage"; // Import the new LandingPage

// Import the new page for security logs if needed
// import SecurityLogs from "./pages/SecurityLogs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Routes - Login, Register, etc. */}
              {/* Removed /welcome route */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/features" element={<Features />} /> 
              <Route path="/about" element={<AboutUs />} /> 

              {/* Root Route - Handled by RootHandler */}
              <Route path="/" element={<RootHandler />} /> 

              {/* Other Authenticated Routes */}
              <Route 
                path="/patients" 
                element={
                  <ProtectedRoute>
                    <PatientRecords />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/agents" 
                element={
                  <ProtectedRoute>
                    <Agents />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/collaboration" 
                element={
                  <ProtectedRoute>
                    <Collaboration />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings/*" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/followup-scheduler" 
                element={
                  <ProtectedRoute>
                    <FollowupScheduler />
                  </ProtectedRoute>
                } 
              />
              {/* Removed Followup Monitoring route */}
              <Route 
                path="/notifications" 
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                } 
              />
              {/* AI Experts routes removed */}
              {/* Route for the new Document Transformer tool */}
              <Route 
                path="/tools/document-transformer" 
                element={
                  <ProtectedRoute>
                    <DocumentTransformer />
                  </ProtectedRoute>
                } 
              />
              {/* Route for the new Collaboration Hub */}
              <Route 
                path="/collaboration-hub" 
                element={
                  <ProtectedRoute>
                    <CollaborationHub />
                  </ProtectedRoute>
                } 
              />
              {/* Route for the new Expert Panel view - Made public */}
              <Route 
                path="/tumor-board" // Keeping path for now, can rename later if needed
                element={<ExpertPanelView />} // Use renamed component
              />
              {/* Add routes for new placeholder pages */}
              <Route path="/recent-chats" element={<ProtectedRoute><RecentChats /></ProtectedRoute>} />
              {/* Removed /recent-searches route */}
              <Route path="/my-agents" element={<ProtectedRoute><MyAgents /></ProtectedRoute>} />
              <Route path="/my-templates" element={<ProtectedRoute><MyTemplates /></ProtectedRoute>} /> {/* Updated path and element */}
              <Route path="/integrations" element={<ProtectedRoute><Integrations /></ProtectedRoute>} />
              <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
              <Route path="/agents/create" element={<ProtectedRoute><CreateAgentPage /></ProtectedRoute>} />
              <Route path="/referrals" element={<ProtectedRoute><Referrals /></ProtectedRoute>} /> {/* Add route for referrals page */}
              <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} /> {/* Add route for Library page */}
              {/* Removed route for Quick Notes (now shown in Index) */}
              {/* Removed route for Chat (now shown in Index) */}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
