import React from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatCurrency } from '@/lib/utils';

interface ConvertFormProps {
  idrxBalance: number;
  convertAmount: string;
  setConvertAmount: (amount: string) => void;
  convertDirection: string;
  setConvertDirection: (direction: string) => void;
  operationLoading: boolean;
  handleConvertSubmit: (e: React.FormEvent) => Promise<void>;
}

const ConvertForm: React.FC<ConvertFormProps> = ({
  idrxBalance,
  convertAmount,
  setConvertAmount,
  convertDirection,
  setConvertDirection,
  operationLoading,
  handleConvertSubmit,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Convert Currency</CardTitle>
        <CardDescription>
          Seamlessly convert between IDR and IDRX
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleConvertSubmit}>
          <div className="grid gap-6">
            <div className="space-y-2">
              <Label>Conversion Direction</Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant={
                    convertDirection === 'idrtoidrx'
                      ? 'default'
                      : 'outline'
                  }
                  className="flex-1 justify-start"
                  onClick={() => setConvertDirection('idrtoidrx')}
                >
                  <ArrowDownLeft className="mr-2 h-4 w-4" />
                  IDR to IDRX
                </Button>
                <Button
                  type="button"
                  variant={
                    convertDirection === 'idrxtoidr'
                      ? 'default'
                      : 'outline'
                  }
                  className="flex-1 justify-start"
                  onClick={() => setConvertDirection('idrxtoidr')}
                >
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  IDRX to IDR
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="convertAmount">
                  Amount ({convertDirection === 'idrtoidrx' ? 'IDR' : 'IDRX'})
                </Label>
                <Input
                  id="convertAmount"
                  type="number"
                  placeholder={`Enter amount in ${convertDirection === 'idrtoidrx' ? 'IDR' : 'IDRX'}`}
                  min="10000"
                  max={
                    convertDirection === 'idrxtoidr'
                      ? idrxBalance
                      : undefined
                  }
                  value={convertAmount}
                  onChange={(e) => setConvertAmount(e.target.value)}
                  required
                />
                <div className="flex flex-col sm:flex-row sm:justify-between text-xs">
                  <span className="text-muted-foreground">
                    Minimum conversion: Rp 10,000
                  </span>
                  {convertDirection === 'idrxtoidr' && (
                    <span className="text-muted-foreground">
                      Available IDRX: {formatCurrency(idrxBalance)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <Card className="bg-muted/20">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-muted-foreground">
                      Conversion Rate:
                    </span>
                    <span className="font-medium">1 IDR = 1 IDRX</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-muted-foreground">
                      Fee:
                    </span>
                    <span className="font-medium">0 IDRX</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      You will receive:
                    </span>
                    <span className="text-lg font-bold">
                      {convertAmount && !isNaN(parseFloat(convertAmount))
                        ? formatCurrency(parseFloat(convertAmount))
                        : formatCurrency(0)}{' '}
                      {convertDirection === 'idrtoidrx' ? 'IDRX' : 'IDR'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {convertDirection === 'idrxtoidr' && (
              <div className="space-y-2">
                <Label>Withdrawal Method</Label>
                <Select defaultValue="bank">
                  <SelectTrigger>
                    <SelectValue placeholder="Select withdrawal method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="ewallet">E-Wallet</SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-xs text-muted-foreground">
                  For bank transfers, please provide your bank details on
                  the withdraw tab.
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={operationLoading}
            >
              {operationLoading
                ? 'Processing...'
                : `Convert to ${convertDirection === 'idrtoidrx' ? 'IDRX' : 'IDR'}`}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConvertForm;
