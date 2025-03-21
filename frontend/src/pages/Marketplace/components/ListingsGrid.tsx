import React from 'react';
import { Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import ListingCard from './ListingCard';
import { Listing } from '../types';

interface ListingsGridProps {
  listings: Listing[];
  imageErrors: Record<string, boolean>;
  onImageError: (listingId: string) => void;
}

const ListingsGrid: React.FC<ListingsGridProps> = ({
  listings,
  imageErrors,
  onImageError
}) => {
  return (
    <div className="flex-1">
      {listings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              imageErrors={imageErrors}
              onImageError={onImageError}
            />
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-muted p-3">
              <Filter className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mt-2">No listings found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              No listings match your current filters. Try adjusting your criteria or check back later for new listings.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ListingsGrid;