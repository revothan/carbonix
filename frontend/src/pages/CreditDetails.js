import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const CreditDetails = ({ user }) => {
  const { id } = useParams();
  const [credit, setCredit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  useEffect(() => {
    const fetchCreditDetails = async () => {
      try {
        // Mock data
        const mockCredit = {
          id: id,
          projectName: "Sumatra Forest Conservation",
          projectType: "forest_conservation",
          location: {
            country: "Indonesia",
            region: "Sumatra",
            coordinates: {
              latitude: -0.789275,
              longitude: 113.921327,
            },
          },
          vintage: 2023,
          standard: "VCS",
          methodology: "VM0015",
          description:
            "This project protects 15,000 hectares of rainforest in Sumatra, preventing deforestation and preserving habitat for endangered species such as the Sumatran tiger and orangutan.",
          seller: {
            id: "seller-001",
            name: "Rainforest Alliance Indonesia",
            verificationStatus: "verified",
            createdAt: "2022-05-15T00:00:00Z",
          },
          listing: {
            id: "list-001",
            quantity: 500,
            pricePerUnit: 15000,
            totalPrice: 7500000,
            status: "active",
            createdAt: "2023-06-20T00:00:00Z",
          },
          verification: {
            status: "verified",
            verifier: "VCS Association",
            date: "2023-01-10T00:00:00Z",
            documents: [
              {
                name: "Verification Report",
                url: "#",
              },
              {
                name: "Methodology Application",
                url: "#",
              },
            ],
          },
          additionalInfo: {
            cobenefits: [
              "Biodiversity conservation",
              "Community development",
              "Water resource protection",
            ],
            sdgs: [13, 15, 1, 6],
          },
          images: [
            "https://via.placeholder.com/800x400?text=Forest+Conservation+Project",
            "https://via.placeholder.com/800x400?text=Local+Community",
            "https://via.placeholder.com/800x400?text=Wildlife",
          ],
        };

        setCredit(mockCredit);
      } catch (error) {
        console.error("Error fetching credit details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreditDetails();
  }, [id]);

  const handlePurchase = () => {
    setShowPurchaseModal(true);
  };

  const confirmPurchase = () => {
    // In a real implementation, this would call the blockchain service
    console.log(`Purchasing ${purchaseQuantity} tonnes of credit ${id}`);
    // Close modal and show success message
    setShowPurchaseModal(false);
    alert("Purchase successful!");
  };

  if (loading) {
    return <div className="loading">Loading credit details...</div>;
  }

  if (!credit) {
    return <div className="error-message">Credit not found</div>;
  }

  return (
    <div className="credit-details-container">
      <div className="credit-header">
        <h1>{credit.projectName}</h1>
        <div className="credit-badges">
          <span className="badge project-type">
            {credit.projectType.replace("_", " ")}
          </span>
          <span className="badge standard">{credit.standard}</span>
          <span className="badge vintage">Vintage {credit.vintage}</span>
        </div>
      </div>

      <div className="credit-gallery">
        <div className="main-image">
          <img src={credit.images[0]} alt={credit.projectName} />
        </div>
        <div className="thumbnail-images">
          {credit.images.slice(1).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${credit.projectName} ${index + 2}`}
            />
          ))}
        </div>
      </div>

      <div className="credit-content">
        <div className="credit-info">
          <div className="card">
            <h3>Project Description</h3>
            <p>{credit.description}</p>

            <h3>Location</h3>
            <p>
              {credit.location.region}, {credit.location.country}
            </p>

            <h3>Methodology</h3>
            <p>{credit.methodology}</p>

            <h3>Co-benefits</h3>
            <ul className="benefits-list">
              {credit.additionalInfo.cobenefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>

            <h3>Sustainable Development Goals</h3>
            <div className="sdg-icons">
              {credit.additionalInfo.sdgs.map((sdg) => (
                <div key={sdg} className="sdg-icon">
                  <img
                    src={`https://via.placeholder.com/50?text=SDG${sdg}`}
                    alt={`SDG ${sdg}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>Verification Information</h3>
            <div className="verification-details">
              <p>
                <strong>Status:</strong> {credit.verification.status}
              </p>
              <p>
                <strong>Verified by:</strong> {credit.verification.verifier}
              </p>
              <p>
                <strong>Verification Date:</strong>{" "}
                {new Date(credit.verification.date).toLocaleDateString()}
              </p>

              <h4>Verification Documents</h4>
              <ul className="document-list">
                {credit.verification.documents.map((doc, index) => (
                  <li key={index}>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                      {doc.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="purchase-sidebar">
          <div className="card purchase-card">
            <h3>Purchase Information</h3>
            <div className="purchase-details">
              <p className="seller-info">
                <strong>Seller:</strong> {credit.seller.name}
              </p>
              <div className="price-info">
                <span className="price-label">Price per tonne:</span>
                <span className="price-value">
                  Rp {credit.listing.pricePerUnit.toLocaleString()}
                </span>
              </div>
              <div className="available-info">
                <span className="available-label">Available:</span>
                <span className="available-value">
                  {credit.listing.quantity} tonnes
                </span>
              </div>

              <div className="purchase-quantity">
                <label htmlFor="quantity">Quantity (tonnes):</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={credit.listing.quantity}
                  value={purchaseQuantity}
                  onChange={(e) =>
                    setPurchaseQuantity(parseInt(e.target.value))
                  }
                />
              </div>

              <div className="purchase-total">
                <span className="total-label">Total Price:</span>
                <span className="total-value">
                  Rp{" "}
                  {(
                    purchaseQuantity * credit.listing.pricePerUnit
                  ).toLocaleString()}
                </span>
              </div>

              <button
                className="btn btn-primary btn-purchase"
                onClick={handlePurchase}
              >
                Purchase Carbon Credits
              </button>

              <div className="purchase-actions">
                <a href="#" className="action-link">
                  Contact Seller
                </a>
                <a href="#" className="action-link">
                  Add to Watchlist
                </a>
              </div>
            </div>
          </div>

          <div className="card seller-card">
            <h3>About the Seller</h3>
            <div className="seller-details">
              <p className="seller-name">{credit.seller.name}</p>
              <p className="seller-status">
                <span
                  className={`status-badge ${credit.seller.verificationStatus}`}
                >
                  {credit.seller.verificationStatus}
                </span>
              </p>
              <p className="seller-since">
                Member since {new Date(credit.seller.createdAt).getFullYear()}
              </p>
              <Link
                to={`/seller/${credit.seller.id}`}
                className="btn btn-outline"
              >
                View Seller Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showPurchaseModal && (
        <div className="modal purchase-modal">
          <div className="modal-content">
            <h2>Confirm Purchase</h2>
            <p>
              You are about to purchase{" "}
              <strong>{purchaseQuantity} tonnes</strong> of carbon credits from
              project <strong>{credit.projectName}</strong>.
            </p>
            <p>
              Total price:{" "}
              <strong>
                Rp{" "}
                {(
                  purchaseQuantity * credit.listing.pricePerUnit
                ).toLocaleString()}
              </strong>
            </p>

            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowPurchaseModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={confirmPurchase}>
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditDetails;
