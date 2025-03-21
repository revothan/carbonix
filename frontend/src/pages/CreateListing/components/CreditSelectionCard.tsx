import React from 'react';
import { Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Credit, FormErrors, FormValues } from '../types';

interface CreditSelectionCardProps {
  availableCredits: Credit[];
  selectedCredit: Credit | null;
  formValues: FormValues;
  formErrors: FormErrors;
  fetchingCredits: boolean;
  handleSelectChange: (name: string, value: string) => void;
}

const CreditSelectionCard: React.FC<CreditSelectionCardProps> = ({
  availableCredits,
  selectedCredit,
  formValues,
  formErrors,
  fetchingCredits,
  handleSelectChange,
}) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Credit Information</CardTitle>
        <CardDescription>
          Select which carbon credit you'd like to list for sale
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!fetchingCredits ? (
          availableCredits.length > 0 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="creditId">
                  Select Carbon Credit <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formValues.creditId}
                  onValueChange={(value) => handleSelectChange('creditId', value)}
                >
                  <SelectTrigger
                    id="creditId"
                    className={formErrors.creditId ? 'border-destructive' : ''}
                  >
                    <SelectValue placeholder="Select a carbon credit" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCredits.map((credit) => (
                      <SelectItem key={credit.id} value={credit.id}>
                        {credit.projectName} ({credit.availableQuantity} tonnes)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.creditId && (
                  <p className="text-sm text-destructive mt-1">
                    {formErrors.creditId}
                  </p>
                )}
              </div>

              {selectedCredit && (
                <div className="mt-4 rounded-lg border overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden bg-muted relative">
                    <img
                      src={selectedCredit.imageUrl}
                      alt={selectedCredit.projectName}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        const parent = target.parentNode as HTMLElement;
                        if (parent) {
                          parent.style.backgroundColor = selectedCredit.color || '#2e7d32';
                        }
                        target.style.display = 'none';
                        const icon = document.createElement('div');
                        icon.className = 'absolute inset-0 flex items-center justify-center';
                        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-leaf"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>';
                        parent?.appendChild(icon);
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex gap-2 mb-2">
                      <Badge variant="secondary">
                        {selectedCredit.projectType
                          .split('_')
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(' ')}
                      </Badge>
                      <Badge variant="outline">{selectedCredit.standard}</Badge>
                      <Badge variant="outline">
                        Vintage {selectedCredit.vintage}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold">
                      {selectedCredit.projectName}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Available quantity: {selectedCredit.availableQuantity} tonnes
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <Leaf className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">
                No carbon credits available
              </h3>
              <p className="text-muted-foreground mt-1 max-w-md">
                You don't have any carbon credits to list. Purchase credits from
                the marketplace first.
              </p>
              <Button className="mt-4" onClick={() => navigate('/marketplace')}>
                Browse Marketplace
              </Button>
            </div>
          )
        ) : (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreditSelectionCard;
