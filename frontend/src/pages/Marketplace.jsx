import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Marketplace = ({ user }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    projectType: "all",
    country: "all",
    priceRange: [0, 1000000],
    vintage: "all",
    standard: "all",
  });

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
            imageUrl: "https://via.placeholder.com/150?text=Forest",
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
            imageUrl: "https://via.placeholder.com/150?text=Solar",
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
            imageUrl: "https://via.placeholder.com/150?text=Mangrove",
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

  const applyFilters = (listing) => {
    if (
      filters.projectType !== "all" &&
      listing.projectType !== filters.projectType
    )
      return false;
    if (filters.country !== "all" && listing.country !== filters.country)
      return false;
    if (
      listing.pricePerUnit < filters.priceRange[0] ||
      listing.pricePerUnit > filters.priceRange[1]
    )
      return false;
    if (
      filters.vintage !== "all" &&
      listing.vintage.toString() !== filters.vintage
    )
      return false;
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

  if (loading) {
    return <div className="loading">Loading marketplace listings...</div>;
  }

  return (
    <div className="marketplace-container">
      <div className="marketplace-header">
        <h1>Carbon Credit Marketplace</h1>
        <p>
          Browse and purchase verified carbon credits from projects across
          Indonesia
        </p>
      </div>

      <div className="marketplace-content">
        <div className="filters-sidebar">
          <h3>Filters</h3>

          <div className="filter-group">
            <label>Project Type</label>
            <select
              value={filters.projectType}
              onChange={(e) =>
                handleFilterChange("projectType", e.target.value)
              }
            >
              <option value="all">All Types</option>
              <option value="forest_conservation">Forest Conservation</option>
              <option value="renewable_energy">Renewable Energy</option>
              <option value="blue_carbon">Blue Carbon</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Country</label>
            <select
              value={filters.country}
              onChange={(e) => handleFilterChange("country", e.target.value)}
            >
              <option value="all">All Countries</option>
              <option value="Indonesia">Indonesia</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Vintage</label>
            <select
              value={filters.vintage}
              onChange={(e) => handleFilterChange("vintage", e.target.value)}
            >
              <option value="all">All Years</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Standard</label>
            <select
              value={filters.standard}
              onChange={(e) => handleFilterChange("standard", e.target.value)}
            >
              <option value="all">All Standards</option>
              <option value="VCS">VCS</option>
              <option value="Gold Standard">Gold Standard</option>
              <option value="CDM">CDM</option>
            </select>
          </div>
        </div>

        <div className="listings-grid">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <div className="listing-card" key={listing.id}>
                <div className="listing-image">
                  <img src={listing.imageUrl} alt={listing.projectName} />
                </div>
                <div className="listing-content">
                  <h3>{listing.projectName}</h3>
                  <p className="listing-type">
                    {listing.projectType.replace("_", " ")} | {listing.standard}
                  </p>
                  <p className="listing-location">
                    {listing.region}, {listing.country}
                  </p>
                  <p className="listing-vintage">Vintage: {listing.vintage}</p>
                  <div className="listing-footer">
                    <div className="listing-price">
                      <span className="price-label">Price per tonne:</span>
                      <span className="price-value">
                        Rp {listing.pricePerUnit.toLocaleString()}
                      </span>
                    </div>
                    <div className="listing-quantity">
                      <span className="quantity-label">Available:</span>
                      <span className="quantity-value">
                        {listing.quantity} tonnes
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/credits/${listing.creditId}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>
                No listings match your current filters. Try adjusting your
                criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
