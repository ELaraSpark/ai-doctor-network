import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout'; // Use new layout
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusIcon, Search as SearchIcon } from 'lucide-react';
import { PageCard } from '@/components/library/PageCard'; // Use PageCard for templates
import { EmptyState } from '@/components/library/EmptyState'; // Import EmptyState
import { CardSkeleton } from '@/components/library/CardSkeleton'; // Import skeleton

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
    // Navigate to create template page or open modal
    console.log('Create new template');
    // Example: navigate('/templates/create');
  };
  
  const handleEditTemplate = (templateId: string) => {
     console.log(`Edit template ${templateId}`);
     // Open EditTemplateDialog or navigate
  };

  const handleDeleteTemplate = (templateId: string) => {
     console.log(`Delete template ${templateId}`);
     // Show confirmation, call API
  };

  return (
    <AppLayout>
      <div className="container mx-auto max-w-4xl px-4 py-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-perplexity-text-primary">My Templates</h1>
          <Button 
            size="sm" 
            className="bg-perplexity-teal hover:bg-perplexity-teal-dark text-white"
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
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-perplexity-text-tertiary pointer-events-none" 
          />
          <Input
            type="search"
            placeholder="Search templates..."
            className="w-full rounded-full bg-perplexity-bg-hover border-perplexity-border pl-10 pr-4 py-2 text-sm focus:bg-background focus:ring-1 focus:ring-perplexity-teal focus:border-perplexity-teal" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Template List */}
        <div className="flex-1 overflow-y-auto -mx-4"> {/* Allow list to scroll */}
           <div className="px-4 divide-y divide-perplexity-border">
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
              />
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MyTemplates;
