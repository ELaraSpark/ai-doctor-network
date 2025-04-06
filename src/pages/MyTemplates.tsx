import React, { useState, useMemo } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, FileText, Edit, Trash2, Search, ArrowUpDown, Copy } from 'lucide-react'; // Added Copy
import { cn } from '@/lib/utils';
import EditTemplateDialog, { UpdatedTemplateData } from '@/components/templates/EditTemplateDialog';
import UseTemplateDialog from '@/components/templates/UseTemplateDialog'; // Import Use dialog
import { useToast } from "@/hooks/use-toast"; // Import useToast

// Example data structure - Exported
export interface MyTemplateItem {
  id: string;
  name: string;
  description: string;
  lastUsed: string;
  content?: string;
}

// Initial example data
const initialExampleTemplates: MyTemplateItem[] = [
  { id: '1', name: 'SOAP Note Generator', description: 'Generates a SOAP note based on consultation transcript.', lastUsed: '2h ago', content: 'Generate a SOAP note for the following consultation:\nPatient: {{patient_name}}\nChief Complaint: {{complaint}}\nTranscript:\n{{transcript}}\n\nAssessment:\nPlan:' },
  { id: '2', name: 'Discharge Summary Template', description: 'Standard template for patient discharge summaries.', lastUsed: 'Yesterday', content: 'Patient Name: {{patient_name}}\nAdmission Date: {{admission_date}}\nDischarge Date: {{discharge_date}}\nDiagnosis: {{diagnosis}}\nHospital Course:\n{{course}}\nDischarge Plan:\n{{plan}}' },
  { id: '3', name: 'Referral Letter - Cardiology', description: 'Template for referring patients to cardiology.', lastUsed: '3 days ago', content: 'Dear Dr. {{cardiologist_name}},\n\nI am referring {{patient_name}} for evaluation of {{reason}}.\n\nHistory:\n{{history}}\n\nFindings:\n{{findings}}\n\nThank you for your consultation.' },
  { id: '4', name: 'Pre-Op Checklist Prompt', description: 'Generates checklist items for pre-operative planning.', lastUsed: '1 week ago', content: 'Generate a pre-operative checklist for a patient undergoing {{procedure}} with the following conditions: {{conditions}}.' },
];

type SortOption = 'nameAsc' | 'nameDesc' | 'dateDesc' | 'dateAsc';

const MyTemplates = () => {
  const [templates, setTemplates] = useState<MyTemplateItem[]>(initialExampleTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOption>('nameAsc');
  const [editingTemplate, setEditingTemplate] = useState<MyTemplateItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [templateToUse, setTemplateToUse] = useState<MyTemplateItem | null>(null); // State for template being used
  const [isUseDialogOpen, setIsUseDialogOpen] = useState(false); // State for use dialog visibility
  const { toast } = useToast(); // Initialize toast

  // Filter and Sort Logic
  const filteredAndSortedTemplates = useMemo(() => {
    let filtered = templates.filter(template =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const parseLastUsed = (lastUsed: string): number => {
        if (lastUsed.includes('h ago')) return Date.now() - parseInt(lastUsed) * 60 * 60 * 1000;
        if (lastUsed === 'Yesterday') return Date.now() - 24 * 60 * 60 * 1000;
        if (lastUsed.includes('days ago')) return Date.now() - parseInt(lastUsed) * 24 * 60 * 60 * 1000;
        if (lastUsed.includes('week ago')) return Date.now() - parseInt(lastUsed) * 7 * 24 * 60 * 60 * 1000;
        return 0;
     };
    filtered.sort((a, b) => {
      switch (sortOrder) {
        case 'nameDesc': return b.name.localeCompare(a.name);
        case 'dateAsc': return parseLastUsed(a.lastUsed) - parseLastUsed(b.lastUsed);
        case 'dateDesc': return parseLastUsed(b.lastUsed) - parseLastUsed(a.lastUsed);
        case 'nameAsc': default: return a.name.localeCompare(b.name);
      }
    });
    return filtered;
  }, [templates, searchTerm, sortOrder]);

   const handleCreateTemplate = () => {
    alert('Create New Template (Not implemented)');
  };

  const handleEditTemplateClick = (template: MyTemplateItem) => {
    setEditingTemplate(template);
    setIsEditDialogOpen(true);
  };

  const handleUpdateTemplate = (templateId: string, updatedData: UpdatedTemplateData) => {
    setTemplates(prevTemplates =>
      prevTemplates.map(template =>
        template.id === templateId ? { ...template, ...updatedData } : template
      )
    );
    setEditingTemplate(null);
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
    toast({ title: "Template Deleted", variant: "destructive" });
  };

   // Updated handler to open the UseTemplateDialog
   const handleUseTemplateClick = (template: MyTemplateItem) => {
     if (!template.content) {
        toast({ title: "Empty Template", description: "This template has no content.", variant: "destructive" });
        return;
     }
     setTemplateToUse(template);
     setIsUseDialogOpen(true);
   };

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">My Templates</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage your saved prompt templates and workflows.
            </p>
          </div>
          <Button onClick={handleCreateTemplate}>
            <PlusCircle size={18} className="mr-2" />
            Create New Template
          </Button>
        </div>

        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search templates..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOption)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <ArrowUpDown size={14} className="mr-2 text-muted-foreground" />
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nameAsc">Name: A-Z</SelectItem>
              <SelectItem value="nameDesc">Name: Z-A</SelectItem>
              <SelectItem value="dateDesc">Last Used: Newest</SelectItem>
              <SelectItem value="dateAsc">Last Used: Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Template Grid */}
        {filteredAndSortedTemplates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedTemplates.map((template) => (
              <Card key={template.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                   <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded border max-h-20 overflow-hidden text-ellipsis">
                      {template.content || 'No content preview.'}
                    </p>
                 </CardContent>
                 {/* Stack footer vertically by default, row on sm+ */}
                 <CardFooter className="flex flex-col sm:flex-row sm:justify-between sm:items-center items-start gap-2 pt-4 border-t">
                    <span className="text-xs text-gray-500">Last used: {template.lastUsed}</span>
                    {/* Ensure button group doesn't shrink */}
                    <div className="flex space-x-1 flex-shrink-0">
                       {/* Updated Use button */}
                       <Button variant="default" size="sm" onClick={() => handleUseTemplateClick(template)}>
                         Use
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleEditTemplateClick(template)}>
                         <Edit size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => handleDeleteTemplate(template.id)}>
                         <Trash2 size={16} />
                      </Button>
                   </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="mt-6 border border-dashed border-gray-300 rounded-lg p-12 text-center">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              {searchTerm ? 'No Matching Templates Found' : 'No Templates Yet'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search.' : 'Create reusable templates for common tasks.'}
            </p>
            {!searchTerm && (
              <Button className="mt-4" onClick={handleCreateTemplate}>
                <PlusCircle size={18} className="mr-2" />
                Create Template
              </Button>
            )}
          </div>
        )}
      </div>

       {/* Edit Template Dialog */}
       <EditTemplateDialog
         template={editingTemplate}
         isOpen={isEditDialogOpen}
         onOpenChange={setIsEditDialogOpen}
         onTemplateUpdate={handleUpdateTemplate}
       />
       {/* Use Template Dialog */}
       <UseTemplateDialog
         template={templateToUse}
         isOpen={isUseDialogOpen}
         onOpenChange={setIsUseDialogOpen}
       />
    </AppLayout>
  );
};

export default MyTemplates;
