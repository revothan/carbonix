import React from 'react';
import { Search } from 'lucide-react';
import { PortfolioSummary } from '../types';
import { formatProjectType } from '../utils';

interface FiltersSidebarProps {
  summary: PortfolioSummary;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ summary }) => {
  return (
    <div className="md:w-64 shrink-0">
      <div className="rounded-lg border shadow-sm bg-card text-card-foreground">
        <div className="p-4 space-y-4">
          <div className="space-y-1.5">
            <h3 className="font-medium">Filters</h3>
            <hr className="shrink-0 bg-border h-[1px] w-full" />
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search credits..."
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm"
            />
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Project Type</label>
              <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                All Types
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Vintage</label>
              <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                All Years
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Standard</label>
              <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                All Standards
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Status</label>
              <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                All Statuses
              </div>
            </div>
          </div>

          <button className="inline-flex h-9 items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium bg-background hover:bg-accent hover:text-accent-foreground w-full">
            Reset Filters
          </button>
        </div>
      </div>

      {/* Environmental Impact Summary */}
      <div className="rounded-lg border shadow-sm bg-card text-card-foreground mt-4">
        <div className="flex flex-col space-y-1.5 p-4 pb-2">
          <h3 className="font-semibold text-lg">Environmental Impact</h3>
          <p className="text-sm text-muted-foreground">
            Summary by project type
          </p>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {Object.entries(summary.creditsByType).map(
              ([type, amount]) => (
                <div key={type} className="flex flex-col gap-1">
                  <div className="flex justify-between text-sm">
                    <span>{formatProjectType(type)}</span>
                    <span className="font-medium">{amount} tonnes</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${type === 'forest_conservation' ? 'bg-green-600' : type === 'renewable_energy' ? 'bg-amber-500' : 'bg-blue-600'}`}
                      style={{
                        width: `${(amount / summary.totalCredits) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersSidebar;
