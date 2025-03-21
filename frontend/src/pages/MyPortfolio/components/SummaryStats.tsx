import React from 'react';
import { PortfolioSummary } from '../types';
import { formatCurrency } from '../utils';

interface SummaryStatsProps {
  summary: PortfolioSummary;
}

const SummaryStats: React.FC<SummaryStatsProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-card text-card-foreground shadow-sm rounded-lg border p-6">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Total Carbon Credits
          </p>
          <p className="text-2xl font-bold">
            {summary.totalCredits}{' '}
            <span className="text-sm font-normal text-muted-foreground">
              tonnes
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Active in your portfolio
          </p>
        </div>
      </div>

      <div className="bg-card text-card-foreground shadow-sm rounded-lg border p-6">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Portfolio Value</p>
          <p className="text-2xl font-bold">
            {formatCurrency(summary.totalValue)}
          </p>
          <p className="text-xs text-muted-foreground">
            Based on purchase price
          </p>
        </div>
      </div>

      <div className="bg-card text-card-foreground shadow-sm rounded-lg border p-6">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Average Credit Price
          </p>
          <p className="text-2xl font-bold">
            {formatCurrency(summary.averagePrice)}
          </p>
          <p className="text-xs text-muted-foreground">Per tonne CO₂e</p>
        </div>
      </div>

      <div className="bg-card text-card-foreground shadow-sm rounded-lg border p-6">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Carbon Retired</p>
          <p className="text-2xl font-bold">
            {summary.totalOffset}{' '}
            <span className="text-sm font-normal text-muted-foreground">
              tonnes
            </span>
          </p>
          <p className="text-xs text-muted-foreground">Total CO₂e offset</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryStats;
