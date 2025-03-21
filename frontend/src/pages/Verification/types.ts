export interface User {
  id?: string;
  role?: 'user' | 'verifier' | 'admin';
  name?: string;
  displayName?: string;
}

export interface VerificationsSubmitter {
  name: string;
  id: string;
}

export interface CommunityVotes {
  approve: number;
  reject: number;
  flag: number;
}

export interface VerificationData {
  methodology: string;
  findings: string;
  score: number;
}

export interface AlgorithmicCheck {
  potentialDuplicatesCount: number;
  recommendation: 'approve' | 'reject' | 'flag';
}

export interface Verification {
  id: string;
  creditId: string;
  projectName: string;
  projectType: string;
  standard: string;
  vintage: number;
  submittedAt: string;
  completedAt?: string;
  submittedBy?: VerificationsSubmitter;
  verifiedBy?: VerificationsSubmitter;
  verificationData: VerificationData;
  algorithmicCheck?: AlgorithmicCheck;
  communityVotes?: CommunityVotes;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Verifications {
  pending: Verification[];
  completed: Verification[];
  submitted: Verification[];
}

export interface VoteValues {
  vote: 'approve' | 'reject' | 'flag';
  comment: string;
}

export interface VerificationProps {
  user: User;
}
