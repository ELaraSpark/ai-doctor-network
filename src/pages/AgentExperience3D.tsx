
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PublicLayout from "@/components/layout/PublicLayout";
import SpecialistCubes from "@/components/3d/SpecialistCubes";
import { Agent } from "@/components/agents/types/agentTypes";
import { specialists as collaborationSpecialists } from "@/components/collaboration/data/specialistsData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Box } from "lucide-react";

// Transform specialists to match the Agent type from agentTypes
const specialists: Agent[] = collaborationSpecialists.map(specialist => ({
  ...specialist,
  capabilities: [`${specialist.specialty} expertise`, "Medical diagnosis", "Treatment recommendations"]
}));

const AgentExperience3D = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsExperienceOpen(true);
  };

  const handleCloseExperience = () => {
    setIsExperienceOpen(false);
    setTimeout(() => setSelectedAgent(null), 500); // Wait for animation to complete
  };

  return (
    <PublicLayout showFooter={false}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to="/">
              <Button variant="outline" size="sm" className="mr-2">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold flex items-center">
              <Box className="h-6 w-6 mr-2 text-medical-blue" />
              3D Agent Experience
            </h1>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-muted-foreground">
            Click on a specialist cube to expand it into an immersive 3D consultation environment.
          </p>
        </div>

        {/* 3D Environment */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-[600px] w-full rounded-xl overflow-hidden shadow-xl border border-medical-blue/20"
        >
          <SpecialistCubes 
            specialists={specialists} 
            onSelectAgent={handleAgentSelect}
            selectedAgent={selectedAgent}
            isExperienceOpen={isExperienceOpen}
            onCloseExperience={handleCloseExperience}
          />
        </motion.div>
      </div>
    </PublicLayout>
  );
};

export default AgentExperience3D;
