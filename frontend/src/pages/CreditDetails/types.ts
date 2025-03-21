export interface CreditDetailsType {
  id: string;
  projectName: string;
  projectType: string;
  standard: string;
  vintage: number;
  quantity: number;
  availableQuantity: number;
  price: number;
  description: string;
  projectDeveloper: string;
  location: string;
  country: string;
  coordinates: string;
  methodology: string;
  verifier: string;
  verificationDate: string;
  registryLink: string;
  registryId: string;
  imageUrl: string;
  images: string[];
  startDate: string;
  endDate: string;
  sdgs: string[];
  listings: ListingType[];
}

export interface ListingType {
  id: string;
  seller: string;
  quantity: number;
  pricePerUnit: number;
  expiresAt: string;
  createdAt: string;
}