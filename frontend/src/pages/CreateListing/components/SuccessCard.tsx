import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Credit, FormValues } from '../types';
import { formatCurrency } from '@/lib/utils';

interface SuccessCardProps {
  selectedCredit: Credit;
  formValues: FormValues;
  calculateTotal: () => number;
}

const SuccessCard: React.FC<SuccessCardProps> = ({
  selectedCredit,
  formValues,
  calculateTotal,
}) => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">
            Listing Created Successfully!
          </CardTitle>
          <CardDescription className="text-lg">
            Your carbon credits have been listed on the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Project:</p>
                <p className="font-medium">{selectedCredit.projectName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Quantity:</p>
                <p className="font-medium">{formValues.quantity} tonnes</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Price Per Tonne:
                </p>
                <p className="font-medium">
                  {formatCurrency(formValues.pricePerUnit as number)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Value:</p>
                <p className="font-medium">
                  {formatCurrency(calculateTotal())}
                </p>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Redirecting to your portfolio in a few seconds...
          </p>
        </CardContent>
        <CardFooter className="justify-between flex">
          <Button variant="outline" onClick={() => navigate('/marketplace')}>
            View Marketplace
          </Button>
          <Button onClick={() => navigate('/portfolio')}>
            Go to My Portfolio
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SuccessCard;
