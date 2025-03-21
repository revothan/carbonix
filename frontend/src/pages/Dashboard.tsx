import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';
import { BarChart, LineChart, CircleDollarSign, Leaf, TrendingUp } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface User {
  id: string;
  displayName?: string;
  email?: string;
  walletAddress?: string;
  [key: string]: any;
}

interface Transaction {
  id: string;
  type: 'purchase' | 'listing' | 'retirement' | string;
  amount: number;
  date: string;
  status: 'complete' | 'active' | 'pending' | string;
}

interface DashboardStats {
  totalCredits: number;
  activeListings: number;
  offsetCredits: number;
  recentTransactions: Transaction[];
}

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [stats, setStats] = useState<DashboardStats>({
    totalCredits: 25430,
    activeListings: 143,
    offsetCredits: 1254,
    recentTransactions: [
      { id: 'tx1', type: 'purchase', amount: 5, date: new Date().toISOString(), status: 'complete' },
      { id: 'tx2', type: 'listing', amount: 10, date: new Date().toISOString(), status: 'active' },
      { id: 'tx3', type: 'retirement', amount: 3, date: new Date().toISOString(), status: 'complete' }
    ]
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate API call with a timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const getStatusBadge = (status: string): JSX.Element => {
    switch(status) {
      case 'complete':
        return <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-700 border-green-200">Complete</span>;
      case 'active':
        return <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 border-blue-200">Active</span>;
      case 'pending':
        return <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-yellow-50 text-yellow-700 border-yellow-200">Pending</span>;
      default:
        return <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-50 text-gray-700 border-gray-200">{status}</span>;
    }
  };

  const getTypeIcon = (type: string): JSX.Element | null => {
    switch(type) {
      case 'purchase':
        return <CircleDollarSign className="h-4 w-4 mr-1 text-blue-500" />;
      case 'listing':
        return <TrendingUp className="h-4 w-4 mr-1 text-purple-500" />;
      case 'retirement':
        return <Leaf className="h-4 w-4 mr-1 text-green-500" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {user.displayName || 'User'}</h1>
        <p className="text-muted-foreground mt-2">Here's an overview of your carbon portfolio and market activity.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Carbon Credits</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCredits.toLocaleString()} tonnes CO₂</div>
            <p className="text-xs text-muted-foreground mt-1">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Marketplace Listings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeListings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently available for sale</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Offsetted</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.offsetCredits.toLocaleString()} tonnes CO₂</div>
            <p className="text-xs text-muted-foreground mt-1">Permanently retired credits</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest activities on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="flex items-center">
                      {getTypeIcon(transaction.type)}
                      <span className="capitalize">{transaction.type}</span>
                    </TableCell>
                    <TableCell>{transaction.amount} tonnes</TableCell>
                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button variant="outline" size="sm">View All Transactions</Button>
          </CardFooter>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to perform</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Link to="/marketplace">
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                Browse Marketplace
              </Button>
            </Link>
            <Link to="/create-listing">
              <Button className="w-full justify-start" variant="outline">
                <CircleDollarSign className="mr-2 h-4 w-4" />
                Create New Listing
              </Button>
            </Link>
            <Link to="/retire">
              <Button className="w-full justify-start" variant="outline">
                <Leaf className="mr-2 h-4 w-4" />
                Retire Credits
              </Button>
            </Link>
            <Link to="/impact">
              <Button className="w-full justify-start" variant="outline">
                <BarChart className="mr-2 h-4 w-4" />
                View Impact Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;