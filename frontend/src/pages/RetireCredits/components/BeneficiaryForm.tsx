import React from 'react';
import { FormErrors, FormValues } from '../types';

interface BeneficiaryFormProps {
  formValues: FormValues;
  formErrors: FormErrors;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const BeneficiaryForm: React.FC<BeneficiaryFormProps> = ({
  formValues,
  formErrors,
  handleInputChange,
}) => {
  const currentYear = new Date().getFullYear();

  return (
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
            const year = currentYear - i;
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
          rows={3}
          placeholder="Add a personal message to appear on the certificate..."
        />
      </div>
    </div>
  );
};

export default BeneficiaryForm;
