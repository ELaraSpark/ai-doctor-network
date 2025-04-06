import React, { useState, useMemo } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Bot, Search, Edit, Trash2, ArrowUpDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import CreateAgentDialog from '@/components/agents/CreateAgentDialog'; // Removed NewAgentData import
import EditAgentDialog, { UpdatedAgentData } from '@/components/agents/EditAgentDialog';

// Example data structure - Exported
export interface MyAgentItem {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  prompt?: string;
}

// Initial example data
const initialExampleAgents: MyAgentItem[] = [
  { id: '1', name: 'Cardiology Consult AI', description: 'Provides consultation on cardiology cases.', avatar: '/agents/cardio.jpg', prompt: 'Act as a cardiology consultant...' },
  { id: '2', name: 'My Custom Oncology Bot', description: 'Trained on specific internal protocols.', avatar: '', prompt: 'Use internal oncology protocols...' },
  { id: '3', name: 'Radiology Report AI', description: 'Assists in interpreting radiology findings.', avatar: '/agents/radiology.jpg', prompt: 'Summarize radiology findings...' },
  { id: '4', name: 'Symptom Checker (Custom)', description: 'A custom agent for initial symptom assessment.', avatar: '', prompt: 'Help assess patient symptoms...' },
];

type SortOption = 'nameAsc' | 'nameDesc';

const MyAgents = () => {
  const [agents, setAgents] = useState<MyAgentItem[]>(initialExampleAgents);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOption>('nameAsc');
  const [editingAgent, setEditingAgent] = useState<MyAgentItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Filter and Sort Logic using useMemo
  const filteredAndSortedAgents = useMemo(() => {
    let filtered = agents.filter(agent =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortOrder) {
        case 'nameDesc': return b.name.localeCompare(a.name);
        case 'nameAsc': default: return a.name.localeCompare(b.name);
      }
    });
    return filtered;
  }, [agents, searchTerm, sortOrder]);

  // handleCreateAgent function removed as navigation handles the flow

  const handleEditAgentClick = (agent: MyAgentItem) => {
    setEditingAgent(agent);
    setIsEditDialogOpen(true);
  };

  const handleUpdateAgent = (agentId: string, updatedData: UpdatedAgentData) => {
    setAgents(prevAgents =>
      prevAgents.map(agent =>
        agent.id === agentId ? { ...agent, ...updatedData } : agent
      )
    );
    setEditingAgent(null); // Clear editing state after update
    // Note: We might need to explicitly close the dialog here if it doesn't close automatically
    // setIsEditDialogOpen(false);
  };

  const handleDeleteAgent = (agentId: string) => {
    console.log("Delete agent:", agentId);
    setAgents(prevAgents => prevAgents.filter(agent => agent.id !== agentId));
  };

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">My Agents</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage your custom and favorite AI agents.
            </p>
          </div>
          {/* Removed onAgentCreate prop */}
          <CreateAgentDialog />
        </div>

        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search my agents..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOption)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <ArrowUpDown size={14} className="mr-2 text-muted-foreground" />
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nameAsc">Name: A-Z</SelectItem>
              <SelectItem value="nameDesc">Name: Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Agent Grid */}
        {filteredAndSortedAgents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedAgents.map((agent) => (
              <Card key={agent.id} className="flex flex-col">
                {/* Stack header vertically by default, row on sm+ */}
                <CardHeader className="flex flex-col sm:flex-row items-start gap-4 pb-4">
                  {/* Center avatar when stacked */}
                  <Avatar className="h-12 w-12 self-center sm:self-start">
                    <AvatarImage src={agent.avatar} alt={agent.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <Bot size={24} />
                    </AvatarFallback>
                  </Avatar>
                  {/* Center text when stacked */}
                  <div className="flex-1 text-center sm:text-left">
                    <CardTitle className="text-lg mb-1">{agent.name}</CardTitle>
                    <CardDescription>{agent.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  {/* Add more details if needed */}
                </CardContent>
                 <CardFooter className="flex justify-end space-x-2 pt-4 border-t">
                    <Button variant="outline" size="sm" onClick={() => handleEditAgentClick(agent)}>
                       <Edit size={14} className="mr-1" /> Edit
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteAgent(agent.id)}>
                       <Trash2 size={16} />
                    </Button>
                 </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="mt-6 border border-dashed border-gray-300 rounded-lg p-12 text-center">
            <Bot size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              {searchTerm ? 'No Matching Agents Found' : 'No Agents Yet'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search.' : 'Create a custom agent or add existing ones to your favorites.'}
            </p>
            {!searchTerm && (
              <div className="mt-4">
                 {/* Removed onAgentCreate prop */}
                <CreateAgentDialog />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Agent Dialog */}
      <EditAgentDialog
        agent={editingAgent}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onAgentUpdate={handleUpdateAgent}
      />
    </AppLayout>
  );
};

export default MyAgents;
