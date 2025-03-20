import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Custom hook to get query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const RetireCredits = ({ user }) => {
  const query = useQuery();
  const navigate = useNavigate();
  const initialCreditId = query.get("creditId");

  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    creditId: initialCreditId || "",
    quantity: 1,
    beneficiaryName: user?.displayName || "",
    beneficiaryAddress: "",
    retirementMessage: "",
    retirementPurpose: "",
    retirementDetails: {
      yearOfEmissions: new Date().getFullYear(),
      productName: "",
      companyName: "",
      eventName: "",
      eventDate: "",
    },
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState(null);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        // Mock data - in real app, would fetch from blockchain
        const mockCredits = [
          {
            id: "credit-001",
            projectName: "Sumatra Forest Conservation",
            projectType: "forest_conservation",
            standard: "VCS",
            vintage: 2023,
            quantity: 25,
            imageUrl: "https://via.placeholder.com/100?text=Forest",
          },
          {
            id: "credit-002",
            projectName: "Java Solar Farm",
            projectType: "renewable_energy",
            standard: "Gold Standard",
            vintage: 2022,
            quantity: 10,
            imageUrl: "https://via.placeholder.com/100?text=Solar",
          },
        ];

        setCredits(mockCredits);

        if (initialCreditId) {
          const selected = mockCredits.find((c) => c.id === initialCreditId);
          if (selected) {
            setSelectedCredit(selected);
          }
        }
      } catch (error) {
        console.error("Error fetching credits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, [initialCreditId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormValues((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else if (name === "creditId") {
      const selected = credits.find((c) => c.id === value);
      setSelectedCredit(selected || null);
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: name === "quantity" ? parseInt(value) || "" : value,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formValues.creditId) {
      errors.creditId = "Please select a carbon credit to retire";
    }

    if (!formValues.quantity || formValues.quantity <= 0) {
      errors.quantity = "Please enter a valid quantity";
    } else if (
      selectedCredit &&
      formValues.quantity > selectedCredit.quantity
    ) {
      errors.quantity = `Quantity cannot exceed available amount (${selectedCredit.quantity})`;
    }

    if (!formValues.beneficiaryName) {
      errors.beneficiaryName = "Please enter a beneficiary name";
    }

    if (!formValues.retirementPurpose) {
      errors.retirementPurpose = "Please select a retirement purpose";
    }

    // Validate purpose-specific fields
    if (
      formValues.retirementPurpose === "carbon_neutral_product" &&
      !formValues.retirementDetails.productName
    ) {
      errors["retirementDetails.productName"] = "Please enter a product name";
    }

    if (
      formValues.retirementPurpose === "carbon_neutral_company" &&
      !formValues.retirementDetails.companyName
    ) {
      errors["retirementDetails.companyName"] = "Please enter a company name";
    }

    if (formValues.retirementPurpose === "carbon_neutral_event") {
      if (!formValues.retirementDetails.eventName) {
        errors["retirementDetails.eventName"] = "Please enter an event name";
      }
      if (!formValues.retirementDetails.eventDate) {
        errors["retirementDetails.eventDate"] = "Please enter an event date";
      }
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
      console.log("Retiring credits with values:", formValues);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate certificate ID that would be returned
      const certificateId = `cert-${Date.now()}`;

      // Show success message and redirect to certificate
      alert("Credits retired successfully! Generating certificate...");
      navigate(`/certificates/${certificateId}`);
    } catch (error) {
      console.error("Error retiring credits:", error);
      setFormErrors((prev) => ({
        ...prev,
        submit: "Error retiring credits. Please try again.",
      }));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading your carbon credits...</div>;
  }

  return (
    <div className="retire-credits-container">
      <div className="page-header">
        <h1>Retire Carbon Credits</h1>
        <p>
          Permanently retire credits to offset emissions and generate proof of
          offset certificates
        </p>
      </div>

      <div className="retirement-form-container">
        <form onSubmit={handleSubmit} className="retirement-form">
          {formErrors.submit && (
            <div className="error-message">{formErrors.submit}</div>
          )}

          <div className="form-section">
            <h2>Select Carbon Credits</h2>

            <div className="form-group">
              <label htmlFor="creditId">Carbon Credit *</label>
              <select
                id="creditId"
                name="creditId"
                value={formValues.creditId}
                onChange={handleInputChange}
                className={formErrors.creditId ? "error" : ""}
              >
                <option value="">-- Select a carbon credit --</option>
                {credits.map((credit) => (
                  <option key={credit.id} value={credit.id}>
                    {credit.projectName} ({credit.quantity} tonnes available)
                  </option>
                ))}
              </select>
              {formErrors.creditId && (
                <div className="error-text">{formErrors.creditId}</div>
              )}
            </div>

            {selectedCredit && (
              <div className="selected-credit">
                <div className="credit-image">
                  <img
                    src={selectedCredit.imageUrl}
                    alt={selectedCredit.projectName}
                  />
                </div>
                <div className="credit-details">
                  <h3>{selectedCredit.projectName}</h3>
                  <p>
                    {selectedCredit.projectType.replace("_", " ")} |{" "}
                    {selectedCredit.standard}
                  </p>
                  <p>Vintage: {selectedCredit.vintage}</p>
                  <p>Available: {selectedCredit.quantity} tonnes</p>
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="quantity">Quantity to Retire (tonnes) *</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formValues.quantity}
                onChange={handleInputChange}
                min="1"
                max={selectedCredit ? selectedCredit.quantity : undefined}
                className={formErrors.quantity ? "error" : ""}
              />
              {formErrors.quantity && (
                <div className="error-text">{formErrors.quantity}</div>
              )}
            </div>
          </div>

          <div className="form-section">
            <h2>Retirement Details</h2>

            <div className="form-group">
              <label htmlFor="beneficiaryName">Beneficiary Name *</label>
              <input
                type="text"
                id="beneficiaryName"
                name="beneficiaryName"
                value={formValues.beneficiaryName}
                onChange={handleInputChange}
                placeholder="Entity offsetting their emissions"
                className={formErrors.beneficiaryName ? "error" : ""}
              />
              {formErrors.beneficiaryName && (
                <div className="error-text">{formErrors.beneficiaryName}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="beneficiaryAddress">
                Beneficiary Address (Optional)
              </label>
              <input
                type="text"
                id="beneficiaryAddress"
                name="beneficiaryAddress"
                value={formValues.beneficiaryAddress}
                onChange={handleInputChange}
                placeholder="Physical address for the certificate"
              />
            </div>

            <div className="form-group">
              <label htmlFor="retirementPurpose">Retirement Purpose *</label>
              <select
                id="retirementPurpose"
                name="retirementPurpose"
                value={formValues.retirementPurpose}
                onChange={handleInputChange}
                className={formErrors.retirementPurpose ? "error" : ""}
              >
                <option value="">-- Select purpose --</option>
                <option value="carbon_neutral_product">
                  Carbon Neutral Product
                </option>
                <option value="carbon_neutral_service">
                  Carbon Neutral Service
                </option>
                <option value="carbon_neutral_company">
                  Carbon Neutral Company
                </option>
                <option value="carbon_neutral_event">
                  Carbon Neutral Event
                </option>
                <option value="carbon_neutral_individual">
                  Personal Carbon Footprint
                </option>
                <option value="offsetting_emissions">
                  General Emissions Offsetting
                </option>
                <option value="corporate_social_responsibility">
                  Corporate Social Responsibility
                </option>
                <option value="other">Other</option>
              </select>
              {formErrors.retirementPurpose && (
                <div className="error-text">{formErrors.retirementPurpose}</div>
              )}
            </div>

            {/* Conditional fields based on purpose */}
            {formValues.retirementPurpose === "carbon_neutral_product" && (
              <div className="form-group">
                <label htmlFor="retirementDetails.productName">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="retirementDetails.productName"
                  name="retirementDetails.productName"
                  value={formValues.retirementDetails.productName}
                  onChange={handleInputChange}
                  className={
                    formErrors["retirementDetails.productName"] ? "error" : ""
                  }
                />
                {formErrors["retirementDetails.productName"] && (
                  <div className="error-text">
                    {formErrors["retirementDetails.productName"]}
                  </div>
                )}
              </div>
            )}

            {formValues.retirementPurpose === "carbon_neutral_company" && (
              <div className="form-group">
                <label htmlFor="retirementDetails.companyName">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="retirementDetails.companyName"
                  name="retirementDetails.companyName"
                  value={formValues.retirementDetails.companyName}
                  onChange={handleInputChange}
                  className={
                    formErrors["retirementDetails.companyName"] ? "error" : ""
                  }
                />
                {formErrors["retirementDetails.companyName"] && (
                  <div className="error-text">
                    {formErrors["retirementDetails.companyName"]}
                  </div>
                )}
              </div>
            )}

            {formValues.retirementPurpose === "carbon_neutral_event" && (
              <>
                <div className="form-group">
                  <label htmlFor="retirementDetails.eventName">
                    Event Name *
                  </label>
                  <input
                    type="text"
                    id="retirementDetails.eventName"
                    name="retirementDetails.eventName"
                    value={formValues.retirementDetails.eventName}
                    onChange={handleInputChange}
                    className={
                      formErrors["retirementDetails.eventName"] ? "error" : ""
                    }
                  />
                  {formErrors["retirementDetails.eventName"] && (
                    <div className="error-text">
                      {formErrors["retirementDetails.eventName"]}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="retirementDetails.eventDate">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    id="retirementDetails.eventDate"
                    name="retirementDetails.eventDate"
                    value={formValues.retirementDetails.eventDate}
                    onChange={handleInputChange}
                    className={
                      formErrors["retirementDetails.eventDate"] ? "error" : ""
                    }
                  />
                  {formErrors["retirementDetails.eventDate"] && (
                    <div className="error-text">
                      {formErrors["retirementDetails.eventDate"]}
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="retirementDetails.yearOfEmissions">
                Year of Emissions
              </label>
              <select
                id="retirementDetails.yearOfEmissions"
                name="retirementDetails.yearOfEmissions"
                value={formValues.retirementDetails.yearOfEmissions}
                onChange={handleInputChange}
              >
                {[...Array(5)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="retirementMessage">
                Retirement Message (Optional)
              </label>
              <textarea
                id="retirementMessage"
                name="retirementMessage"
                value={formValues.retirementMessage}
                onChange={handleInputChange}
                rows="3"
                placeholder="Add a personal message to appear on the certificate..."
              />
            </div>
          </div>

          <div className="form-notice">
            <p>
              <strong>Important:</strong> Retiring carbon credits is
              irreversible. Once retired, credits cannot be transferred or sold.
            </p>
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
              {submitting
                ? "Retiring Credits..."
                : "Retire Credits & Generate Certificate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RetireCredits;
