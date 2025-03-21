import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CalendarClock, Leaf, Sun, Waves, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { Listing, ProjectType } from '../types';

interface ListingCardProps {
  listing: Listing;
  imageErrors: Record<string, boolean>;
  onImageError: (listingId: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  imageErrors,
  onImageError
}) => {
  const getProjectIcon = (projectType: ProjectType) => {
    switch (projectType) {
      case 'forest_conservation':
        return <Leaf className="h-12 w-12 text-white opacity-90" />;
      case 'renewable_energy':
        return <Sun className="h-12 w-12 text-white opacity-90" />;
      case 'blue_carbon':
        return <Waves className="h-12 w-12 text-white opacity-90" />;
      default:
        return <ImageIcon className="h-12 w-12 text-white opacity-90" />;
    }
  };

  const formatProjectType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Card key={listing.id} className="overflow-hidden h-full flex flex-col">
      <div className="aspect-video w-full overflow-hidden bg-muted">
        {imageErrors[listing.id] ? (
          <div 
            className="w-full h-full flex justify-center items-center" 
            style={{ backgroundColor: listing.color || '#2e7d32' }}
          >
            {getProjectIcon(listing.projectType)}
          </div>
        ) : (
          <img
            src={listing.imageUrl}
            alt={listing.projectName}
            className="h-full w-full object-cover transition-all hover:scale-105"
            onError={() => onImageError(listing.id)}
          />
        )}
      </div>
      <CardContent className="p-4 md:p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="px-2 py-0">
            {formatProjectType(listing.projectType)}
          </Badge>
          <Badge variant="outline" className="px-2 py-0">
            {listing.standard}
          </Badge>
        </div>

        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{listing.projectName}</h3>
        
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-3.5 w-3.5 mr-1 opacity-70" />
          <span>{listing.region}, {listing.country}</span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <CalendarClock className="h-3.5 w-3.5 mr-1 opacity-70" />
          <span>Vintage {listing.vintage}</span>
        </div>

        <div className="mt-auto space-y-3 pt-3">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Price per tonne</p>
              <div className="font-semibold">
                {formatCurrency(listing.pricePerUnit)}
              </div>
            </div>
            <div className="text-right space-y-1">
              <p className="text-xs text-muted-foreground">Available</p>
              <div className="font-medium">
                {listing.quantity.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">tonnes</span>
              </div>
            </div>
          </div>
          
          <div className="pt-2">
            <Link 
              to={`/credits/${listing.creditId}`}
            >
              <Button className="w-full">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingCard;