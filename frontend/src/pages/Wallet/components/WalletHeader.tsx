import React from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { WalletData } from '../types';

interface WalletHeaderProps {
  walletData: WalletData;
  handleCopyAddress: () => void;
  setActiveTab: (tab: string) => void;
}

const WalletHeader: React.FC<WalletHeaderProps> = ({
  walletData,
  handleCopyAddress,
  setActiveTab,
}) => {
  return (
    <div className="mb-6">
      <Card className="bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Your Wallet Address
                </h3>
                <div className="flex items-center mt-1 gap-2">
                  <code className="bg-muted px-2 py-1 rounded text-sm flex-1 overflow-hidden text-ellipsis">
                    {walletData.depositAddress}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-primary-foreground">
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-muted-foreground">
                      IDRX Balance
                    </div>
                    <div className="text-3xl font-bold mt-1">
                      {formatCurrency(walletData.balance.idrx)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      1 IDRX = 1 IDR
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-secondary-foreground">
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-muted-foreground">
                      Lisk Balance
                    </div>
                    <div className="text-3xl font-bold mt-1">
                      {walletData.balance.lisk.toFixed(2)}{' '}
                      <span className="text-sm font-normal">LSK</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Used for network fees
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex flex-col gap-2 md:w-64">
              <Button 
                className="w-full"
                onClick={() => setActiveTab("deposit")}
              >
                <ArrowDownLeft className="mr-2 h-4 w-4" /> Deposit
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setActiveTab("withdraw")}
              >
                <ArrowUpRight className="mr-2 h-4 w-4" /> Withdraw
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletHeader;
