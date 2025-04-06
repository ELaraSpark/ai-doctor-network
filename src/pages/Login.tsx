
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { FileText, MessageSquare, Users, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      title: "AI Medical Documentation",
      description: "Generate clinical notes, summaries, and patient documentation using advanced AI models trained on medical data.",
      icon: <FileText className="h-10 w-10 text-white/80" />,
    },
    {
      title: "Specialist Collaboration", // Title kept as is, maybe change later if needed
      description: "Connect with AI agents across different medical fields for second opinions and complex case analysis.", // Changed specialists -> agents
      icon: <Users className="h-10 w-10 text-white/80" />,
    },
    {
      title: "Intelligent Follow-ups",
      description: "Automate patient follow-ups and monitoring with voice AI that understands medical context and patient history.",
      icon: <MessageSquare className="h-10 w-10 text-white/80" />,
    },
  ];

  return (
    <div className="min-h-screen page-gradient flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden card-hover-lift">
        <motion.div 
          className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mb-8"
            >
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-md bg-gradient-to-r from-medical-red to-medical-purple flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">LA</span>
                </div>
                <span className="font-medium text-xl">LENY-AI</span>
              </Link>
              <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
              <p className="text-muted-foreground">Sign in to your account to continue</p>
            </motion.div>
            
            <LoginForm />
            
            <motion.div 
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-medical-purple hover:underline font-medium">
                  Create an account
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="hidden md:block w-1/2 bg-gradient-to-br from-medical-purple via-indigo-600 to-blue-600 p-12 text-white relative overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-3xl font-display font-bold mb-6">
                Healthcare AI That Works <span className="bg-white/20 px-2 py-1 rounded">For You</span>
              </h2>
              <p className="mb-8 text-blue-100 max-w-md">
                LENY-AI connects doctors with specialized AI agents for real-time assistance, 
                enhancing diagnostic accuracy and treatment decisions.
              </p>
            </motion.div>

            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-lg transition-all duration-300 cursor-pointer ${activeFeature === index ? 'bg-white/10' : 'hover:bg-white/5'}`}
                  onClick={() => setActiveFeature(index)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{feature.icon}</div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-blue-100">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link to="/features">
                <Button variant="secondary" className="group">
                  <span>Explore all features</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
          
          {/* Abstract background pattern */}
          <div className="absolute top-0 right-0 w-full h-full opacity-20">
            <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.8">
                <circle cx="180" cy="180" r="150" stroke="white" strokeWidth="2" />
                <circle cx="180" cy="180" r="100" stroke="white" strokeWidth="2" />
                <circle cx="180" cy="180" r="50" stroke="white" strokeWidth="2" />
                <path d="M180 30V330" stroke="white" strokeWidth="2" />
                <path d="M30 180H330" stroke="white" strokeWidth="2" />
                <path d="M69.3 69.3L290.7 290.7" stroke="white" strokeWidth="2" />
                <path d="M69.3 290.7L290.7 69.3" stroke="white" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </motion.div>
      </div>
      
      <motion.div
        className="mt-6 text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
      >
        <div className="flex items-center justify-center gap-6">
          <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
          <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
        </div>
        <p className="mt-4">© {new Date().getFullYear()} LENY Medical AI. All rights reserved.</p>
      </motion.div>
    </div>
  );
};

export default Login;
