import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// import AppLayout from '@/components/layout/AppLayout'; // Removed AppLayout import
import { Button, buttonVariants } from '@/components/ui/button'; // Import buttonVariants
import { Input } from '@/components/ui/input';
import { PlusIcon, Search as SearchIcon } from 'lucide-react';
import { PageCard } from '@/components/library/PageCard'; // Use PageCard for templates
import { EmptyState } from '@/components/library/EmptyState'; // Import EmptyState
import { CardSkeleton } from '@/components/library/CardSkeleton'; // Import skeleton
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"; // Import AlertDialog components

// Example Template Data (replace with actual data fetching)
interface TemplateData {
  id: string;
  title: string;
  preview: string;
  date: Date; // Last modified date
  category?: string; // Optional category
}

const exampleTemplates: TemplateData[] = [
  { id: 'tpl1', title: 'SOAP Note Template', preview: 'Standard SOAP note format for patient encounters.', date: new Date('2025-03-15'), category: 'Clinical Notes' },
  { id: 'tpl2', title: 'Discharge Summary Template', preview: 'Template for summarizing hospital stay and discharge instructions.', date: new Date('2025-03-10'), category: 'Reports' },
  { id: 'tpl3', title: 'Consultation Request Template', preview: 'Standard format for requesting specialist consultations.', date: new Date('2025-03-05'), category: 'Referrals' },
  { id: 'tpl4', title: 'Patient History Intake Form', preview: 'Comprehensive form for gathering new patient history.', date: new Date('2025-02-28'), category: 'Forms' },
];

const MyTemplates = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<TemplateData[]>(exampleTemplates); // Replace with fetched data
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [isAlertOpen, setIsAlertOpen] = useState(false); // State for dialog visibility
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null); // State for targeted template ID

  const filteredTemplates = useMemo(() => {
    setIsLoading(true);
    const results = templates.filter(template =>
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Simulate loading finished
    setTimeout(() => setIsLoading(false), 300);
    return results;
  }, [templates, searchTerm]);

  const handleTemplateClick = (templateId: string) => {
    // Navigate to view/use template? Or open edit modal?
    console.log(`View/Use template ${templateId}`);
    // Example: navigate(`/templates/${templateId}`);
  };

  const handleCreateTemplate = () => {
    // Navigate to create template page
    navigate('/templates/create'); 
  };
  
  const handleEditTemplate = (templateId: string) => {
     // Navigate to the edit page for the specific template
     navigate(`/templates/${templateId}/edit`); 
  };

  const handleDeleteTemplate = (templateId: string) => {
     setTemplateToDelete(templateId); // Set the ID of the template to delete
     setIsAlertOpen(true); // Open the confirmation dialog
  };

  // Actual deletion logic (called from AlertDialog)
  const confirmDelete = () => {
    if (!templateToDelete) return;
    console.log(`Confirmed delete template ${templateToDelete}`);
    // TODO: Add actual API call here
    setTemplates(prev => prev.filter(t => t.id !== templateToDelete));
    setTemplateToDelete(null); // Reset state
    setIsAlertOpen(false); // Close dialog
    // Optional: Add success toast
  };

  return (
    // <AppLayout> // Removed AppLayout wrapper
      <div className="container mx-auto max-w-4xl px-4 py-6 h-full flex flex-col bg-background"> {/* Added bg-background */}
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-foreground">My Templates</h1> {/* Use foreground */}
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground" /* Use primary */
            onClick={handleCreateTemplate}
          >
            <PlusIcon size={16} className="mr-1" />
            Create Template
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full mb-6"> {/* Increased bottom margin */}
          <SearchIcon
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" /* Use muted-foreground */
          />
          <Input
            type="search"
            placeholder="Search templates..."
            className="w-full rounded-full bg-muted border-border pl-10 pr-4 py-2 text-sm focus:bg-background focus:ring-1 focus:ring-primary focus:border-primary" /* Use standard theme colors */
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Template List */}
        <div className="flex-1 overflow-y-auto -mx-4"> {/* Allow list to scroll */}
           <div className="px-4 divide-y divide-border"> {/* Use standard border */}
            {isLoading ? (
              <CardSkeleton count={4} />
            ) : filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <PageCard // Using PageCard, could create a specific TemplateCard if needed
                  key={template.id}
                  id={template.id}
                  title={template.title}
                  preview={template.preview}
                  date={template.date} // Pass date
                  onClick={() => handleTemplateClick(template.id)}
                  onEdit={() => handleEditTemplate(template.id)}
                  onDelete={() => handleDeleteTemplate(template.id)}
                  // Add other actions like 'Use Template' via dropdown if needed
                />
              ))
            ) : (
              <EmptyState
                title="No templates found"
                description={searchTerm ? 'Try adjusting your search terms.' : 'Create a new template to reuse common text snippets.'}
                actionLabel="Create Template"
                onAction={handleCreateTemplate}
                illustrationType="template" // Add illustration prop
              />
            )}
          </div>
        </div>
      {/* Confirmation Dialog - Moved outside the main content div */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the template
              "{templates.find(t => t.id === templateToDelete)?.title || 'this template'}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setTemplateToDelete(null)}>Cancel</AlertDialogCancel>
            {/* Use destructive variant for the action button */}
            <AlertDialogAction onClick={confirmDelete} className={buttonVariants({ variant: "destructive" })}> 
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div> // This closes the main content div started earlier
    // </AppLayout> // This comment remains correctly outside JSX
  );
};

export default MyTemplates;
