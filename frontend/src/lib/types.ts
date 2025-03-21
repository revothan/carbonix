/**
 * Common type definitions for the Carbonix application
 */

/**
 * User interface representing a user in the system
 */
export interface User {
  id: string;
  email: string;
  displayName?: string;
  walletAddress?: string;
  balance?: string;
  carbonOffset?: string;
  createdAt?: string;
  [key: string]: any;
}

/**
 * Transaction interface representing a blockchain transaction
 */
export interface Transaction {
  id: string;
  type: 'purchase' | 'listing' | 'retirement' | string;
  amount: number;
  date: string;
  status: 'complete' | 'active' | 'pending' | string;
  sender?: string;
  recipient?: string;
  cost?: number;
  fee?: number;
}

/**
 * CarbonCredit interface representing a carbon credit
 */
export interface CarbonCredit {
  id: string;
  projectId: string;
  projectName: string;
  amount: number;
  vintage: number;
  standard: string;
  owner: string;
  status: string;
  description?: string;
  location?: string;
  createdAt?: string;
  price?: number;
  isListed?: boolean;
}

/**
 * Listing interface representing a marketplace listing
 */
export interface Listing {
  id: string;
  creditId: string;
  seller: string;
  quantity: number;
  pricePerUnit: number;
  status: string;
  createdAt?: string;
  expiresAt?: string;
  projectName?: string;
  vintage?: number;
}

/**
 * Wallet interface representing a cryptocurrency wallet
 */
export interface Wallet {
  id: string;
  address: string;
  publicKey: string;
  provider?: string;
  email?: string;
  balance?: number;
}

/**
 * VerificationStatus interface for credit verification
 */
export interface VerificationStatus {
  creditId: string;
  status: string;
  verifier: string;
  date: string;
  score: number;
  details?: Record<string, any>;
}

/**
 * Certificate interface for retirement certificates
 */
export interface Certificate {
  id: string;
  retirementId: string;
  beneficiary: string;
  totalCO2Tonnes: number;
  retirementDate: string;
  creditIds?: string[];
  projectNames?: string[];
  reason?: string;
}
