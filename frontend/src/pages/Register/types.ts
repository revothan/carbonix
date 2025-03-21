export interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  agreeTerms: boolean;
}

export interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  agreeTerms?: string;
  submit?: string;
  [key: string]: string | undefined;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  walletAddress: string;
  balance: string;
  carbonOffset: string;
  createdAt: string;
  [key: string]: any;
}

export interface RegisterProps {
  onRegister: (user: User) => void;
}

export type RegisterMethod = 'email' | 'social';
export type SocialProvider = 'google' | 'facebook' | 'twitter';