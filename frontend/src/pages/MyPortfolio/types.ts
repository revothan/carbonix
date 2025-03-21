export interface Location {
  region: string;
  country: string;
}

export interface Credit {
  id: string;
  projectName: string;
  projectType: string;
  standard: string;
  vintage: number;
  quantity: number;
  totalPrice: number;
  status: 'active' | 'listed' | 'reserved';
  location: Location;
  description: string;
  color: string;
}

export interface Retirement {
  id: string;
  projectName: string;
  projectType: string;
  standard: string;
  vintage: number;
  quantity: number;
  beneficiary: string;
  purpose: string;
  certificateId: string;
  color: string;
}

export interface PortfolioSummary {
  totalCredits: number;
  totalValue: number;
  totalOffset: number;
  averagePrice: number;
  creditsByType: {
    [key: string]: number;
  };
}

export interface MyPortfolioProps {
  user?: {
    id: string;
    walletAddress?: string;
  };
}
