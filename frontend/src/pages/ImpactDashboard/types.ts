export interface TimelineItem {
  month: string;
  amount: number;
}

export interface ProjectType {
  type: string;
  label: string;
  amount: number;
}

export interface ImpactMetrics {
  trees: number;
  renewableEnergy: number;
  carbonSequestered: number;
}

export interface SDGContribution {
  sdg: number;
  label: string;
  contribution: 'low' | 'medium' | 'high';
}

export interface ImpactData {
  totalOffset: number;
  projectTypes: ProjectType[];
  timeline: TimelineItem[];
  impact: ImpactMetrics;
  sdgContributions: SDGContribution[];
}

export interface Project {
  name: string;
  type: string;
  location: string;
  description: string;
  contribution: number;
  imageUrl: string;
}

export interface UserProps {
  id: string;
  email: string;
  [key: string]: any;
}

export type TimeRange = 'month' | 'year' | 'all';
export type ViewType = 'overview' | 'projects' | 'sdg';