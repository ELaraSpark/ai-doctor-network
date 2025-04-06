
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Agent } from "../types/agentTypes";
import { Agent as CollaborationAgent } from "../../collaboration/types/consultationTypes";
import { createConsultation, addConsultationMessage, generateAgentResponse } from "../../collaboration/services/consultationService";

interface AgentConsultationFormProps {
  agent: Agent;
  isOpen: boolean;
  onClose: () => void;
}

const AgentConsultationForm = ({ agent, isOpen, onClose }: AgentConsultationFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!symptoms.trim()) {
      toast({
        title: "Symptoms required",
        description: "Please enter the patient's symptoms before starting the consultation",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Convert to collaboration agent type
      const collaborationAgent: CollaborationAgent = {
        id: agent.id,
        name: agent.name,
        specialty: agent.specialty,
        description: agent.description,
        icon: agent.icon,
        color: agent.color
      };
      
      // Create a new consultation
      const consultationId = await createConsultation();
      
      // Add initial symptoms message
      await addConsultationMessage(consultationId, symptoms, 'doctor');
      
      // Generate initial response
      await generateAgentResponse(consultationId, collaborationAgent, symptoms);
      
      toast({
        title: "Consultation started",
        description: `Started consultation with ${agent.name}`
      });
      
      // Only pass serializable data to router navigation
      // Don't include React components or functions in state
      navigate('/collaboration', { 
        state: { 
          consultationId, 
          preSelectedAgentId: collaborationAgent.id,
          preSelectedAgentName: collaborationAgent.name,
          preSelectedAgentSpecialty: collaborationAgent.specialty
        } 
      });
      
    } catch (error) {
      console.error("Error starting consultation:", error);
      toast({
        title: "Failed to start consultation",
        description: "There was an error starting the consultation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Consultation with {agent.name}</DialogTitle>
          <DialogDescription>
            Describe the patient's symptoms for an analysis from a {agent.specialty} perspective
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="symptoms" className="text-sm font-medium">
              Patient Symptoms
            </label>
            <Textarea
              id="symptoms"
              placeholder="Describe the patient's symptoms and relevant medical history..."
              className="min-h-[120px]"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              required
            />
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
            <p className="text-sm font-medium">Consulting with: {agent.name}</p>
            <p className="text-xs text-muted-foreground mt-1">
              The AI agent will analyze the symptoms from a {agent.specialty} perspective {/* Changed specialist -> agent */}
              and provide diagnostic insights.
            </p>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !symptoms.trim()}>
              {isLoading ? "Starting..." : "Start Consultation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AgentConsultationForm;
