import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileFilterToggleProps {
  showFilters: boolean;
  toggleFilters: () => void;
}

const MobileFilterToggle: React.FC<MobileFilterToggleProps> = ({
  showFilters,
  toggleFilters
}) => {
  return (
    <div className="md:hidden">
      <Button 
        variant="outline" 
        onClick={toggleFilters} 
        className="w-full"
      >
        <Filter className="mr-2 h-4 w-4" />
        {showFilters ? "Hide Filters" : "Show Filters"}
      </Button>
    </div>
  );
};

export default MobileFilterToggle;