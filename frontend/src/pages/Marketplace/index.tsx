import React, { useState, useEffect } from "react";
import { MarketplaceProps, Listing, FilterOptions } from "./types";
import {
  MarketplaceHeader,
  FiltersPanel,
  ListingsGrid,
  MobileFilterToggle
} from "./components";

const Marketplace: React.FC<MarketplaceProps> = ({ user }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<FilterOptions>({
    projectType: "all",
    country: "all",
    priceRange: [0, 1000000],
    vintage: "all",
    standard: "all",
  });
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Mock data for now
        const mockListings: Listing[] = [
          {
            id: "list-001",
            creditId: "credit-001",
            seller: "seller-address-1",
            sellerName: "Rainforest Alliance",
            projectName: "Sumatra Forest Conservation",
            projectType: "forest_conservation",
            country: "Indonesia",
            region: "Sumatra",
            vintage: 2023,
            standard: "VCS",
            quantity: 500,
            pricePerUnit: 15000, // in IDRX (equivalent to IDR)
            totalPrice: 7500000,
            status: "active",
            imageUrl: "https://placehold.co/800x400/2e7d32/FFFFFF?text=Forest+Conservation",
            color: "#2e7d32" // Forest green
          },
          {
            id: "list-002",
            creditId: "credit-002",
            seller: "seller-address-2",
            sellerName: "Solar Indonesia",
            projectName: "Java Solar Farm",
            projectType: "renewable_energy",
            country: "Indonesia",
            region: "Java",
            vintage: 2022,
            standard: "Gold Standard",
            quantity: 200,
            pricePerUnit: 12000,
            totalPrice: 2400000,
            status: "active",
            imageUrl: "https://placehold.co/800x400/ff9800/FFFFFF?text=Solar+Energy",
            color: "#ff9800" // Orange/amber
          },
          {
            id: "list-003",
            creditId: "credit-003",
            seller: "seller-address-3",
            sellerName: "Mangrove Initiative",
            projectName: "Bali Mangrove Restoration",
            projectType: "blue_carbon",
            country: "Indonesia",
            region: "Bali",
            vintage: 2023,
            standard: "VCS",
            quantity: 350,
            pricePerUnit: 18000,
            totalPrice: 6300000,
            status: "active",
            imageUrl: "https://placehold.co/800x400/0288d1/FFFFFF?text=Mangrove+Restoration",
            color: "#0288d1" // Blue
          },
        ];

        setListings(mockListings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleImageError = (listingId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [listingId]: true
    }));
  };

  const applyFilters = (listing: Listing): boolean => {
    // Search filter
    if (
      searchQuery &&
      !listing.projectName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !listing.region.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Type filter
    if (
      filters.projectType !== "all" &&
      listing.projectType !== filters.projectType
    )
      return false;
    
    // Country filter
    if (filters.country !== "all" && listing.country !== filters.country)
      return false;
    
    // Price filter
    if (
      listing.pricePerUnit < filters.priceRange[0] ||
      listing.pricePerUnit > filters.priceRange[1]
    )
      return false;
    
    // Vintage filter
    if (
      filters.vintage !== "all" &&
      listing.vintage.toString() !== filters.vintage
    )
      return false;
    
    // Standard filter
    if (filters.standard !== "all" && listing.standard !== filters.standard)
      return false;
    
    return true;
  };

  const filteredListings = listings.filter(applyFilters);

  const handleFilterChange = (name: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <MarketplaceHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Mobile Filter Toggle */}
        <MobileFilterToggle 
          showFilters={showFilters}
          toggleFilters={toggleFilters}
        />

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters */}
          <FiltersPanel 
            filters={filters}
            onFilterChange={handleFilterChange}
            showFilters={showFilters}
          />

          {/* Listings Grid */}
          <ListingsGrid 
            listings={filteredListings}
            imageErrors={imageErrors}
            onImageError={handleImageError}
          />
        </div>
      </div>
    </div>
  );
};

export default Marketplace;