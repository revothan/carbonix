import React from 'react';
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
import { Separator } from '@/components/ui/separator';
import { User } from '../types';

interface DepositFormProps {
  user: User;
  depositAddress: string;
  depositAmount: string;
  setDepositAmount: (amount: string) => void;
  operationLoading: boolean;
  handleDepositSubmit: (e: React.FormEvent) => Promise<void>;
  handleCopyAddress: () => void;
}

const DepositForm: React.FC<DepositFormProps> = ({
  user,
  depositAddress,
  depositAmount,
  setDepositAmount,
  operationLoading,
  handleDepositSubmit,
  handleCopyAddress,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Bank Transfer (IDR)</CardTitle>
          <CardDescription>
            Transfer IDR from your bank account and convert to IDRX
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <form onSubmit={handleDepositSubmit}>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="depositAmount">Amount (IDR)</Label>
                <div className="flex gap-2">
                  <Input
                    id="depositAmount"
                    type="number"
                    placeholder="Enter amount"
                    min="10000"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    required
                  />
                  <Button type="submit" disabled={operationLoading}>
                    {operationLoading ? 'Processing...' : 'Deposit'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Minimum deposit: Rp 10,000
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Bank Transfer Details</Label>
                <div className="rounded-md border bg-muted/50 p-4">
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Bank Name:
                      </span>
                      <span className="text-sm font-medium">
                        Bank Central Asia (BCA)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Account Number:
                      </span>
                      <span className="text-sm font-medium">
                        1234-5678-9012
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Account Name:
                      </span>
                      <span className="text-sm font-medium">
                        PT Carbonix Indonesia
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Reference:
                      </span>
                      <span className="text-sm font-medium">
                        {user.walletAddress.substring(0, 8)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Include your reference code in the transfer description
                  to ensure proper routing
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Direct IDRX Deposit</CardTitle>
          <CardDescription>
            If you already have IDRX, you can send it directly to your
            wallet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Your IDRX Deposit Address</Label>
              <div className="flex gap-2">
                <code className="flex-1 p-2 bg-muted rounded-md text-sm break-all">
                  {depositAddress}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyAddress}
                >
                  Copy
                </Button>
              </div>
            </div>

            <div className="flex justify-center py-4">
              <div className="w-40 h-40 bg-muted flex items-center justify-center rounded-md">
                <span className="text-muted-foreground">QR Code</span>
              </div>
            </div>

            <div className="rounded-md border bg-muted/50 p-4">
              <h4 className="font-medium text-sm mb-2">
                Important Notes:
              </h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Only send IDRX to this address</li>
                <li>• Deposits typically confirm within 5-10 minutes</li>
                <li>• Minimum deposit amount: 10,000 IDRX</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepositForm;
