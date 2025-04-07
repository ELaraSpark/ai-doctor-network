import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import PublicLayout from "@/components/layout/PublicLayout"; // Import PublicLayout
import { Button } from "@/components/ui/button"; // Keep Button import if needed by LoginForm or links

const Login = () => {
  // State for activeFeature is no longer needed as the feature section is removed
  // const [activeFeature, setActiveFeature] = useState(0); 
  
  // features array is no longer needed
  // const features = [ ... ];

  return (
    // Use PublicLayout, but hide header/footer
    <PublicLayout showHeader={false} showFooter={false}>
      {/* Center content */}
      <div className="flex flex-grow items-center justify-center p-4">
        {/* Claude-style card: light bg, rounded, no shadow, padding */}
        <div className="w-full max-w-md bg-card rounded-lg p-8 md:p-10"> 
          {/* Removed title */}

          <LoginForm />

          {/* Keep register link */}
          <div className="mt-6 text-center"> {/* Increased margin top */}
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Create an account
              </Link>
            </p>
          </div>

          {/* Add legal text */}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            By continuing, you agree to Leny.ai's{" "}
            <Link to="/terms" className="underline hover:text-foreground">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Login;
