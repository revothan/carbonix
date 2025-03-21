export interface CreditType {
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

export interface FormValuesType {
  creditId: string;
  quantity: number;
  pricePerUnit: number | string;
  expiresAt: string;
  description: string;
  allowPartialSales: boolean;
  minPurchaseQuantity: number;
  immediateSettlement: boolean;
}

export interface FormErrorsType {
  creditId?: string;
  quantity?: string;
  pricePerUnit?: string;
  minPurchaseQuantity?: string;
  submit?: string;
  [key: string]: string | undefined;
}

export interface UserType {
  walletAddress: string;
  [key: string]: any;
}

export interface CreateListingProps {
  user: UserType;
}