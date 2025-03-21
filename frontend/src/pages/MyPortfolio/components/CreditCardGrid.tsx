import React from 'react';
import { MapPin, CalendarClock } from 'lucide-react';
import { Credit } from '../types';
import { formatCurrency, formatProjectType, getProjectIcon } from '../utils';

interface CreditCardGridProps {
  credits: Credit[];
}

const CreditCardGrid: React.FC<CreditCardGridProps> = ({ credits }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {credits.map((credit) => (
        <div
          key={credit.id}
          className="rounded-lg border shadow-sm bg-card text-card-foreground overflow-hidden flex flex-col h-full"
        >
          <div className="aspect-video w-full relative overflow-hidden">
            <div
              className="w-full h-full flex justify-center items-center"
              style={{ backgroundColor: credit.color }}
            >
              {getProjectIcon(credit.projectType)}
            </div>

            {credit.status === 'listed' && (
              <div className="absolute top-2 right-2">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-600 text-white">
                  Listed for Sale
                </span>
              </div>
            )}
          </div>

          <div className="p-4 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                {formatProjectType(credit.projectType)}
              </span>
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                {credit.standard}
              </span>
            </div>

            <h3 className="font-semibold text-lg mb-1">{credit.projectName}</h3>

            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <MapPin className="h-3.5 w-3.5 mr-1 opacity-70" />
              <span>
                {credit.location.region}, {credit.location.country}
              </span>
            </div>

            <div className="flex items-center text-sm text-muted-foreground mb-3">
              <CalendarClock className="h-3.5 w-3.5 mr-1 opacity-70" />
              <span>Vintage {credit.vintage}</span>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {credit.description}
            </p>

            <div className="mt-auto pt-2">
              <div className="flex justify-between items-center mb-3">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Quantity</p>
                  <p className="font-medium">{credit.quantity} tonnes</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-xs text-muted-foreground">Value</p>
                  <p className="font-medium">
                    {formatCurrency(credit.totalPrice)}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                {credit.status === 'listed' ? (
                  <button className="flex-1 inline-flex items-center justify-center rounded-md border border-input text-sm font-medium bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                    View Listing
                  </button>
                ) : (
                  <button className="flex-1 inline-flex items-center justify-center rounded-md border border-input text-sm font-medium bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                    Create Listing
                  </button>
                )}
                <button className="flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
                  Retire
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CreditCardGrid;
