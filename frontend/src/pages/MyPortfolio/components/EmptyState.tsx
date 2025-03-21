import React from 'react';
import { Leaf } from 'lucide-react';

interface EmptyStateProps {
  type: 'credits' | 'retirements';
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, onAction }) => {
  const content = {
    credits: {
      title: 'No carbon credits found',
      description:
        "You don't have any active carbon credits in your portfolio. Purchase some from the marketplace to get started.",
      buttonText: 'Browse Marketplace',
    },
    retirements: {
      title: 'No retired credits found',
      description:
        "You haven't retired any carbon credits yet. Retire credits to offset your carbon footprint and receive a certificate.",
      buttonText: 'Retire Credits',
    },
  };

  return (
    <div className="rounded-lg border shadow-sm bg-card text-card-foreground p-8 text-center">
      <div className="flex flex-col items-center gap-2">
        <div className="rounded-full bg-muted p-3">
          <Leaf className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mt-2">{content[type].title}</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-4">
          {content[type].description}
        </p>
        <button 
          className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={onAction}
        >
          {content[type].buttonText}
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
