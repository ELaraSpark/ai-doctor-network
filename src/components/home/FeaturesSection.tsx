
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Activity, Users, CheckCircle, ArrowRight } from "lucide-react";

const FeatureCard = ({ 
  icon, 
  iconBgClass, 
  title, 
  description, 
  items, 
  linkTo, 
  delay 
}: {
  icon: React.ReactNode;
  iconBgClass: string;
  title: string;
  description: string;
  items: string[];
  linkTo: string;
  delay: number;
}) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
    >
      <div className={`w-12 h-12 ${iconBgClass} rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">
        {description}
      </p>
      <ul className="space-y-2 mb-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 text-medical-green mr-2" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Link to={linkTo}>
        <Button variant="outline" className="w-full">
          <span>Learn More</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <FileText className="h-6 w-6 text-medical-red" />,
      iconBgClass: "bg-medical-red/10",
      title: "Medical Documentation",
      description: "Generate discharge summaries, op notes, and clinical documentation with AI assistance.",
      items: ["Discharge Summaries", "Operative Notes", "Clinical Documentation"],
      linkTo: "/agents",
      delay: 0.1
    },
    {
      icon: <Activity className="h-6 w-6 text-medical-purple" />,
      iconBgClass: "bg-medical-purple/10",
      title: "Follow-up Monitoring",
      description: "Automated follow-up calls and monitoring for patients with voice AI technology.",
      items: ["Voice AI Calling", "Patient Scheduling", "Live Call Monitoring"],
      linkTo: "/followup-scheduler",
      delay: 0.2
    },
    {
      icon: <Users className="h-6 w-6 text-medical-green" />,
      iconBgClass: "bg-medical-green/10",
      title: "Collaborative Consultation",
      description: "Collaborate with colleagues and AI Agents on complex cases and consultations.", // Changed specialists -> Agents
      items: ["AI Agent Consultation", "Case Sharing", "Diagnostic Assistance"], // Changed Specialist -> AI Agent
      linkTo: "/collaboration",
      delay: 0.3
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-medical-purple to-indigo-500 bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive suite of tools designed specifically for healthcare professionals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
