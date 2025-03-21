import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface MarketplaceHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({
  searchQuery,
  setSearchQuery
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Carbon Credit Marketplace</h1>
        <p className="text-muted-foreground">
          Browse and purchase verified carbon credits from projects across Indonesia
        </p>
      </div>
      
      <div className="w-full md:w-auto">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects or regions..."
            className="pl-9 w-full md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHeader;