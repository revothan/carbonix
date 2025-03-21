import React from 'react';
import { Credit, FormErrors, FormValues } from '../types';

interface CreditSelectorProps {
  credits: Credit[];
  formValues: FormValues;
  formErrors: FormErrors;
  selectedCredit: Credit | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const CreditSelector: React.FC<CreditSelectorProps> = ({
  credits,
  formValues,
  formErrors,
  selectedCredit,
  handleInputChange,
}) => {
  return (
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
              {selectedCredit.projectType.replace("_", " ")} | {selectedCredit.standard}
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
  );
};

export default CreditSelector;
