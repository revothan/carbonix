import React from 'react';
import { Leaf, Sun, Waves } from 'lucide-react';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatProjectType = (type: string): string => {
  return type
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const getProjectIcon = (projectType: string): JSX.Element => {
  switch (projectType) {
    case 'forest_conservation':
      return <Leaf className="h-10 w-10 text-white opacity-90" />;
    case 'renewable_energy':
      return <Sun className="h-10 w-10 text-white opacity-90" />;
    case 'blue_carbon':
      return <Waves className="h-10 w-10 text-white opacity-90" />;
    default:
      return <Leaf className="h-10 w-10 text-white opacity-90" />;
  }
};

export const formatPurpose = (purpose: string): string => {
  switch (purpose) {
    case 'carbon_neutral_company':
      return 'Carbon Neutral Company';
    case 'carbon_neutral_individual':
      return 'Personal Carbon Footprint';
    default:
      return purpose
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  }
};
