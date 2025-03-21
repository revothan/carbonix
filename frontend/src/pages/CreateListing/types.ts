export interface Credit {
  id: string;
  projectName: string;
  projectType: string;
  standard: string;
  vintage: number;
  quantity: number;
  availableQuantity: number;
  imageUrl: string;
  color: string;
}

export interface FormValues {
  creditId: string;
  quantity: number;
  pricePerUnit: number | string;
  expiresAt: string;
  description: string;
  allowPartialSales: boolean;
  minPurchaseQuantity: number;
  immediateSettlement: boolean;
}

export interface FormErrors {
  creditId?: string;
  quantity?: string;
  pricePerUnit?: string;
  minPurchaseQuantity?: string;
  submit?: string;
  [key: string]: string | undefined;
}

export interface User {
  walletAddress: string;
  walletId?: string;
}

export interface CreateListingProps {
  user: User;
}
