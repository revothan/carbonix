import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Custom hook to get query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const CreateListing = ({ user }) => {
  const query = useQuery();
  const navigate = useNavigate();
  const creditId = query.get("creditId");

  const [credit, setCredit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    creditId: "",
    quantity: 1,
    pricePerUnit: "",
    expiresAt: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCreditDetails = async () => {
      if (!creditId) {
        setLoading(false);
        return;
      }

      try {
        // Mock data - in real app, would fetch from blockchain
        const mockCredit = {
          id: creditId,
          projectName: "Sumatra Forest Conservation",
          projectType: "forest_conservation",
          standard: "VCS",
          vintage: 2023,
          quantity: 25, // Total quantity owned
          availableQuantity: 25, // Not listed yet
          imageUrl: "https://via.placeholder.com/100?text=Forest",
        };

        setCredit(mockCredit);
        setFormValues((prev) => ({
          ...prev,
          creditId: mockCredit.id,
          quantity: mockCredit.availableQuantity,
        }));
      } catch (error) {
        console.error("Error fetching credit details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreditDetails();
  }, [creditId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "pricePerUnit"
          ? parseInt(value) || ""
          : value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formValues.creditId) {
      errors.creditId = "Please select a carbon credit to list";
    }

    if (!formValues.quantity || formValues.quantity <= 0) {
      errors.quantity = "Please enter a valid quantity";
    } else if (credit && formValues.quantity > credit.availableQuantity) {
      errors.quantity = `Quantity cannot exceed available amount (${credit.availableQuantity})`;
    }

    if (!formValues.pricePerUnit || formValues.pricePerUnit <= 0) {
      errors.pricePerUnit = "Please enter a valid price per unit";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      // In real app, this would call blockchain service
      console.log("Creating listing with values:", formValues);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message and redirect
      alert("Listing created successfully!");
      navigate("/portfolio");
    } catch (error) {
      console.error("Error creating listing:", error);
      setFormErrors((prev) => ({
        ...prev,
        submit: "Error creating listing. Please try again.",
      }));
    } finally {
      setSubmitting(false);
    }
  };

  const calculateTotal = () => {
    if (!formValues.quantity || !formValues.pricePerUnit) {
      return 0;
    }
    return formValues.quantity * formValues.pricePerUnit;
  };

  if (loading) {
    return <div className="loading">Loading credit details...</div>;
  }

  return (
    <div className="create-listing-container">
      <div className="page-header">
        <h1>Create Marketplace Listing</h1>
        <p>List your carbon credits for sale on the marketplace</p>
      </div>

      <div className="listing-form-container">
        <form onSubmit={handleSubmit} className="listing-form">
          {formErrors.submit && (
            <div className="error-message">{formErrors.submit}</div>
          )}

          <div className="form-section">
            <h2>Credit Information</h2>

            {credit ? (
              <div className="selected-credit">
                <div className="credit-image">
                  <img src={credit.imageUrl} alt={credit.projectName} />
                </div>
                <div className="credit-details">
                  <h3>{credit.projectName}</h3>
                  <p>
                    {credit.projectType.replace("_", " ")} | {credit.standard}
                  </p>
                  <p>Vintage: {credit.vintage}</p>
                  <p>Available: {credit.availableQuantity} tonnes</p>
                </div>
              </div>
            ) : (
              <div className="form-group">
                <label htmlFor="creditId">Select Carbon Credit *</label>
                <select
                  id="creditId"
                  name="creditId"
                  value={formValues.creditId}
                  onChange={handleInputChange}
                  className={formErrors.creditId ? "error" : ""}
                >
                  <option value="">-- Select a carbon credit --</option>
                  {/* In a real app, this would be populated dynamically */}
                  <option value="credit-001">
                    Sumatra Forest Conservation (25 tonnes)
                  </option>
                  <option value="credit-002">
                    Java Solar Farm (10 tonnes)
                  </option>
                </select>
                {formErrors.creditId && (
                  <div className="error-text">{formErrors.creditId}</div>
                )}
              </div>
            )}
          </div>

          <div className="form-section">
            <h2>Listing Details</h2>

            <div className="form-group">
              <label htmlFor="quantity">Quantity (tonnes) *</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formValues.quantity}
                onChange={handleInputChange}
                min="1"
                max={credit ? credit.availableQuantity : undefined}
                className={formErrors.quantity ? "error" : ""}
              />
              {formErrors.quantity && (
                <div className="error-text">{formErrors.quantity}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="pricePerUnit">Price per Tonne (IDRX) *</label>
              <input
                type="number"
                id="pricePerUnit"
                name="pricePerUnit"
                value={formValues.pricePerUnit}
                onChange={handleInputChange}
                min="1"
                className={formErrors.pricePerUnit ? "error" : ""}
              />
              {formErrors.pricePerUnit && (
                <div className="error-text">{formErrors.pricePerUnit}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="expiresAt">Listing Expiration (Optional)</label>
              <input
                type="date"
                id="expiresAt"
                name="expiresAt"
                value={formValues.expiresAt}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
              />
              <small>
                If not specified, the listing will expire in 30 days
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="description">
                Additional Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
                rows="3"
                placeholder="Add any additional information about your listing here..."
              />
            </div>
          </div>

          <div className="form-summary">
            <div className="summary-item">
              <span>Total Listing Value:</span>
              <span className="summary-value">
                Rp {calculateTotal().toLocaleString()}
              </span>
            </div>
            <div className="summary-item">
              <span>Platform Fee (2%):</span>
              <span className="summary-value">
                Rp {(calculateTotal() * 0.02).toLocaleString()}
              </span>
            </div>
            <div className="summary-item total">
              <span>You Will Receive:</span>
              <span className="summary-value">
                Rp {(calculateTotal() * 0.98).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/portfolio")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? "Creating Listing..." : "Create Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
