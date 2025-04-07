
import { motion } from "framer-motion";
import RegisterForm from "@/components/auth/RegisterForm";
import PublicLayout from "@/components/layout/PublicLayout"; // Import PublicLayout

const Register = () => {
  return (
    // Use PublicLayout, hide header/footer
    <PublicLayout showHeader={false} showFooter={false}>
      {/* Center content */}
      <div className="flex flex-grow items-center justify-center p-4">
        {/* Single column card, similar to Login */}
        <div className="w-full max-w-md bg-card rounded-lg p-8 md:p-10"> 
          {/* Removed motion wrapper, adjusted classes */}
          <RegisterForm />
        </div>
        {/* Removed the entire right column motion.div */}
      </div>
    </PublicLayout>
  );
};

// Removed unused Feature component

export default Register;
