import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Components
import {
  WalletHeader,
  TransactionHistory,
  DepositForm,
  WithdrawForm,
  ConvertForm,
} from './components';

// Types and services
import { WalletData, BankDetails, WalletProps } from './types';
import xellarKitService from '@/services/XellarKitService';
import idrxService from '@/services/IDRXService';

const Wallet: React.FC<WalletProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [loading, setLoading] = useState<boolean>(true);
  const [walletData, setWalletData] = useState<WalletData>({
    balance: {
      idrx: 0,
      lisk: 0,
    },
    transactions: [],
    depositAddress: '',
  });

  // Form states
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [convertAmount, setConvertAmount] = useState<string>('');
  const [convertDirection, setConvertDirection] = useState<string>('idrtoidrx');
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountName: '',
    accountNumber: '',
    bankName: '',
    bankBranch: '',
  });
  const [transactionFilter, setTransactionFilter] = useState<string>('all');
  const [operationLoading, setOperationLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        // Initialize services
        await Promise.all([
          xellarKitService.initialize(),
          // Other service initializations if needed
        ]);

        // Get wallet balance
        const walletBalance = await xellarKitService.getWalletBalance(
          user.walletAddress
        );

        // Get transaction history
        const txHistory = await xellarKitService.getTransactionHistory(
          user.walletAddress,
          50, // Fetch more transactions initially
          0
        );

        // Sort transactions by date (newest first)
        const sortedTransactions = txHistory.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        // Get deposit address
        const depositAddress = user.walletAddress;

        setWalletData({
          balance: walletBalance || { idrx: 1000000, lisk: 5.5 }, // Fallback to example data
          transactions: sortedTransactions || [],
          depositAddress,
        });
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        // Set example data for demonstration
        setWalletData({
          balance: { idrx: 1000000, lisk: 5.5 },
          transactions: [
            {
              id: 'tx-001',
              type: 'deposit',
              amount: 500000,
              currency: 'IDRX',
              date: '2023-06-20T14:30:00Z',
              status: 'completed',
              from: 'IDR Conversion',
              to: user.walletAddress,
            },
            {
              id: 'tx-002',
              type: 'purchase',
              amount: 180000,
              currency: 'IDRX',
              date: '2023-06-18T10:15:00Z',
              status: 'completed',
              from: user.walletAddress,
              to: 'seller-address-1',
              reference: 'Carbon Credits Purchase',
            },
            {
              id: 'tx-003',
              type: 'withdraw',
              amount: 250000,
              currency: 'IDRX',
              date: '2023-06-15T16:45:00Z',
              status: 'completed',
              from: user.walletAddress,
              to: 'IDR Conversion',
            },
            {
              id: 'tx-004',
              type: 'retirement',
              amount: 120000,
              currency: 'IDRX',
              date: '2023-06-12T09:30:00Z',
              status: 'completed',
              from: user.walletAddress,
              to: 'retirement-contract',
              reference: 'Credit Retirement',
            },
            {
              id: 'tx-005',
              type: 'deposit',
              amount: 300000,
              currency: 'IDRX',
              date: '2023-06-10T11:20:00Z',
              status: 'completed',
              from: 'IDR Conversion',
              to: user.walletAddress,
            },
          ],
          depositAddress: `lsk${Math.random().toString(36).substring(2, 15)}`,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [user.walletAddress]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !depositAmount ||
      isNaN(parseFloat(depositAmount)) ||
      parseFloat(depositAmount) <= 0
    ) {
      alert('Please enter a valid amount');
      return;
    }

    setOperationLoading(true);

    try {
      // In a real app, this would call the IDRX service
      console.log(`Converting ${depositAmount} IDR to IDRX`);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update balance
      const amount = parseFloat(depositAmount);
      setWalletData((prev) => ({
        ...prev,
        balance: {
          ...prev.balance,
          idrx: prev.balance.idrx + amount,
        },
        transactions: [
          {
            id: `tx-${Date.now()}`,
            type: 'deposit',
            amount: amount,
            currency: 'IDRX',
            date: new Date().toISOString(),
            status: 'completed',
            from: 'IDR Conversion',
            to: user.walletAddress,
          },
          ...prev.transactions,
        ],
      }));

      // Reset form
      setDepositAmount('');

      // Show success message
      alert('Deposit successful!');
    } catch (error) {
      console.error('Error depositing funds:', error);
      alert('Error depositing funds. Please try again.');
    } finally {
      setOperationLoading(false);
    }
  };

  const handleWithdrawSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !withdrawAmount ||
      isNaN(parseFloat(withdrawAmount)) ||
      parseFloat(withdrawAmount) <= 0
    ) {
      alert('Please enter a valid amount');
      return;
    }

    if (parseFloat(withdrawAmount) > walletData.balance.idrx) {
      alert('Insufficient balance');
      return;
    }

    // Validate bank details
    if (
      !bankDetails.accountName ||
      !bankDetails.accountNumber ||
      !bankDetails.bankName
    ) {
      alert('Please fill in all required bank details');
      return;
    }

    setOperationLoading(true);

    try {
      // In a real app, this would call the IDRX service
      console.log(`Withdrawing ${withdrawAmount} IDRX to IDR`, bankDetails);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update balance
      const amount = parseFloat(withdrawAmount);
      setWalletData((prev) => ({
        ...prev,
        balance: {
          ...prev.balance,
          idrx: prev.balance.idrx - amount,
        },
        transactions: [
          {
            id: `tx-${Date.now()}`,
            type: 'withdraw',
            amount: amount,
            currency: 'IDRX',
            date: new Date().toISOString(),
            status: 'completed',
            from: user.walletAddress,
            to: 'IDR Conversion',
            reference: `Bank transfer to ${bankDetails.accountName}`,
          },
          ...prev.transactions,
        ],
      }));

      // Reset form
      setWithdrawAmount('');
      setBankDetails({
        accountName: '',
        accountNumber: '',
        bankName: '',
        bankBranch: '',
      });

      // Show success message
      alert(
        'Withdrawal initiated! Funds will be transferred to your bank account.'
      );
    } catch (error) {
      console.error('Error withdrawing funds:', error);
      alert('Error withdrawing funds. Please try again.');
    } finally {
      setOperationLoading(false);
    }
  };

  const handleConvertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !convertAmount ||
      isNaN(parseFloat(convertAmount)) ||
      parseFloat(convertAmount) <= 0
    ) {
      alert('Please enter a valid amount');
      return;
    }

    if (
      convertDirection === 'idrxtoidr' &&
      parseFloat(convertAmount) > walletData.balance.idrx
    ) {
      alert('Insufficient IDRX balance');
      return;
    }

    setOperationLoading(true);

    try {
      // In a real app, this would call the IDRX service
      console.log(
        `Converting ${convertAmount} ${
          convertDirection === 'idrtoidrx' ? 'IDR to IDRX' : 'IDRX to IDR'
        }`
      );

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update balance
      const amount = parseFloat(convertAmount);
      if (convertDirection === 'idrtoidrx') {
        setWalletData((prev) => ({
          ...prev,
          balance: {
            ...prev.balance,
            idrx: prev.balance.idrx + amount,
          },
          transactions: [
            {
              id: `tx-${Date.now()}`,
              type: 'deposit',
              amount: amount,
              currency: 'IDRX',
              date: new Date().toISOString(),
              status: 'completed',
              from: 'IDR Conversion',
              to: user.walletAddress,
            },
            ...prev.transactions,
          ],
        }));
      } else {
        setWalletData((prev) => ({
          ...prev,
          balance: {
            ...prev.balance,
            idrx: prev.balance.idrx - amount,
          },
          transactions: [
            {
              id: `tx-${Date.now()}`,
              type: 'withdraw',
              amount: amount,
              currency: 'IDRX',
              date: new Date().toISOString(),
              status: 'completed',
              from: user.walletAddress,
              to: 'IDR Conversion',
            },
            ...prev.transactions,
          ],
        }));
      }

      // Reset form
      setConvertAmount('');

      // Show success message
      alert('Conversion successful!');
    } catch (error) {
      console.error('Error converting funds:', error);
      alert('Error converting funds. Please try again.');
    } finally {
      setOperationLoading(false);
    }
  };

  const handleBankDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletData.depositAddress);
    alert('Wallet address copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-1">IDRX Wallet</h1>
        <p className="text-muted-foreground">
          Manage your IDRX stablecoin for carbon credit transactions
        </p>
      </div>

      <WalletHeader
        walletData={walletData}
        handleCopyAddress={handleCopyAddress}
        setActiveTab={setActiveTab}
      />

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          <TabsTrigger value="convert">Convert</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <TransactionHistory
            transactions={walletData.transactions}
            transactionFilter={transactionFilter}
            setTransactionFilter={setTransactionFilter}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            transactionsPerPage={transactionsPerPage}
          />
        </TabsContent>

        <TabsContent value="deposit" className="mt-6">
          <DepositForm
            user={user}
            depositAddress={walletData.depositAddress}
            depositAmount={depositAmount}
            setDepositAmount={setDepositAmount}
            operationLoading={operationLoading}
            handleDepositSubmit={handleDepositSubmit}
            handleCopyAddress={handleCopyAddress}
          />
        </TabsContent>

        <TabsContent value="withdraw" className="mt-6">
          <WithdrawForm
            idrxBalance={walletData.balance.idrx}
            withdrawAmount={withdrawAmount}
            setWithdrawAmount={setWithdrawAmount}
            bankDetails={bankDetails}
            handleBankDetailsChange={handleBankDetailsChange}
            setBankDetails={setBankDetails}
            operationLoading={operationLoading}
            handleWithdrawSubmit={handleWithdrawSubmit}
          />
        </TabsContent>

        <TabsContent value="convert" className="mt-6">
          <ConvertForm
            idrxBalance={walletData.balance.idrx}
            convertAmount={convertAmount}
            setConvertAmount={setConvertAmount}
            convertDirection={convertDirection}
            setConvertDirection={setConvertDirection}
            operationLoading={operationLoading}
            handleConvertSubmit={handleConvertSubmit}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wallet;
