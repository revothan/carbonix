import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterOptions } from '../types';

interface FiltersPanelProps {
  filters: FilterOptions;
  onFilterChange: (name: string, value: any) => void;
  showFilters: boolean;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  filters,
  onFilterChange,
  showFilters
}) => {
  return (
    <div className={`
      ${showFilters ? 'block' : 'hidden'} 
      md:block w-full md:w-64 shrink-0
    `}>
      <Card>
        <CardContent className="p-4 md:p-6 space-y-4">
          <div className="space-y-1.5">
            <h3 className="font-medium">Filters</h3>
            <Separator />
          </div>
          
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="project-type">
                Project Type
              </label>
              <Select
                value={filters.projectType}
                onValueChange={(value) => onFilterChange("projectType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="forest_conservation">Forest Conservation</SelectItem>
                  <SelectItem value="renewable_energy">Renewable Energy</SelectItem>
                  <SelectItem value="blue_carbon">Blue Carbon</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="country">
                Country
              </label>
              <Select
                value={filters.country}
                onValueChange={(value) => onFilterChange("country", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="Indonesia">Indonesia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="vintage">
                Vintage
              </label>
              <Select
                value={filters.vintage}
                onValueChange={(value) => onFilterChange("vintage", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="standard">
                Standard
              </label>
              <Select
                value={filters.standard}
                onValueChange={(value) => onFilterChange("standard", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Standards" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Standards</SelectItem>
                  <SelectItem value="VCS">Verified Carbon Standard (VCS)</SelectItem>
                  <SelectItem value="Gold Standard">Gold Standard</SelectItem>
                  <SelectItem value="CDM">Clean Development Mechanism</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => {
                const defaultFilters: FilterOptions = {
                  projectType: "all",
                  country: "all",
                  priceRange: [0, 1000000],
                  vintage: "all",
                  standard: "all",
                };
                
                // Reset each filter individually
                Object.keys(defaultFilters).forEach(key => {
                  onFilterChange(key, defaultFilters[key as keyof FilterOptions]);
                });
              }}
            >
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FiltersPanel;