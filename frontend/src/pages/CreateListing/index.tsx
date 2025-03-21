import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

import {
  CreditSelectionCard,
  ListingDetailsCard,
  ListingSummaryCard,
  SuccessCard,
} from "./components";
import { CreditType, FormValuesType, FormErrorsType, CreateListingProps } from "./types";

// Custom hook to get query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const CreateListing: React.FC<CreateListingProps> = ({ user }) => {
  const query = useQuery();
  const navigate = useNavigate();
  const creditId = query.get("creditId");

  // States
  const [availableCredits, setAvailableCredits] = useState<CreditType[]>([]);
  const [selectedCredit, setSelectedCredit] = useState<CreditType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchingCredits, setFetchingCredits] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValuesType>({
    creditId: "",
    quantity: 1,
    pricePerUnit: "",
    expiresAt: "",
    description: "",
    allowPartialSales: true,
    minPurchaseQuantity: 1,
    immediateSettlement: true,
  });
  const [formErrors, setFormErrors] = useState<FormErrorsType>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Calculate the default expiration date (30 days from now)
  const getDefaultExpirationDate = (): string => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchCredits = async () => {
      setFetchingCredits(true);
      try {
        // In a real application, this would fetch from blockchain service
        // await blockchainService.initialize();
        // const credits = await blockchainService.getAllCredits({ owner: user.walletAddress, status: "active" });

        // Mock data for now
        const mockCredits: CreditType[] = [
          {
            id: "credit-001",
            projectName: "Sumatra Forest Conservation",
            projectType: "forest_conservation",
            standard: "VCS",
            vintage: 2023,
            quantity: 25,
            availableQuantity: 25,
            imageUrl:
              "https://placehold.co/800x400/2e7d32/FFFFFF?text=Forest+Conservation",
            color: "#2e7d32",
          },
          {
            id: "credit-002",
            projectName: "Java Solar Farm",
            projectType: "renewable_energy",
            standard: "Gold Standard",
            vintage: 2022,
            quantity: 10,
            availableQuantity: 10,
            imageUrl:
              "https://placehold.co/800x400/ff9800/FFFFFF?text=Solar+Energy",
            color: "#ff9800",
          },
          {
            id: "credit-003",
            projectName: "Bali Mangrove Restoration",
            projectType: "blue_carbon",
            standard: "VCS",
            vintage: 2023,
            quantity: 15,
            availableQuantity: 15,
            imageUrl:
              "https://placehold.co/800x400/0288d1/FFFFFF?text=Mangrove+Restoration",
            color: "#0288d1",
          },
        ];

        setAvailableCredits(mockCredits);

        // If a creditId was passed, select that credit
        if (creditId) {
          const credit = mockCredits.find((c) => c.id === creditId);
          if (credit) {
            selectCredit(credit);
          }
        }
      } catch (error) {
        console.error("Error fetching available credits:", error);
      } finally {
        setFetchingCredits(false);
        setLoading(false);
      }
    };

    fetchCredits();
  }, [creditId, user.walletAddress]);

  const selectCredit = (credit: CreditType): void => {
    setSelectedCredit(credit);
    setFormValues((prev) => ({
      ...prev,
      creditId: credit.id,
      quantity: credit.availableQuantity,
      expiresAt: getDefaultExpirationDate(),
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === "checkbox") {
      setFormValues((prev) => ({
        ...prev,
        [name]: checked,
      }));

      // Reset minPurchaseQuantity if partial sales is disabled
      if (name === "allowPartialSales" && !checked) {
        setFormValues((prev) => ({
          ...prev,
          minPurchaseQuantity: prev.quantity,
        }));
      }
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]:
          name === "quantity" ||
          name === "pricePerUnit" ||
          name === "minPurchaseQuantity"
            ? parseInt(value) || ""
            : value,
      }));
    }
  };

  const handleSelectChange = (name: string, value: string): void => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "creditId") {
      const credit = availableCredits.find((c) => c.id === value);
      if (credit) {
        selectCredit(credit);
      } else {
        setSelectedCredit(null);
      }
    }
  };

  const handleSwitchChange = (name: string, checked: boolean): void => {
    setFormValues((prev) => ({
      ...prev,
      [name]: checked,
    }));

    // Reset minPurchaseQuantity if partial sales is disabled
    if (name === "allowPartialSales" && !checked) {
      setFormValues((prev) => ({
        ...prev,
        minPurchaseQuantity: prev.quantity,
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrorsType = {};

    if (!formValues.creditId) {
      errors.creditId = "Please select a carbon credit to list";
    }

    if (!formValues.quantity || formValues.quantity <= 0) {
      errors.quantity = "Please enter a valid quantity";
    } else if (
      selectedCredit &&
      formValues.quantity > selectedCredit.availableQuantity
    ) {
      errors.quantity = `Quantity cannot exceed available amount (${selectedCredit.availableQuantity})`;
    }

    if (!formValues.pricePerUnit || Number(formValues.pricePerUnit) <= 0) {
      errors.pricePerUnit = "Please enter a valid price per unit";
    } else if (Number(formValues.pricePerUnit) < 1000) {
      errors.pricePerUnit = "Minimum price is Rp 1,000 per tonne";
    }

    if (
      formValues.allowPartialSales &&
      (!formValues.minPurchaseQuantity || formValues.minPurchaseQuantity <= 0)
    ) {
      errors.minPurchaseQuantity =
        "Minimum purchase quantity must be at least 1";
    } else if (
      formValues.allowPartialSales &&
      formValues.minPurchaseQuantity > formValues.quantity
    ) {
      errors.minPurchaseQuantity =
        "Minimum purchase quantity cannot exceed total quantity";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      // In a real app, this would call blockchain service
      // const transaction = await blockchainService.createListing({
      //   action: "createListing",
      //   data: formValues
      // }, user.walletId);

      console.log("Creating listing with values:", formValues);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success state
      setSuccess(true);

      // Automatically redirect after 3 seconds
      setTimeout(() => {
        navigate("/portfolio");
      }, 3000);
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

  const calculateTotal = (): number => {
    if (!formValues.quantity || !formValues.pricePerUnit) {
      return 0;
    }
    return formValues.quantity * Number(formValues.pricePerUnit);
  };

  const getPlatformFee = (): number => {
    return calculateTotal() * 0.02; // 2% platform fee
  };

  const getReceiveAmount = (): number => {
    return calculateTotal() - getPlatformFee();
  };

  const setMaxQuantity = (): void => {
    if (selectedCredit) {
      setFormValues((prev) => ({
        ...prev,
        quantity: selectedCredit.availableQuantity,
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <SuccessCard
        selectedCredit={selectedCredit}
        formValues={formValues}
        calculateTotal={calculateTotal}
      />
    );
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link to="/portfolio">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          Create Marketplace Listing
        </h1>
        <p className="text-muted-foreground mt-1">
          List your carbon credits for sale on the marketplace
        </p>
      </div>

      {formErrors.submit && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{formErrors.submit}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {/* Credit Selection Card */}
          <CreditSelectionCard
            availableCredits={availableCredits}
            selectedCredit={selectedCredit}
            formValues={formValues}
            formErrors={formErrors}
            fetchingCredits={fetchingCredits}
            onSelectCredit={(value) => handleSelectChange("creditId", value)}
          />

          {/* Listing Details Card */}
          {selectedCredit && (
            <ListingDetailsCard
              selectedCredit={selectedCredit}
              formValues={formValues}
              formErrors={formErrors}
              onInputChange={handleInputChange}
              onSwitchChange={handleSwitchChange}
              setMaxQuantity={setMaxQuantity}
            />
          )}

          {/* Summary Card */}
          {selectedCredit && formValues.pricePerUnit && (
            <ListingSummaryCard
              selectedCredit={selectedCredit}
              formValues={formValues}
              submitting={submitting}
              calculateTotal={calculateTotal}
              getPlatformFee={getPlatformFee}
              getReceiveAmount={getReceiveAmount}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateListing;