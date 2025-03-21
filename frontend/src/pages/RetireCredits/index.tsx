import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Components
import { CreditSelector, BeneficiaryForm } from './components';

// Types
import { Credit, FormValues, FormErrors, RetireCreditsProps } from './types';

// Custom hook to get query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const RetireCredits: React.FC<RetireCreditsProps> = ({ user }) => {
  const query = useQuery();
  const navigate = useNavigate();
  const initialCreditId = query.get('creditId');

  const [credits, setCredits] = useState<Credit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formValues, setFormValues] = useState<FormValues>({
    creditId: initialCreditId || '',
    quantity: 1,
    beneficiaryName: user?.displayName || '',
    beneficiaryAddress: '',
    retirementMessage: '',
    retirementPurpose: '',
    retirementDetails: {
      yearOfEmissions: new Date().getFullYear(),
      productName: '',
      companyName: '',
      eventName: '',
      eventDate: '',
    },
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [selectedCredit, setSelectedCredit] = useState<Credit | null>(null);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        // Mock data - in real app, would fetch from blockchain
        const mockCredits: Credit[] = [
          {
            id: 'credit-001',
            projectName: 'Sumatra Forest Conservation',
            projectType: 'forest_conservation',
            standard: 'VCS',
            vintage: 2023,
            quantity: 25,
            imageUrl: 'https://via.placeholder.com/100?text=Forest',
          },
          {
            id: 'credit-002',
            projectName: 'Java Solar Farm',
            projectType: 'renewable_energy',
            standard: 'Gold Standard',
            vintage: 2022,
            quantity: 10,
            imageUrl: 'https://via.placeholder.com/100?text=Solar',
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
        console.error('Error fetching credits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, [initialCreditId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormValues((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof FormValues] as Record<string, any>,
          [child]: value,
        },
      }));
    } else if (name === 'creditId') {
      const selected = credits.find((c) => c.id === value);
      setSelectedCredit(selected || null);
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: name === 'quantity' ? parseInt(value) || '' : value,
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formValues.creditId) {
      errors.creditId = 'Please select a carbon credit to retire';
    }

    if (!formValues.quantity || formValues.quantity <= 0) {
      errors.quantity = 'Please enter a valid quantity';
    } else if (
      selectedCredit &&
      formValues.quantity > selectedCredit.quantity
    ) {
      errors.quantity = `Quantity cannot exceed available amount (${selectedCredit.quantity})`;
    }

    if (!formValues.beneficiaryName) {
      errors.beneficiaryName = 'Please enter a beneficiary name';
    }

    if (!formValues.retirementPurpose) {
      errors.retirementPurpose = 'Please select a retirement purpose';
    }

    // Validate purpose-specific fields
    if (
      formValues.retirementPurpose === 'carbon_neutral_product' &&
      !formValues.retirementDetails.productName
    ) {
      errors['retirementDetails.productName'] = 'Please enter a product name';
    }

    if (
      formValues.retirementPurpose === 'carbon_neutral_company' &&
      !formValues.retirementDetails.companyName
    ) {
      errors['retirementDetails.companyName'] = 'Please enter a company name';
    }

    if (formValues.retirementPurpose === 'carbon_neutral_event') {
      if (!formValues.retirementDetails.eventName) {
        errors['retirementDetails.eventName'] = 'Please enter an event name';
      }
      if (!formValues.retirementDetails.eventDate) {
        errors['retirementDetails.eventDate'] = 'Please enter an event date';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      // In real app, this would call blockchain service
      console.log('Retiring credits with values:', formValues);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate certificate ID that would be returned
      const certificateId = `cert-${Date.now()}`;

      // Show success message and redirect to certificate
      alert('Credits retired successfully! Generating certificate...');
      navigate(`/certificates/${certificateId}`);
    } catch (error) {
      console.error('Error retiring credits:', error);
      setFormErrors((prev) => ({
        ...prev,
        submit: 'Error retiring credits. Please try again.',
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

          <CreditSelector
            credits={credits}
            formValues={formValues}
            formErrors={formErrors}
            selectedCredit={selectedCredit}
            handleInputChange={handleInputChange}
          />

          <BeneficiaryForm
            formValues={formValues}
            formErrors={formErrors}
            handleInputChange={handleInputChange}
          />

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
              onClick={() => navigate('/portfolio')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting
                ? 'Retiring Credits...'
                : 'Retire Credits & Generate Certificate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RetireCredits;
