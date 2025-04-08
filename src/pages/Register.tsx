
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RegisterForm from "@/components/auth/RegisterForm";
import PublicLayout from "@/components/layout/PublicLayout"; // Import PublicLayout
import { PicassoBackground } from "@/components/illustrations/PicassoBackground";
import { PicassoIllustration } from "@/components/illustrations/PicassoIllustration";

const Register = () => {
  return (
    // Use PublicLayout, hide header/footer
    <PublicLayout showHeader={false} showFooter={false}>
      {/* Background with Picasso-style medical pattern */}
      <PicassoBackground 
        pattern="shapes" 
        color="text-medical-purple" 
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
                name="dna" 
                size="xl" 
                color="text-medical-purple" 
              />
            </div>
            
            {/* Welcome header */}
            <div className="mb-6 text-center">
              <PicassoIllustration 
                name="doctor" 
                size="md" 
                color="text-medical-purple" 
                className="mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Join our medical AI network
              </p>
            </div>

            <RegisterForm />
            
            {/* Login link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
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

// Removed unused Feature component

export default Register;
