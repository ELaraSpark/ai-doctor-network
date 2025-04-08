import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import PublicLayout from "@/components/layout/PublicLayout"; // Import PublicLayout
import { Button } from "@/components/ui/button"; // Keep Button import if needed by LoginForm or links
import { PicassoBackground } from "@/components/illustrations/PicassoBackground";
import { PicassoIllustration } from "@/components/illustrations/PicassoIllustration";

const Login = () => {
  // State for activeFeature is no longer needed as the feature section is removed
  // const [activeFeature, setActiveFeature] = useState(0); 
  
  // features array is no longer needed
  // const features = [ ... ];

  return (
    // Use PublicLayout, but hide header/footer
    <PublicLayout showHeader={false} showFooter={false}>
      {/* Background with Picasso-style medical pattern */}
      <PicassoBackground 
        pattern="medical" 
        color="text-medical-teal" 
        opacity={3} 
        className="flex flex-grow"
      >
        {/* Center content */}
        <div className="flex flex-grow items-center justify-center p-4">
          {/* Card with decorative illustration */}
          <div className="w-full max-w-md bg-card rounded-lg p-8 md:p-10 relative overflow-hidden"> 
            {/* Decorative illustration */}
            <div className="absolute -top-10 -right-10 opacity-10 rotate-12">
              <PicassoIllustration 
                name="stethoscope" 
                size="xl" 
                color="text-medical-teal" 
              />
            </div>
            
            {/* Welcome header */}
            <div className="mb-6 text-center">
              <PicassoIllustration 
                name="healing" 
                size="md" 
                color="text-medical-teal" 
                className="mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Sign in to your account to continue
              </p>
            </div>

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
      </PicassoBackground>
    </PublicLayout>
  );
};

export default Login;
