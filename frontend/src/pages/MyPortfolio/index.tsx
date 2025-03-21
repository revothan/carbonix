import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Leaf } from 'lucide-react';

// Components
import {
  SummaryStats,
  FiltersSidebar,
  CreditCardGrid,
  CreditTable,
  RetirementCertificateList,
  EmptyState,
} from './components';

// Types
import { PortfolioSummary, Credit, Retirement, MyPortfolioProps } from './types';

const MyPortfolio: React.FC<MyPortfolioProps> = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'credits' | 'retirements'>('credits');
  const [activeCreditsTab, setActiveCreditsTab] = useState<'grid' | 'table'>('grid');
  const [showFilters, setShowFilters] = useState<boolean>(true);

  // Mock data
  const summary: PortfolioSummary = {
    totalCredits: 58,
    totalValue: 886500,
    totalOffset: 8,
    averagePrice: 15750,
    creditsByType: {
      forest_conservation: 40,
      renewable_energy: 10,
      blue_carbon: 8,
    },
  };

  const credits: Credit[] = [
    {
      id: 'credit-001',
      projectName: 'Sumatra Forest Conservation',
      projectType: 'forest_conservation',
      standard: 'VCS',
      vintage: 2023,
      quantity: 25,
      totalPrice: 375000,
      status: 'active',
      location: { region: 'Sumatra', country: 'Indonesia' },
      description:
        'Protected rainforest with high biodiversity value, home to endangered species including orangutans and Sumatran tigers.',
      color: '#2e7d32',
    },
    {
      id: 'credit-002',
      projectName: 'Java Solar Farm',
      projectType: 'renewable_energy',
      standard: 'Gold Standard',
      vintage: 2022,
      quantity: 10,
      totalPrice: 120000,
      status: 'active',
      location: { region: 'Java', country: 'Indonesia' },
      description:
        'Solar energy farm generating clean electricity and providing local jobs while reducing dependence on fossil fuels.',
      color: '#ff9800',
    },
    {
      id: 'credit-003',
      projectName: 'East Kalimantan REDD+ Project',
      projectType: 'forest_conservation',
      standard: 'VCS',
      vintage: 2023,
      quantity: 15,
      totalPrice: 247500,
      status: 'listed',
      location: { region: 'Kalimantan', country: 'Indonesia' },
      description:
        'Reducing emissions from deforestation and forest degradation in East Kalimantan through community-based forest management.',
      color: '#2e7d32',
    },
  ];

  const retirements: Retirement[] = [
    {
      id: 'ret-001',
      projectName: 'Bali Mangrove Restoration',
      projectType: 'blue_carbon',
      standard: 'VCS',
      vintage: 2023,
      quantity: 5,
      beneficiary: 'Eco Solutions Inc.',
      purpose: 'carbon_neutral_company',
      certificateId: 'cert-001',
      color: '#0288d1',
    },
    {
      id: 'ret-002',
      projectName: 'Sulawesi Geothermal Power',
      projectType: 'renewable_energy',
      standard: 'Gold Standard',
      vintage: 2022,
      quantity: 3,
      beneficiary: 'Personal Carbon Offset',
      purpose: 'carbon_neutral_individual',
      certificateId: 'cert-002',
      color: '#ff9800',
    },
  ];

  const handleCreateListing = () => {
    navigate('/create-listing');
  };

  const handleRetireCredits = () => {
    navigate('/retire-credits');
  };

  const handleBrowseMarketplace = () => {
    navigate('/marketplace');
  };

  return (
    <div className="bg-background p-6 rounded-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">
            My Carbon Portfolio
          </h1>
          <p className="text-muted-foreground">
            Manage your carbon credits and view your environmental impact
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button 
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium flex items-center"
            onClick={handleCreateListing}
          >
            <Plus className="mr-2 h-4 w-4" /> Create Listing
          </button>
          <button 
            className="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md text-sm font-medium flex items-center"
            onClick={handleRetireCredits}
          >
            <Leaf className="mr-2 h-4 w-4" /> Retire Credits
          </button>
        </div>
      </div>

      {/* Portfolio Summary Stats */}
      <SummaryStats summary={summary} />

      {/* Main Tabs */}
      <div className="mb-6">
        <div className="flex justify-between items-center border-b">
          <div className="inline-flex h-10 items-center justify-center space-x-1 rounded-md p-1">
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ${activeTab === 'credits' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('credits')}
            >
              Active Credits ({credits.length})
            </button>
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ${activeTab === 'retirements' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('retirements')}
            >
              Retired Credits ({retirements.length})
            </button>
          </div>

          {activeTab === 'credits' && (
            <div className="hidden md:flex space-x-1">
              <button
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ${activeCreditsTab === 'grid' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
                onClick={() => setActiveCreditsTab('grid')}
              >
                Grid
              </button>
              <button
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ${activeCreditsTab === 'table' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
                onClick={() => setActiveCreditsTab('table')}
              >
                Table
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Credits Tab Content */}
      {activeTab === 'credits' && credits.length > 0 && (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <FiltersSidebar summary={summary} />

          {/* Credits content area */}
          <div className="flex-1">
            {/* Grid view */}
            {activeCreditsTab === 'grid' && (
              <CreditCardGrid credits={credits} />
            )}

            {/* Table view */}
            {activeCreditsTab === 'table' && (
              <CreditTable credits={credits} />
            )}
          </div>
        </div>
      )}

      {/* Retirements Tab Content */}
      {activeTab === 'retirements' && retirements.length > 0 && (
        <RetirementCertificateList retirements={retirements} />
      )}

      {/* Empty state for when no credits or retirements exist */}
      {activeTab === 'credits' && credits.length === 0 && (
        <EmptyState 
          type="credits" 
          onAction={handleBrowseMarketplace}
        />
      )}

      {activeTab === 'retirements' && retirements.length === 0 && (
        <EmptyState 
          type="retirements" 
          onAction={handleRetireCredits}
        />
      )}
    </div>
  );
};

export default MyPortfolio;
