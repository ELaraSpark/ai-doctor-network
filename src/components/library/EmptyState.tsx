import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PicassoIllustration } from '@/components/illustrations/PicassoIllustration';
import { IllustrationName } from '@/components/illustrations/illustrations';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  icon?: React.ReactNode;
  illustrationType?: IllustrationName;
  className?: string;
}

export const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  illustrationType = 'empty',
  className,
}: EmptyStateProps) => {
  // Use provided icon or Picasso illustration
  const displayIcon = icon || (
    <PicassoIllustration 
      name={illustrationType} 
      size="xl" 
      color="text-perplexity-teal" 
      className="opacity-80"
    />
  );
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      <div className="mb-6">
        {displayIcon}
      </div>
      <h3 className="text-lg font-medium text-perplexity-text-primary mb-2">
        {title}
      </h3>
      <p className="text-sm text-perplexity-text-secondary mb-6 max-w-md">
        {description}
      </p>
      <Button 
        onClick={onAction}
        className="bg-perplexity-teal hover:bg-perplexity-teal-dark text-white" // Use specific colors
      >
        {actionLabel}
      </Button>
    </div>
  );
};
