import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";
import { MapPin, CalendarClock, Certificate, Shield, Globe, ArrowLeft } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CreditDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [credit, setCredit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchCreditDetails = async () => {
      try {
        // In a real app, this would fetch from blockchain service
        // For now, using enhanced mock data
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
            "This project protects 15,000 hectares of rainforest in Sumatra, preventing deforestation and preserving habitat for endangered species such as the Sumatran tiger and orangutan. The project works with local communities to develop sustainable livelihoods and protect critical ecosystems.",
          seller: {
            id: "seller-001",
            name: "Rainforest Alliance Indonesia",
            verificationStatus: "verified",
            createdAt: "2022-05-15T00:00:00Z",
            totalSold: 12500,
            rating: 4.8,
          },
          listing: {
            id: "list-001",
            quantity: 500,
            pricePerUnit: 15000,
            totalPrice: 7500000,
            status: "active",
            createdAt: "2023-06-20T00:00:00Z",
            expiresAt: "2023-12-20T00:00:00Z",
          },
          verification: {
            status: "verified",
            verifier: "VCS Association",
            date: "2023-01-10T00:00:00Z",
            score: 92,
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
              "Sustainable livelihoods for local communities",
              "Protection of endangered species habitat"
            ],
            sdgs: [13, 15, 1, 6],
            carbonStorage: 45000, // tonnes of CO2
            treesProtected: 250000,
            areaProtected: 15000, // hectares
          },
          images: [
            "https://placehold.co/800x400/2e7d32/FFFFFF?text=Forest+Conservation",
            "https://placehold.co/800x400/2e7d32/FFFFFF?text=Local+Community",
            "https://placehold.co/800x400/2e7d32/FFFFFF?text=Wildlife",
          ],
        };

        setCredit(mockCredit);
      } catch (error) {
        console.error("Error fetching credit details:", error);
        setError("Failed to load credit details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCreditDetails();
  }, [id]);

  const handlePurchase = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setShowPurchaseModal(true);
  };

  const confirmPurchase = async () => {
    try {
      setLoading(true);
      // In a real implementation, this would call the blockchain service
      console.log(`Purchasing ${purchaseQuantity} tonnes of credit ${id}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Close modal and show success message
      setShowPurchaseModal(false);
      setSuccess(`Successfully purchased ${purchaseQuantity} tonnes of carbon credits`);
      
      // Reset after 5 seconds
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      setError("Transaction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      setPurchaseQuantity(1);
    } else if (credit && value > credit.listing.quantity) {
      setPurchaseQuantity(credit.listing.quantity);
    } else {
      setPurchaseQuantity(value);
    }
  };

  const handleRetireCredits = () => {
    // Navigate to retire page with pre-filled credit
    navigate(`/retire?creditId=${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error && !credit) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto my-8">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!credit) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto my-8">
        <AlertDescription>Credit not found or no longer available</AlertDescription>
      </Alert>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get project type formatted (e.g., "forest_conservation" -> "Forest Conservation")
  const formattedProjectType = credit.projectType
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Back button */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Marketplace
        </Button>
      </div>

      {success && (
        <Alert className="mb-6 bg-green-50 border-green-200 text-green-800">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Project header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{credit.projectName}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">{formattedProjectType}</Badge>
          <Badge variant="outline">{credit.standard}</Badge>
          <Badge variant="outline">Vintage {credit.vintage}</Badge>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area - 2/3 width on desktop */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gallery */}
          <Card>
            <CardContent className="p-0 overflow-hidden">
              <div className="aspect-video w-full">
                <img 
                  src={credit.images[0]} 
                  alt={credit.projectName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-1 p-1">
                {credit.images.slice(1).map((image, idx) => (
                  <div key={idx} className="aspect-[4/3]">
                    <img 
                      src={image} 
                      alt={`${credit.projectName} ${idx + 2}`}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-90"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tabs for details */}
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Project Description</h3>
                    <p className="text-muted-foreground">{credit.description}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        {credit.location.region}, {credit.location.country}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CalendarClock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Vintage: {credit.vintage}</span>
                    </div>
                    <div className="flex items-center">
                      <Certificate className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Standard: {credit.standard}</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Co-benefits</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {credit.additionalInfo.cobenefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Sustainable Development Goals</h3>
                    <div className="flex flex-wrap gap-4">
                      {credit.additionalInfo.sdgs.map((sdg) => (
                        <div key={sdg} className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-muted flex items-center justify-center rounded-lg mb-1">
                            <span className="font-bold text-lg">SDG {sdg}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="verification" className="pt-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={credit.verification.status === "verified" ? "default" : "outline"}>
                      {credit.verification.status.toUpperCase()}
                    </Badge>
                    <span className="text-muted-foreground text-sm">
                      Verified on {formatDate(credit.verification.date)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Verification Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-1">Verified By</h4>
                        <p>{credit.verification.verifier}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Methodology</h4>
                        <p>{credit.methodology}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Verification Score</h4>
                        <div className="flex items-center">
                          <div className="w-full bg-muted rounded-full h-2.5 mr-2">
                            <div 
                              className="bg-primary h-2.5 rounded-full" 
                              style={{ width: `${credit.verification.score}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{credit.verification.score}/100</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Verification Documents</h3>
                    <ul className="space-y-2">
                      {credit.verification.documents.map((doc, index) => (
                        <li key={index}>
                          <Button variant="outline" size="sm" asChild>
                            <a href={doc.url} target="_blank" rel="noopener noreferrer">
                              {doc.name}
                            </a>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Blockchain Verification</h3>
                    <p className="text-muted-foreground mb-2">
                      All carbon credit data is verified and stored on the Lisk blockchain,
                      ensuring transparent and immutable records of origin, verification, and ownership.
                    </p>
                    <Button variant="outline" size="sm">
                      View on Block Explorer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="impact" className="pt-4">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Environmental Impact</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <Card className="bg-primary/5">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-primary mb-1">Carbon Storage</h4>
                          <p className="text-2xl font-bold">
                            {credit.additionalInfo.carbonStorage.toLocaleString()}
                            <span className="text-sm font-normal text-muted-foreground ml-1">tonnes CO₂</span>
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-primary/5">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-primary mb-1">Area Protected</h4>
                          <p className="text-2xl font-bold">
                            {credit.additionalInfo.areaProtected.toLocaleString()}
                            <span className="text-sm font-normal text-muted-foreground ml-1">hectares</span>
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-primary/5">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-primary mb-1">Trees Protected</h4>
                          <p className="text-2xl font-bold">
                            {credit.additionalInfo.treesProtected.toLocaleString()}
                            <span className="text-sm font-normal text-muted-foreground ml-1">trees</span>
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Equivalent To</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-full">
                          <Globe className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {Math.round(credit.additionalInfo.carbonStorage / 4.6).toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">Cars off the road for a year</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-full">
                          <Globe className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {Math.round(credit.additionalInfo.carbonStorage * 0.45).toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">Homes' electricity for one year</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-full">
                          <Globe className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {Math.round(credit.additionalInfo.carbonStorage * 21).toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">Mobile phones charged</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - 1/3 width on desktop */}
        <div className="space-y-6">
          {/* Purchase card */}
          <Card>
            <CardHeader>
              <CardTitle>Purchase Information</CardTitle>
              <CardDescription>Complete your carbon credit purchase</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">Price per tonne:</span>
                <span className="font-medium">{formatCurrency(credit.listing.pricePerUnit)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">Available quantity:</span>
                <span className="font-medium">{credit.listing.quantity.toLocaleString()} tonnes</span>
              </div>

              <div className="space-y-2">
                <label htmlFor="quantity" className="block text-sm font-medium">
                  Purchase quantity:
                </label>
                <div className="flex rounded-md">
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={credit.listing.quantity}
                    value={purchaseQuantity}
                    onChange={handleQuantityChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <span className="inline-flex items-center px-3 text-gray-500 bg-muted border border-l-0 border-input rounded-r-md">
                    tonnes
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center py-2 border-y font-medium">
                <span>Total price:</span>
                <span className="text-lg">{formatCurrency(purchaseQuantity * credit.listing.pricePerUnit)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button 
                className="w-full" 
                onClick={handlePurchase}
                disabled={loading}
              >
                Purchase Carbon Credits
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleRetireCredits}
              >
                Retire Credits
              </Button>
            </CardFooter>
          </Card>

          {/* Seller info card */}
          <Card>
            <CardHeader>
              <CardTitle>About the Seller</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {credit.seller.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium">{credit.seller.name}</h3>
                  <div className="flex items-center">
                    <Badge variant={
                      credit.seller.verificationStatus === "verified" ? "default" : "outline"
                    } className="text-xs">
                      {credit.seller.verificationStatus}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Member since:</span>
                  <span>{new Date(credit.seller.createdAt).getFullYear()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Credits sold:</span>
                  <span>{credit.seller.totalSold.toLocaleString()} tonnes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rating:</span>
                  <span className="flex items-center">
                    {credit.seller.rating}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-yellow-500 ml-1">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" strokeWidth="0" />
                    </svg>
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to={`/seller/${credit.seller.id}`}>
                  View Seller Profile
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Purchase modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center p-4 z-50">
          <div className="bg-background border rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Confirm Purchase</h2>
            <p className="mb-6">
              You are about to purchase <strong>{purchaseQuantity} tonnes</strong> of carbon credits from 
              <strong> {credit.projectName}</strong>.
            </p>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between py-2 border-b">
                <span>Quantity:</span>
                <span>{purchaseQuantity} tonnes</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Price per tonne:</span>
                <span>{formatCurrency(credit.listing.pricePerUnit)}</span>
              </div>
              <div className="flex justify-between py-2 border-b font-medium">
                <span>Total price:</span>
                <span>{formatCurrency(purchaseQuantity * credit.listing.pricePerUnit)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button 
                variant="outline" 
                onClick={() => setShowPurchaseModal(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                onClick={confirmPurchase}
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm Purchase"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditDetails;