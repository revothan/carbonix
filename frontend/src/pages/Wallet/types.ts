export interface User {
  id?: string;
  walletAddress: string;
  walletId?: string;
  displayName?: string;
}

export interface Balance {
  idrx: number;
  lisk: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'purchase' | 'sale' | 'retirement';
  amount: number;
  currency: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  from: string;
  to: string;
  reference?: string;
}

export interface WalletData {
  balance: Balance;
  transactions: Transaction[];
  depositAddress: string;
}

export interface BankDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
  bankBranch: string;
}

export interface WalletProps {
  user: User;
}
