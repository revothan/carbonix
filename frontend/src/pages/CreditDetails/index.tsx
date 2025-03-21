import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import components
import {
  ProjectImageGallery,
  PurchaseCard,
  OverviewTab,
  ProjectDetailsTab,
  VerificationTab,
  ImpactTab,
  ProjectBreadcrumbs
} from "./components";

// Import types
import { CreditDetailsType } from "./types";

const CreditDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [credit, setCredit] = useState<CreditDetailsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCreditDetails = async () => {
      try {
        // In a real application, this would be an API call
        // const response = await api.get(`/credits/${id}`);
        
        // Mock data for the demo
        await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API delay
        
        const mockCredit: CreditDetailsType = {
          id: id || "",
          projectName: "Sumatra Rainforest Conservation Project",
          projectType: "forest_conservation",
          standard: "Verified Carbon Standard (VCS)",
          vintage: 2023,
          quantity: 500,
          availableQuantity: 350,
          price: 12500,
          description: "The Sumatra Rainforest Conservation Project protects critical habitat for endangered species including orangutans, tigers, and elephants. By preventing deforestation and implementing sustainable land management practices, the project reduces carbon emissions while supporting local communities and biodiversity conservation efforts. The project area spans 150,000 hectares of tropical rainforest in northern Sumatra, Indonesia.",
          projectDeveloper: "EcoSustain Indonesia",
          location: "North Sumatra, Indonesia",
          country: "Indonesia",
          coordinates: "3.5952° N, 98.6722° E",
          methodology: "VM0015: Avoided Unplanned Deforestation",
          verifier: "DNV GL Climate Change Services",
          verificationDate: "2023-04-15",
          registryLink: "https://registry.verra.org/app/projectDetail/VCS/",
          registryId: "VCS-2023-1548",
          imageUrl: "https://placehold.co/1200x600/2e7d32/FFFFFF.png?text=Sumatra+Rainforest",
          images: [
            "https://placehold.co/1200x600/2e7d32/FFFFFF.png?text=Sumatra+Rainforest+1",
            "https://placehold.co/1200x600/2e7d32/FFFFFF.png?text=Sumatra+Rainforest+2",
            "https://placehold.co/1200x600/2e7d32/FFFFFF.png?text=Sumatra+Rainforest+3"
          ],
          startDate: "2023-01-01",
          endDate: "2052-12-31",
          sdgs: [
            "Climate Action",
            "Life on Land",
            "Clean Water and Sanitation",
            "No Poverty"
          ],
          listings: [
            {
              id: "listing-1",
              seller: "GreenInvest Fund",
              quantity: 250,
              pricePerUnit: 12500,
              expiresAt: "2025-12-31",
              createdAt: "2024-01-15"
            },
            {
              id: "listing-2",
              seller: "Carbon Solutions Corp",
              quantity: 100,
              pricePerUnit: 13000,
              expiresAt: "2025-06-30",
              createdAt: "2024-02-10"
            }
          ]
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
    if (!credit) return;
    // In a real app, this would open a purchase flow
    alert(`You would now begin the process to purchase carbon credits from ${credit.projectName}.`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: credit?.projectName,
        text: `Check out this carbon credit project: ${credit?.projectName}`,
        url: window.location.href,
      }).catch(err => console.log("Error sharing:", err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!credit) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Carbon Credit Not Found</h2>
          <p className="mt-2 text-muted-foreground">
            The requested carbon credit could not be found.
          </p>
          <button 
            className="mt-4 px-4 py-2 bg-primary text-white rounded" 
            onClick={() => navigate("/marketplace")}
          >
            Return to Marketplace
          </button>
        </div>
      </div>
    );
  }

  // Total available credits
  const totalAvailableCredits = credit.listings.reduce(
    (total, listing) => total + listing.quantity, 0
  );

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <ProjectBreadcrumbs projectName={credit.projectName} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Images and Project Details Tabs */}
        <div className="md:col-span-2 space-y-6">
          {/* Main Image Gallery */}
          <ProjectImageGallery 
            images={credit.images} 
            projectName={credit.projectName} 
          />

          {/* Tabs for Project Details */}
          <Tabs defaultValue="overview">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Project Details</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <OverviewTab 
              description={credit.description}
              projectType={credit.projectType}
              standard={credit.standard}
              vintage={credit.vintage}
              projectDeveloper={credit.projectDeveloper}
              location={credit.location}
              registryId={credit.registryId}
              registryLink={credit.registryLink}
            />
            
            {/* Project Details Tab */}
            <ProjectDetailsTab 
              startDate={credit.startDate}
              endDate={credit.endDate}
              location={credit.location}
              coordinates={credit.coordinates}
              methodology={credit.methodology}
              projectDeveloper={credit.projectDeveloper}
            />
            
            {/* Verification Tab */}
            <VerificationTab 
              verifier={credit.verifier}
              verificationDate={credit.verificationDate}
              standard={credit.standard}
              registryId={credit.registryId}
              registryLink={credit.registryLink}
            />
            
            {/* Impact Tab */}
            <ImpactTab 
              sdgs={credit.sdgs}
              quantityOffset={credit.quantity}
            />
          </Tabs>
        </div>

        {/* Right Column - Purchase Card */}
        <div>
          <PurchaseCard 
            projectName={credit.projectName}
            projectType={credit.projectType}
            standard={credit.standard}
            vintage={credit.vintage}
            availableQuantity={credit.availableQuantity}
            price={credit.price}
            onPurchase={handlePurchase}
            onShare={handleShare}
          />
        </div>
      </div>
    </div>
  );
};

export default CreditDetails;