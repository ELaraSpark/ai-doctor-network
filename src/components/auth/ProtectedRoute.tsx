
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-aida-500"></div>
      </div>
    );
  }

  // TEMPORARY BYPASS: Comment out user check for testing
  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  return <>{children}</>;
};
