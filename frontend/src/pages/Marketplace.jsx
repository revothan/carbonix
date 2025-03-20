import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Filter, 
  Search, 
  CalendarClock, 
  MapPin, 
  Check, 
  Tag,
  Image as ImageIcon,
  Leaf,
  Sun,
  Waves
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

const Marketplace = ({ user }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    projectType: "all",
    country: "all",
    priceRange: [0, 1000000],
    vintage: "all",
    standard: "all",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Mock data for now
        const mockListings = [
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

  const handleImageError = (listingId) => {
    setImageErrors(prev => ({
      ...prev,
      [listingId]: true
    }));
  };

  const getProjectIcon = (projectType) => {
    switch (projectType) {
      case 'forest_conservation':
        return <Leaf className="h-12 w-12 text-white opacity-90" />;
      case 'renewable_energy':
        return <Sun className="h-12 w-12 text-white opacity-90" />;
      case 'blue_carbon':
        return <Waves className="h-12 w-12 text-white opacity-90" />;
      default:
        return <ImageIcon className="h-12 w-12 text-white opacity-90" />;
    }
  };

  const applyFilters = (listing) => {
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

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const formatProjectType = (type) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Carbon Credit Marketplace</h1>
            <p className="text-muted-foreground">
              Browse and purchase verified carbon credits from projects across Indonesia
            </p>
          </div>
          
          <div className="w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects or regions..."
                className="pl-9 w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <Button 
            variant="outline" 
            onClick={toggleFilters} 
            className="w-full"
          >
            <Filter className="mr-2 h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Mobile collapsible, desktop always visible */}
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
                      onValueChange={(value) => handleFilterChange("projectType", value)}
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
                      onValueChange={(value) => handleFilterChange("country", value)}
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
                      onValueChange={(value) => handleFilterChange("vintage", value)}
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
                      onValueChange={(value) => handleFilterChange("standard", value)}
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
                    onClick={() => setFilters({
                      projectType: "all",
                      country: "all",
                      priceRange: [0, 1000000],
                      vintage: "all",
                      standard: "all",
                    })}
                  >
                    Reset Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Listings Grid */}
          <div className="flex-1">
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredListings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden h-full flex flex-col">
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                      {imageErrors[listing.id] ? (
                        <div 
                          className="w-full h-full flex justify-center items-center" 
                          style={{ backgroundColor: listing.color || '#2e7d32' }}
                        >
                          {getProjectIcon(listing.projectType)}
                        </div>
                      ) : (
                        <img
                          src={listing.imageUrl}
                          alt={listing.projectName}
                          className="h-full w-full object-cover transition-all hover:scale-105"
                          onError={() => handleImageError(listing.id)}
                        />
                      )}
                    </div>
                    <CardContent className="p-4 md:p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="px-2 py-0">
                          {formatProjectType(listing.projectType)}
                        </Badge>
                        <Badge variant="outline" className="px-2 py-0">
                          {listing.standard}
                        </Badge>
                      </div>

                      <h3 className="font-semibold text-lg mb-1 line-clamp-2">{listing.projectName}</h3>
                      
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <MapPin className="h-3.5 w-3.5 mr-1 opacity-70" />
                        <span>{listing.region}, {listing.country}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <CalendarClock className="h-3.5 w-3.5 mr-1 opacity-70" />
                        <span>Vintage {listing.vintage}</span>
                      </div>

                      <div className="mt-auto space-y-3 pt-3">
                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Price per tonne</p>
                            <div className="font-semibold">
                              {formatCurrency(listing.pricePerUnit)}
                            </div>
                          </div>
                          <div className="text-right space-y-1">
                            <p className="text-xs text-muted-foreground">Available</p>
                            <div className="font-medium">
                              {listing.quantity.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">tonnes</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <Link 
                            to={`/credits/${listing.creditId}`}
                          >
                            <Button className="w-full">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="rounded-full bg-muted p-3">
                    <Filter className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mt-2">No listings found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    No listings match your current filters. Try adjusting your criteria or check back later for new listings.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;