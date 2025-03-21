import React from 'react';
import { ArrowDownLeft, ArrowUpRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Transaction } from './types';

export const getTransactionTypeIcon = (type: string) => {
  switch (type) {
    case 'deposit':
      return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
    case 'withdraw':
      return <ArrowUpRight className="h-4 w-4 text-red-500" />;
    case 'purchase':
      return <ArrowUpRight className="h-4 w-4 text-blue-500" />;
    case 'sale':
      return <ArrowDownLeft className="h-4 w-4 text-blue-500" />;
    case 'retirement':
      return <Clock className="h-4 w-4 text-purple-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

export const formatTransactionLabel = (type: string): string => {
  switch (type) {
    case 'deposit':
      return 'Deposit';
    case 'withdraw':
      return 'Withdrawal';
    case 'purchase':
      return 'Purchase';
    case 'sale':
      return 'Sale';
    case 'retirement':
      return 'Retirement';
    default:
      return type.charAt(0).toUpperCase() + type.slice(1);
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getStatusBadge = (status: string): JSX.Element => {
  switch (status) {
    case 'completed':
      return (
        <Badge
          variant="outline"
          className="text-green-600 bg-green-50 border-green-200"
        >
          Completed
        </Badge>
      );
    case 'pending':
      return (
        <Badge
          variant="outline"
          className="text-yellow-600 bg-yellow-50 border-yellow-200"
        >
          Pending
        </Badge>
      );
    case 'failed':
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

export const filterTransactions = (
  transactions: Transaction[],
  filter: string
): Transaction[] => {
  if (filter === 'all') return transactions;
  return transactions.filter((tx) => tx.type === filter);
};

export const getPaginatedTransactions = (
  transactions: Transaction[],
  currentPage: number,
  itemsPerPage: number
): Transaction[] => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  return transactions.slice(indexOfFirstItem, indexOfLastItem);
};

export const getTotalPages = (totalItems: number, itemsPerPage: number): number => {
  return Math.ceil(totalItems / itemsPerPage);
};
