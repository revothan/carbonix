import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  ArrowLeft,
  HelpCircle,
  Leaf,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

// UI Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";

// Services
import blockchainService from "@/services/BlockchainService";
import { formatCurrency } from "@/lib/utils";

// Custom hook to get query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const CreateListing = ({ user }) => {
  const query = useQuery();
  const navigate = useNavigate();
  const creditId = query.get("creditId");

  // States
  const [availableCredits, setAvailableCredits] = useState([]);
  const [selectedCredit, setSelectedCredit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchingCredits, setFetchingCredits] = useState(false);
  const [formValues, setFormValues] = useState({
    creditId: "",
    quantity: 1,
    pricePerUnit: "",
    expiresAt: "",
    description: "",
    allowPartialSales: true,
    minPurchaseQuantity: 1,
    immediateSettlement: true,
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Calculate the default expiration date (30 days from now)
  const getDefaultExpirationDate = () => {
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
        const mockCredits = [
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

  const selectCredit = (credit) => {
    setSelectedCredit(credit);
    setFormValues((prev) => ({
      ...prev,
      creditId: credit.id,
      quantity: credit.availableQuantity,
      expiresAt: getDefaultExpirationDate(),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

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

  const handleSelectChange = (name, value) => {
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

  const handleSwitchChange = (name, checked) => {
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

  const validateForm = () => {
    const errors = {};

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

    if (!formValues.pricePerUnit || formValues.pricePerUnit <= 0) {
      errors.pricePerUnit = "Please enter a valid price per unit";
    } else if (formValues.pricePerUnit < 1000) {
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

  const handleSubmit = async (e) => {
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

  const calculateTotal = () => {
    if (!formValues.quantity || !formValues.pricePerUnit) {
      return 0;
    }
    return formValues.quantity * formValues.pricePerUnit;
  };

  const getPlatformFee = () => {
    return calculateTotal() * 0.02; // 2% platform fee
  };

  const getReceiveAmount = () => {
    return calculateTotal() - getPlatformFee();
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
      <div className="container max-w-3xl mx-auto px-4 py-8">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">
              Listing Created Successfully!
            </CardTitle>
            <CardDescription className="text-lg">
              Your carbon credits have been listed on the marketplace.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Project:</p>
                  <p className="font-medium">{selectedCredit.projectName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quantity:</p>
                  <p className="font-medium">{formValues.quantity} tonnes</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Price Per Tonne:
                  </p>
                  <p className="font-medium">
                    {formatCurrency(formValues.pricePerUnit)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Value:</p>
                  <p className="font-medium">
                    {formatCurrency(calculateTotal())}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Redirecting to your portfolio in a few seconds...
            </p>
          </CardContent>
          <CardFooter className="justify-between flex">
            <Button variant="outline" onClick={() => navigate("/marketplace")}>
              View Marketplace
            </Button>
            <Button onClick={() => navigate("/portfolio")}>
              Go to My Portfolio
            </Button>
          </CardFooter>
        </Card>
      </div>
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
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Credit Information</CardTitle>
              <CardDescription>
                Select which carbon credit you'd like to list for sale
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!fetchingCredits ? (
                availableCredits.length > 0 ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="creditId">
                        Select Carbon Credit{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formValues.creditId}
                        onValueChange={(value) =>
                          handleSelectChange("creditId", value)
                        }
                      >
                        <SelectTrigger
                          id="creditId"
                          className={
                            formErrors.creditId ? "border-destructive" : ""
                          }
                        >
                          <SelectValue placeholder="Select a carbon credit" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCredits.map((credit) => (
                            <SelectItem key={credit.id} value={credit.id}>
                              {credit.projectName} ({credit.availableQuantity}{" "}
                              tonnes)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formErrors.creditId && (
                        <p className="text-sm text-destructive mt-1">
                          {formErrors.creditId}
                        </p>
                      )}
                    </div>

                    {selectedCredit && (
                      <div className="mt-4 rounded-lg border overflow-hidden">
                        <div className="aspect-video w-full overflow-hidden bg-muted relative">
                          <img
                            src={selectedCredit.imageUrl}
                            alt={selectedCredit.projectName}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.parentNode.style.backgroundColor =
                                selectedCredit.color || "#2e7d32";
                              e.target.style.display = "none";
                              const icon = document.createElement("div");
                              icon.className =
                                "absolute inset-0 flex items-center justify-center";
                              icon.innerHTML =
                                '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-leaf"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>';
                              e.target.parentNode.appendChild(icon);
                            }}
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex gap-2 mb-2">
                            <Badge variant="secondary">
                              {selectedCredit.projectType
                                .split("_")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() +
                                    word.slice(1),
                                )
                                .join(" ")}
                            </Badge>
                            <Badge variant="outline">
                              {selectedCredit.standard}
                            </Badge>
                            <Badge variant="outline">
                              Vintage {selectedCredit.vintage}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold">
                            {selectedCredit.projectName}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Available quantity:{" "}
                            {selectedCredit.availableQuantity} tonnes
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="rounded-full bg-muted p-3 mb-4">
                      <Leaf className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">
                      No carbon credits available
                    </h3>
                    <p className="text-muted-foreground mt-1 max-w-md">
                      You don't have any carbon credits to list. Purchase
                      credits from the marketplace first.
                    </p>
                    <Button
                      className="mt-4"
                      onClick={() => navigate("/marketplace")}
                    >
                      Browse Marketplace
                    </Button>
                  </div>
                )
              ) : (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Listing Details Card */}
          {selectedCredit && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Listing Details</CardTitle>
                <CardDescription>
                  Set your pricing and listing conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">
                      Quantity (tonnes){" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex">
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        value={formValues.quantity}
                        onChange={handleInputChange}
                        min="1"
                        max={selectedCredit.availableQuantity}
                        className={
                          formErrors.quantity ? "border-destructive" : ""
                        }
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="ml-2"
                        onClick={() =>
                          setFormValues((prev) => ({
                            ...prev,
                            quantity: selectedCredit.availableQuantity,
                          }))
                        }
                      >
                        Max
                      </Button>
                    </div>
                    {formErrors.quantity && (
                      <p className="text-sm text-destructive">
                        {formErrors.quantity}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Available: {selectedCredit.availableQuantity} tonnes
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pricePerUnit">
                      Price per Tonne (IDRX){" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                        Rp
                      </span>
                      <Input
                        id="pricePerUnit"
                        name="pricePerUnit"
                        type="number"
                        placeholder="Enter price per tonne"
                        value={formValues.pricePerUnit}
                        onChange={handleInputChange}
                        min="1000"
                        className={`pl-8 ${formErrors.pricePerUnit ? "border-destructive" : ""}`}
                      />
                    </div>
                    {formErrors.pricePerUnit && (
                      <p className="text-sm text-destructive">
                        {formErrors.pricePerUnit}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Minimum price: Rp 1,000 per tonne
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiresAt">Listing Expiration</Label>
                  <Input
                    id="expiresAt"
                    name="expiresAt"
                    type="date"
                    value={formValues.expiresAt}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <p className="text-xs text-muted-foreground">
                    If not specified, the listing will expire in 30 days
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-base font-medium">Advanced Options</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allowPartialSales" className="text-base">
                        Allow Partial Sales
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Let buyers purchase a portion of your listed credits
                      </p>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Switch
                            id="allowPartialSales"
                            checked={formValues.allowPartialSales}
                            onCheckedChange={(checked) =>
                              handleSwitchChange("allowPartialSales", checked)
                            }
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            When enabled, buyers can purchase a fraction of your
                            total listing.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {formValues.allowPartialSales && (
                    <div className="space-y-2 pl-6 border-l-2 border-muted ml-2">
                      <Label htmlFor="minPurchaseQuantity">
                        Minimum Purchase Quantity
                      </Label>
                      <Input
                        id="minPurchaseQuantity"
                        name="minPurchaseQuantity"
                        type="number"
                        value={formValues.minPurchaseQuantity}
                        onChange={handleInputChange}
                        min="1"
                        max={formValues.quantity}
                        className={
                          formErrors.minPurchaseQuantity
                            ? "border-destructive"
                            : ""
                        }
                      />
                      {formErrors.minPurchaseQuantity && (
                        <p className="text-sm text-destructive">
                          {formErrors.minPurchaseQuantity}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Minimum amount a buyer must purchase in a single
                        transaction
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label
                        htmlFor="immediateSettlement"
                        className="text-base"
                      >
                        Immediate Settlement
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Credits transfer immediately upon sale completion
                      </p>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Switch
                            id="immediateSettlement"
                            checked={formValues.immediateSettlement}
                            onCheckedChange={(checked) =>
                              handleSwitchChange("immediateSettlement", checked)
                            }
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            When enabled, funds and credits transfer immediately
                            upon purchase.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="description">
                    Additional Description (Optional)
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formValues.description}
                    onChange={handleInputChange}
                    placeholder="Add any additional details about your listing..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Summary Card */}
          {selectedCredit && formValues.pricePerUnit && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Listing Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex justify-between py-2 border-b">
                    <dt className="text-muted-foreground">Project:</dt>
                    <dd className="font-medium">
                      {selectedCredit.projectName}
                    </dd>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <dt className="text-muted-foreground">Quantity:</dt>
                    <dd className="font-medium">
                      {formValues.quantity} tonnes
                    </dd>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <dt className="text-muted-foreground">Price per Tonne:</dt>
                    <dd className="font-medium">
                      {formatCurrency(formValues.pricePerUnit)}
                    </dd>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <dt className="text-muted-foreground">
                      Total Listing Value:
                    </dt>
                    <dd className="font-medium">
                      {formatCurrency(calculateTotal())}
                    </dd>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <dt className="text-muted-foreground">
                      Platform Fee (2%):
                    </dt>
                    <dd className="font-medium">
                      {formatCurrency(getPlatformFee())}
                    </dd>
                  </div>
                  <div className="flex justify-between py-2 font-medium">
                    <dt>You Will Receive:</dt>
                    <dd className="text-lg">
                      {formatCurrency(getReceiveAmount())}
                    </dd>
                  </div>
                </dl>
              </CardContent>
              <CardFooter className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/portfolio")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Creating Listing..." : "Create Listing"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateListing;
