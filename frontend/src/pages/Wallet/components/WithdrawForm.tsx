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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';
import { BankDetails } from '../types';

interface WithdrawFormProps {
  idrxBalance: number;
  withdrawAmount: string;
  setWithdrawAmount: (amount: string) => void;
  bankDetails: BankDetails;
  handleBankDetailsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setBankDetails: React.Dispatch<React.SetStateAction<BankDetails>>;
  operationLoading: boolean;
  handleWithdrawSubmit: (e: React.FormEvent) => Promise<void>;
}

const WithdrawForm: React.FC<WithdrawFormProps> = ({
  idrxBalance,
  withdrawAmount,
  setWithdrawAmount,
  bankDetails,
  handleBankDetailsChange,
  setBankDetails,
  operationLoading,
  handleWithdrawSubmit,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Withdraw IDRX</CardTitle>
        <CardDescription>
          Convert IDRX back to IDR and withdraw to your bank account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleWithdrawSubmit}>
          <div className="grid gap-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="withdrawAmount">Amount (IDRX)</Label>
                <Input
                  id="withdrawAmount"
                  type="number"
                  placeholder="Enter amount to withdraw"
                  min="50000"
                  max={idrxBalance}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  required
                />
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    Minimum withdrawal: Rp 50,000
                  </span>
                  <span className="text-muted-foreground">
                    Available: {formatCurrency(idrxBalance)}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4">
                Bank Account Details
              </h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountName">
                      Account Holder Name
                    </Label>
                    <Input
                      id="accountName"
                      name="accountName"
                      value={bankDetails.accountName}
                      onChange={handleBankDetailsChange}
                      placeholder="Enter account holder name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      name="accountNumber"
                      value={bankDetails.accountNumber}
                      onChange={handleBankDetailsChange}
                      placeholder="Enter account number"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Select
                      value={bankDetails.bankName}
                      onValueChange={(value) =>
                        setBankDetails((prev) => ({
                          ...prev,
                          bankName: value,
                        }))
                      }
                    >
                      <SelectTrigger id="bankName">
                        <SelectValue placeholder="Select a bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BCA">
                          Bank Central Asia (BCA)
                        </SelectItem>
                        <SelectItem value="Mandiri">
                          Bank Mandiri
                        </SelectItem>
                        <SelectItem value="BNI">
                          Bank Negara Indonesia (BNI)
                        </SelectItem>
                        <SelectItem value="BRI">
                          Bank Rakyat Indonesia (BRI)
                        </SelectItem>
                        <SelectItem value="CIMB Niaga">
                          CIMB Niaga
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankBranch">
                      Bank Branch (Optional)
                    </Label>
                    <Input
                      id="bankBranch"
                      name="bankBranch"
                      value={bankDetails.bankBranch}
                      onChange={handleBankDetailsChange}
                      placeholder="Enter bank branch"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md border-l-4 border-yellow-400 bg-yellow-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Withdrawals are typically processed within 1-2
                    business days. A processing fee of Rp 5,000 will be
                    applied.
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={operationLoading}
            >
              {operationLoading
                ? 'Processing...'
                : 'Withdraw to Bank Account'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default WithdrawForm;
