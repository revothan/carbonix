export interface Listing {
  id: string;
  creditId: string;
  seller: string;
  sellerName: string;
  projectName: string;
  projectType: string;
  country: string;
  region: string;
  vintage: number;
  standard: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  status: string;
  imageUrl: string;
  color: string;
}

export interface FilterOptions {
  projectType: string;
  country: string;
  priceRange: [number, number];
  vintage: string;
  standard: string;
}

export interface User {
  id: string;
  walletAddress: string;
  [key: string]: any;
}

export interface MarketplaceProps {
  user: User;
}

export type ProjectType = 'forest_conservation' | 'renewable_energy' | 'blue_carbon' | string;