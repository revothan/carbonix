import React from 'react';
import { Download } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Transaction } from '../types';
import { formatCurrency } from '@/lib/utils';
import {
  getTransactionTypeIcon,
  formatTransactionLabel,
  formatDate,
  getStatusBadge,
  filterTransactions,
  getPaginatedTransactions,
  getTotalPages,
} from '../utils';

interface TransactionHistoryProps {
  transactions: Transaction[];
  transactionFilter: string;
  setTransactionFilter: (filter: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  transactionsPerPage: number;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  transactionFilter,
  setTransactionFilter,
  currentPage,
  setCurrentPage,
  transactionsPerPage,
}) => {
  const filteredTransactions = filterTransactions(transactions, transactionFilter);
  const currentTransactions = getPaginatedTransactions(
    filteredTransactions,
    currentPage,
    transactionsPerPage
  );
  const totalPages = getTotalPages(filteredTransactions.length, transactionsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
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
                        className={`p-4 align-middle ${
                          tx.type === 'withdraw' || tx.type === 'purchase'
                            ? 'text-red-600'
                            : 'text-green-600'
                        }`}
                      >
                        {tx.type === 'withdraw' || tx.type === 'purchase'
                          ? '- '
                          : '+ '}
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
                          `${tx.type === 'withdraw' ? 'To' : 'From'}: ${
                            tx.type === 'withdraw' ? tx.to : tx.from
                          }`}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
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
                variant={currentPage === i + 1 ? 'default' : 'outline'}
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
  );
};

export default TransactionHistory;
