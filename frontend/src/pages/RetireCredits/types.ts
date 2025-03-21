export interface Credit {
  id: string;
  projectName: string;
  projectType: string;
  standard: string;
  vintage: number;
  quantity: number;
  imageUrl: string;
}

export interface RetirementDetails {
  yearOfEmissions: number;
  productName: string;
  companyName: string;
  eventName: string;
  eventDate: string;
}

export interface FormValues {
  creditId: string;
  quantity: number;
  beneficiaryName: string;
  beneficiaryAddress: string;
  retirementMessage: string;
  retirementPurpose: string;
  retirementDetails: RetirementDetails;
}

export interface FormErrors {
  creditId?: string;
  quantity?: string;
  beneficiaryName?: string;
  beneficiaryAddress?: string;
  retirementMessage?: string;
  retirementPurpose?: string;
  submit?: string;
  [key: string]: string | undefined;
}

export interface RetireCreditsProps {
  user?: {
    id?: string;
    walletAddress?: string;
    displayName?: string;
  };
}
