import React, { useState, useEffect } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  ChevronDown,
  Filter,
  Download,
  Share2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

import xellarKitService from "../services/XellarKitService";
import idrxService from "../services/IDRXService";

const Wallet = ({ user }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [walletData, setWalletData] = useState({
    balance: {
      idrx: 0,
      lisk: 0,
    },
    transactions: [],
    depositAddress: "",
  });

  // Form states
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [convertAmount, setConvertAmount] = useState("");
  const [convertDirection, setConvertDirection] = useState("idrtoidrx");
  const [bankDetails, setBankDetails] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    bankBranch: "",
  });
  const [transactionFilter, setTransactionFilter] = useState("all");
  const [operationLoading, setOperationLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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
          user.walletAddress,
        );

        // Get transaction history
        const txHistory = await xellarKitService.getTransactionHistory(
          user.walletAddress,
          50, // Fetch more transactions initially
          0,
        );

        // Sort transactions by date (newest first)
        const sortedTransactions = txHistory.sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );

        // Get deposit address
        const depositAddress = user.walletAddress;

        setWalletData({
          balance: walletBalance || { idrx: 1000000, lisk: 5.5 }, // Fallback to example data
          transactions: sortedTransactions || [],
          depositAddress,
        });
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        // Set example data for demonstration
        setWalletData({
          balance: { idrx: 1000000, lisk: 5.5 },
          transactions: [
            {
              id: "tx-001",
              type: "deposit",
              amount: 500000,
              currency: "IDRX",
              date: "2023-06-20T14:30:00Z",
              status: "completed",
              from: "IDR Conversion",
              to: user.walletAddress,
            },
            {
              id: "tx-002",
              type: "purchase",
              amount: 180000,
              currency: "IDRX",
              date: "2023-06-18T10:15:00Z",
              status: "completed",
              from: user.walletAddress,
              to: "seller-address-1",
              reference: "Carbon Credits Purchase",
            },
            {
              id: "tx-003",
              type: "withdraw",
              amount: 250000,
              currency: "IDRX",
              date: "2023-06-15T16:45:00Z",
              status: "completed",
              from: user.walletAddress,
              to: "IDR Conversion",
            },
            {
              id: "tx-004",
              type: "retirement",
              amount: 120000,
              currency: "IDRX",
              date: "2023-06-12T09:30:00Z",
              status: "completed",
              from: user.walletAddress,
              to: "retirement-contract",
              reference: "Credit Retirement",
            },
            {
              id: "tx-005",
              type: "deposit",
              amount: 300000,
              currency: "IDRX",
              date: "2023-06-10T11:20:00Z",
              status: "completed",
              from: "IDR Conversion",
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

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleDepositSubmit = async (e) => {
    e.preventDefault();

    if (
      !depositAmount ||
      isNaN(parseFloat(depositAmount)) ||
      parseFloat(depositAmount) <= 0
    ) {
      alert("Please enter a valid amount");
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
            type: "deposit",
            amount: amount,
            currency: "IDRX",
            date: new Date().toISOString(),
            status: "completed",
            from: "IDR Conversion",
            to: user.walletAddress,
          },
          ...prev.transactions,
        ],
      }));

      // Reset form
      setDepositAmount("");

      // Show success message
      alert("Deposit successful!");
    } catch (error) {
      console.error("Error depositing funds:", error);
      alert("Error depositing funds. Please try again.");
    } finally {
      setOperationLoading(false);
    }
  };

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();

    if (
      !withdrawAmount ||
      isNaN(parseFloat(withdrawAmount)) ||
      parseFloat(withdrawAmount) <= 0
    ) {
      alert("Please enter a valid amount");
      return;
    }

    if (parseFloat(withdrawAmount) > walletData.balance.idrx) {
      alert("Insufficient balance");
      return;
    }

    // Validate bank details
    if (
      !bankDetails.accountName ||
      !bankDetails.accountNumber ||
      !bankDetails.bankName
    ) {
      alert("Please fill in all required bank details");
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
            type: "withdraw",
            amount: amount,
            currency: "IDRX",
            date: new Date().toISOString(),
            status: "completed",
            from: user.walletAddress,
            to: "IDR Conversion",
            reference: `Bank transfer to ${bankDetails.accountName}`,
          },
          ...prev.transactions,
        ],
      }));

      // Reset form
      setWithdrawAmount("");
      setBankDetails({
        accountName: "",
        accountNumber: "",
        bankName: "",
        bankBranch: "",
      });

      // Show success message
      alert(
        "Withdrawal initiated! Funds will be transferred to your bank account.",
      );
    } catch (error) {
      console.error("Error withdrawing funds:", error);
      alert("Error withdrawing funds. Please try again.");
    } finally {
      setOperationLoading(false);
    }
  };

  const handleConvertSubmit = async (e) => {
    e.preventDefault();

    if (
      !convertAmount ||
      isNaN(parseFloat(convertAmount)) ||
      parseFloat(convertAmount) <= 0
    ) {
      alert("Please enter a valid amount");
      return;
    }

    if (
      convertDirection === "idrxtoidr" &&
      parseFloat(convertAmount) > walletData.balance.idrx
    ) {
      alert("Insufficient IDRX balance");
      return;
    }

    setOperationLoading(true);

    try {
      // In a real app, this would call the IDRX service
      console.log(
        `Converting ${convertAmount} ${convertDirection === "idrtoidrx" ? "IDR to IDRX" : "IDRX to IDR"}`,
      );

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update balance
      const amount = parseFloat(convertAmount);
      if (convertDirection === "idrtoidrx") {
        setWalletData((prev) => ({
          ...prev,
          balance: {
            ...prev.balance,
            idrx: prev.balance.idrx + amount,
          },
          transactions: [
            {
              id: `tx-${Date.now()}`,
              type: "deposit",
              amount: amount,
              currency: "IDRX",
              date: new Date().toISOString(),
              status: "completed",
              from: "IDR Conversion",
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
              type: "withdraw",
              amount: amount,
              currency: "IDRX",
              date: new Date().toISOString(),
              status: "completed",
              from: user.walletAddress,
              to: "IDR Conversion",
            },
            ...prev.transactions,
          ],
        }));
      }

      // Reset form
      setConvertAmount("");

      // Show success message
      alert("Conversion successful!");
    } catch (error) {
      console.error("Error converting funds:", error);
      alert("Error converting funds. Please try again.");
    } finally {
      setOperationLoading(false);
    }
  };

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletData.depositAddress);
    alert("Wallet address copied to clipboard!");
  };

  const getTransactionTypeIcon = (type) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case "withdraw":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case "purchase":
        return <ArrowUpRight className="h-4 w-4 text-blue-500" />;
      case "sale":
        return <ArrowDownLeft className="h-4 w-4 text-blue-500" />;
      case "retirement":
        return <Clock className="h-4 w-4 text-purple-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTransactionLabel = (type) => {
    switch (type) {
      case "deposit":
        return "Deposit";
      case "withdraw":
        return "Withdrawal";
      case "purchase":
        return "Purchase";
      case "sale":
        return "Sale";
      case "retirement":
        return "Retirement";
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge
            variant="outline"
            className="text-green-600 bg-green-50 border-green-200"
          >
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="text-yellow-600 bg-yellow-50 border-yellow-200"
          >
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge
            variant="outline"
            className="text-red-600 bg-red-50 border-red-200"
          >
            Failed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
    }
  };

  const filteredTransactions = walletData.transactions.filter((tx) => {
    if (transactionFilter === "all") return true;
    return tx.type === transactionFilter;
  });

  // Calculate pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction,
  );
  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage,
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner"></div>
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
                        {walletData.balance.lisk.toFixed(2)}{" "}
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
                <Button className="w-full">
                  <ArrowDownLeft className="mr-2 h-4 w-4" /> Deposit
                </Button>
                <Button variant="outline" className="w-full">
                  <ArrowUpRight className="mr-2 h-4 w-4" /> Withdraw
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <CardTitle>Transaction History</CardTitle>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select
                    value={transactionFilter}
                    onValueChange={setTransactionFilter}
                  >
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter transactions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Transactions</SelectItem>
                      <SelectItem value="deposit">Deposits</SelectItem>
                      <SelectItem value="withdraw">Withdrawals</SelectItem>
                      <SelectItem value="purchase">Purchases</SelectItem>
                      <SelectItem value="sale">Sales</SelectItem>
                      <SelectItem value="retirement">Retirements</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Type
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Amount
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Date
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Status
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTransactions.length > 0 ? (
                        currentTransactions.map((tx) => (
                          <tr
                            key={tx.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle flex items-center gap-2">
                              {getTransactionTypeIcon(tx.type)}
                              <span>{formatTransactionLabel(tx.type)}</span>
                            </td>
                            <td
                              className={`p-4 align-middle ${tx.type === "withdraw" || tx.type === "purchase" ? "text-red-600" : "text-green-600"}`}
                            >
                              {tx.type === "withdraw" || tx.type === "purchase"
                                ? "- "
                                : "+ "}
                              {formatCurrency(tx.amount)}
                            </td>
                            <td className="p-4 align-middle">
                              {formatDate(tx.date)}
                            </td>
                            <td className="p-4 align-middle">
                              {getStatusBadge(tx.status)}
                            </td>
                            <td className="p-4 align-middle">
                              {tx.reference ||
                                `${tx.type === "withdraw" ? "To" : "From"}: ${tx.type === "withdraw" ? tx.to : tx.from}`}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="p-4 text-center text-muted-foreground"
                          >
                            No transactions found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {filteredTransactions.length > transactionsPerPage && (
                <div className="flex justify-center space-x-1 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deposit" className="mt-6">
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
                          {operationLoading ? "Processing..." : "Deposit"}
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
        </TabsContent>

        <TabsContent value="withdraw" className="mt-6">
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
                        max={walletData.balance.idrx}
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        required
                      />
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          Minimum withdrawal: Rp 50,000
                        </span>
                        <span className="text-muted-foreground">
                          Available: {formatCurrency(walletData.balance.idrx)}
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
                      ? "Processing..."
                      : "Withdraw to Bank Account"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="convert" className="mt-6">
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
                          convertDirection === "idrtoidrx"
                            ? "default"
                            : "outline"
                        }
                        className="flex-1 justify-start"
                        onClick={() => setConvertDirection("idrtoidrx")}
                      >
                        <ArrowDownLeft className="mr-2 h-4 w-4" />
                        IDR to IDRX
                      </Button>
                      <Button
                        type="button"
                        variant={
                          convertDirection === "idrxtoidr"
                            ? "default"
                            : "outline"
                        }
                        className="flex-1 justify-start"
                        onClick={() => setConvertDirection("idrxtoidr")}
                      >
                        <ArrowUpRight className="mr-2 h-4 w-4" />
                        IDRX to IDR
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="convertAmount">
                        Amount (
                        {convertDirection === "idrtoidrx" ? "IDR" : "IDRX"})
                      </Label>
                      <Input
                        id="convertAmount"
                        type="number"
                        placeholder={`Enter amount in ${convertDirection === "idrtoidrx" ? "IDR" : "IDRX"}`}
                        min="10000"
                        max={
                          convertDirection === "idrxtoidr"
                            ? walletData.balance.idrx
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
                        {convertDirection === "idrxtoidr" && (
                          <span className="text-muted-foreground">
                            Available IDRX:{" "}
                            {formatCurrency(walletData.balance.idrx)}
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
                              : formatCurrency(0)}{" "}
                            {convertDirection === "idrtoidrx" ? "IDRX" : "IDR"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {convertDirection === "idrxtoidr" && (
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
                      ? "Processing..."
                      : `Convert to ${convertDirection === "idrtoidrx" ? "IDRX" : "IDR"}`}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wallet;
