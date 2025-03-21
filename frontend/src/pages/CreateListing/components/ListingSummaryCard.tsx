import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Credit, FormValues } from '../types';
import { formatCurrency } from '@/lib/utils';

interface ListingSummaryCardProps {
  selectedCredit: Credit;
  formValues: FormValues;
  submitting: boolean;
  calculateTotal: () => number;
  getPlatformFee: () => number;
  getReceiveAmount: () => number;
}

const ListingSummaryCard: React.FC<ListingSummaryCardProps> = ({
  selectedCredit,
  formValues,
  submitting,
  calculateTotal,
  getPlatformFee,
  getReceiveAmount,
}) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Listing Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-4">
          <div className="flex justify-between py-2 border-b">
            <dt className="text-muted-foreground">Project:</dt>
            <dd className="font-medium">{selectedCredit.projectName}</dd>
          </div>
          <div className="flex justify-between py-2 border-b">
            <dt className="text-muted-foreground">Quantity:</dt>
            <dd className="font-medium">{formValues.quantity} tonnes</dd>
          </div>
          <div className="flex justify-between py-2 border-b">
            <dt className="text-muted-foreground">Price per Tonne:</dt>
            <dd className="font-medium">
              {formatCurrency(formValues.pricePerUnit as number)}
            </dd>
          </div>
          <div className="flex justify-between py-2 border-b">
            <dt className="text-muted-foreground">Total Listing Value:</dt>
            <dd className="font-medium">{formatCurrency(calculateTotal())}</dd>
          </div>
          <div className="flex justify-between py-2 border-b">
            <dt className="text-muted-foreground">Platform Fee (2%):</dt>
            <dd className="font-medium">{formatCurrency(getPlatformFee())}</dd>
          </div>
          <div className="flex justify-between py-2 font-medium">
            <dt>You Will Receive:</dt>
            <dd className="text-lg">{formatCurrency(getReceiveAmount())}</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/portfolio')}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Creating Listing...' : 'Create Listing'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ListingSummaryCard;
