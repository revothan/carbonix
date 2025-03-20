import React, { useState } from "react";
import {
  Filter,
  Leaf,
  Sun,
  Waves,
  MapPin,
  CalendarClock,
  Plus,
  Download,
  Share2,
  Search,
} from "lucide-react";

const MyPortfolio = () => {
  const [activeTab, setActiveTab] = useState("credits");
  const [activeCreditsTab, setActiveCreditsTab] = useState("grid");
  const [showFilters, setShowFilters] = useState(true);

  // Mock data
  const summary = {
    totalCredits: 58,
    totalValue: 886500,
    totalOffset: 8,
    averagePrice: 15750,
    creditsByType: {
      forest_conservation: 40,
      renewable_energy: 10,
      blue_carbon: 8,
    },
  };

  const credits = [
    {
      id: "credit-001",
      projectName: "Sumatra Forest Conservation",
      projectType: "forest_conservation",
      standard: "VCS",
      vintage: 2023,
      quantity: 25,
      totalPrice: 375000,
      status: "active",
      location: { region: "Sumatra", country: "Indonesia" },
      description:
        "Protected rainforest with high biodiversity value, home to endangered species including orangutans and Sumatran tigers.",
      color: "#2e7d32",
    },
    {
      id: "credit-002",
      projectName: "Java Solar Farm",
      projectType: "renewable_energy",
      standard: "Gold Standard",
      vintage: 2022,
      quantity: 10,
      totalPrice: 120000,
      status: "active",
      location: { region: "Java", country: "Indonesia" },
      description:
        "Solar energy farm generating clean electricity and providing local jobs while reducing dependence on fossil fuels.",
      color: "#ff9800",
    },
    {
      id: "credit-003",
      projectName: "East Kalimantan REDD+ Project",
      projectType: "forest_conservation",
      standard: "VCS",
      vintage: 2023,
      quantity: 15,
      totalPrice: 247500,
      status: "listed",
      location: { region: "Kalimantan", country: "Indonesia" },
      description:
        "Reducing emissions from deforestation and forest degradation in East Kalimantan through community-based forest management.",
      color: "#2e7d32",
    },
  ];

  const retirements = [
    {
      id: "ret-001",
      projectName: "Bali Mangrove Restoration",
      projectType: "blue_carbon",
      standard: "VCS",
      vintage: 2023,
      quantity: 5,
      beneficiary: "Eco Solutions Inc.",
      purpose: "carbon_neutral_company",
      certificateId: "cert-001",
      color: "#0288d1",
    },
    {
      id: "ret-002",
      projectName: "Sulawesi Geothermal Power",
      projectType: "renewable_energy",
      standard: "Gold Standard",
      vintage: 2022,
      quantity: 3,
      beneficiary: "Personal Carbon Offset",
      purpose: "carbon_neutral_individual",
      certificateId: "cert-002",
      color: "#ff9800",
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatProjectType = (type) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getProjectIcon = (projectType) => {
    switch (projectType) {
      case "forest_conservation":
        return <Leaf className="h-10 w-10 text-white opacity-90" />;
      case "renewable_energy":
        return <Sun className="h-10 w-10 text-white opacity-90" />;
      case "blue_carbon":
        return <Waves className="h-10 w-10 text-white opacity-90" />;
      default:
        return <Leaf className="h-10 w-10 text-white opacity-90" />;
    }
  };

  const formatPurpose = (purpose) => {
    switch (purpose) {
      case "carbon_neutral_company":
        return "Carbon Neutral Company";
      case "carbon_neutral_individual":
        return "Personal Carbon Footprint";
      default:
        return purpose
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
    }
  };

  return (
    <div className="bg-background p-6 rounded-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">
            My Carbon Portfolio
          </h1>
          <p className="text-muted-foreground">
            Manage your carbon credits and view your environmental impact
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium flex items-center">
            <Plus className="mr-2 h-4 w-4" /> Create Listing
          </button>
          <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md text-sm font-medium flex items-center">
            <Leaf className="mr-2 h-4 w-4" /> Retire Credits
          </button>
        </div>
      </div>

      {/* Portfolio Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card text-card-foreground shadow-sm rounded-lg border p-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Total Carbon Credits
            </p>
            <p className="text-2xl font-bold">
              {summary.totalCredits}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                tonnes
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              Active in your portfolio
            </p>
          </div>
        </div>

        <div className="bg-card text-card-foreground shadow-sm rounded-lg border p-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Portfolio Value</p>
            <p className="text-2xl font-bold">
              {formatCurrency(summary.totalValue)}
            </p>
            <p className="text-xs text-muted-foreground">
              Based on purchase price
            </p>
          </div>
        </div>

        <div className="bg-card text-card-foreground shadow-sm rounded-lg border p-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Average Credit Price
            </p>
            <p className="text-2xl font-bold">
              {formatCurrency(summary.averagePrice)}
            </p>
            <p className="text-xs text-muted-foreground">Per tonne CO₂e</p>
          </div>
        </div>

        <div className="bg-card text-card-foreground shadow-sm rounded-lg border p-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Carbon Retired</p>
            <p className="text-2xl font-bold">
              {summary.totalOffset}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                tonnes
              </span>
            </p>
            <p className="text-xs text-muted-foreground">Total CO₂e offset</p>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="mb-6">
        <div className="flex justify-between items-center border-b">
          <div className="inline-flex h-10 items-center justify-center space-x-1 rounded-md p-1">
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ${activeTab === "credits" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
              onClick={() => setActiveTab("credits")}
            >
              Active Credits ({credits.length})
            </button>
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ${activeTab === "retirements" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
              onClick={() => setActiveTab("retirements")}
            >
              Retired Credits ({retirements.length})
            </button>
          </div>

          {activeTab === "credits" && (
            <div className="hidden md:flex space-x-1">
              <button
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ${activeCreditsTab === "grid" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
                onClick={() => setActiveCreditsTab("grid")}
              >
                Grid
              </button>
              <button
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ${activeCreditsTab === "table" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
                onClick={() => setActiveCreditsTab("table")}
              >
                Table
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Credits Tab Content */}
      {activeTab === "credits" && (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className="md:w-64 shrink-0">
            <div className="rounded-lg border shadow-sm bg-card text-card-foreground">
              <div className="p-4 space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-medium">Filters</h3>
                  <hr className="shrink-0 bg-border h-[1px] w-full" />
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    placeholder="Search credits..."
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm"
                  />
                </div>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Project Type</label>
                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      All Types
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Vintage</label>
                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      All Years
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Standard</label>
                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      All Standards
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Status</label>
                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      All Statuses
                    </div>
                  </div>
                </div>

                <button className="inline-flex h-9 items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium bg-background hover:bg-accent hover:text-accent-foreground w-full">
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Environmental Impact Summary */}
            <div className="rounded-lg border shadow-sm bg-card text-card-foreground mt-4">
              <div className="flex flex-col space-y-1.5 p-4 pb-2">
                <h3 className="font-semibold text-lg">Environmental Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Summary by project type
                </p>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {Object.entries(summary.creditsByType).map(
                    ([type, amount]) => (
                      <div key={type} className="flex flex-col gap-1">
                        <div className="flex justify-between text-sm">
                          <span>{formatProjectType(type)}</span>
                          <span className="font-medium">{amount} tonnes</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${type === "forest_conservation" ? "bg-green-600" : type === "renewable_energy" ? "bg-amber-500" : "bg-blue-600"}`}
                            style={{
                              width: `${(amount / summary.totalCredits) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Credits content area */}
          <div className="flex-1">
            {/* Grid view */}
            {activeCreditsTab === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {credits.map((credit) => (
                  <div
                    key={credit.id}
                    className="rounded-lg border shadow-sm bg-card text-card-foreground overflow-hidden flex flex-col h-full"
                  >
                    <div className="aspect-video w-full relative overflow-hidden">
                      <div
                        className="w-full h-full flex justify-center items-center"
                        style={{ backgroundColor: credit.color }}
                      >
                        {getProjectIcon(credit.projectType)}
                      </div>

                      {credit.status === "listed" && (
                        <div className="absolute top-2 right-2">
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-600 text-white">
                            Listed for Sale
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                          {formatProjectType(credit.projectType)}
                        </span>
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                          {credit.standard}
                        </span>
                      </div>

                      <h3 className="font-semibold text-lg mb-1">
                        {credit.projectName}
                      </h3>

                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <MapPin className="h-3.5 w-3.5 mr-1 opacity-70" />
                        <span>
                          {credit.location.region}, {credit.location.country}
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <CalendarClock className="h-3.5 w-3.5 mr-1 opacity-70" />
                        <span>Vintage {credit.vintage}</span>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {credit.description}
                      </p>

                      <div className="mt-auto pt-2">
                        <div className="flex justify-between items-center mb-3">
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">
                              Quantity
                            </p>
                            <p className="font-medium">
                              {credit.quantity} tonnes
                            </p>
                          </div>
                          <div className="text-right space-y-1">
                            <p className="text-xs text-muted-foreground">
                              Value
                            </p>
                            <p className="font-medium">
                              {formatCurrency(credit.totalPrice)}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {credit.status === "listed" ? (
                            <button className="flex-1 inline-flex items-center justify-center rounded-md border border-input text-sm font-medium bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                              View Listing
                            </button>
                          ) : (
                            <button className="flex-1 inline-flex items-center justify-center rounded-md border border-input text-sm font-medium bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                              Create Listing
                            </button>
                          )}
                          <button className="flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
                            Retire
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Table view */}
            {activeCreditsTab === "table" && (
              <div className="rounded-lg border shadow-sm bg-card text-card-foreground">
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Project
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Type
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Standard
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Vintage
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Quantity
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Value
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Status
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {credits.map((credit) => (
                          <tr
                            key={credit.id}
                            className="border-b hover:bg-muted/50"
                          >
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-10 h-10 rounded flex items-center justify-center"
                                  style={{ backgroundColor: credit.color }}
                                >
                                  {getProjectIcon(credit.projectType)}
                                </div>
                                <span className="font-medium">
                                  {credit.projectName}
                                </span>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              {formatProjectType(credit.projectType)}
                            </td>
                            <td className="p-4 align-middle">
                              {credit.standard}
                            </td>
                            <td className="p-4 align-middle">
                              {credit.vintage}
                            </td>
                            <td className="p-4 align-middle">
                              {credit.quantity} tonnes
                            </td>
                            <td className="p-4 align-middle">
                              {formatCurrency(credit.totalPrice)}
                            </td>
                            <td className="p-4 align-middle">
                              <span
                                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${credit.status === "listed" ? "bg-blue-600 text-white" : ""}`}
                              >
                                {credit.status.charAt(0).toUpperCase() +
                                  credit.status.slice(1)}
                              </span>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex gap-2">
                                {credit.status === "listed" ? (
                                  <button className="inline-flex h-9 items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium bg-background hover:bg-accent hover:text-accent-foreground">
                                    View Listing
                                  </button>
                                ) : (
                                  <button className="inline-flex h-9 items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium bg-background hover:bg-accent hover:text-accent-foreground">
                                    List
                                  </button>
                                )}
                                <button className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">
                                  Retire
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Retirements Tab Content */}
      {activeTab === "retirements" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Retirement Certificates</h2>
            <div className="flex gap-2">
              <button className="inline-flex h-9 items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium bg-background hover:bg-accent hover:text-accent-foreground">
                <Download className="mr-2 h-4 w-4" /> Export
              </button>
              <button className="inline-flex h-9 items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium bg-background hover:bg-accent hover:text-accent-foreground">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {retirements.map((certificate) => (
              <div
                key={certificate.id}
                className="rounded-lg border shadow-sm bg-card text-card-foreground overflow-hidden"
              >
                <div className="flex border-b">
                  <div
                    className="w-16 h-16 flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: certificate.color }}
                  >
                    {getProjectIcon(certificate.projectType)}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">
                      Certificate #{certificate.certificateId}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                        {formatPurpose(certificate.purpose)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Project</p>
                      <p className="font-medium">{certificate.projectName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="font-medium">
                        {formatProjectType(certificate.projectType)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Standard</p>
                      <p className="font-medium">{certificate.standard}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Vintage</p>
                      <p className="font-medium">{certificate.vintage}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Quantity</p>
                      <p className="font-medium">
                        {certificate.quantity} tonnes
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Beneficiary
                      </p>
                      <p className="font-medium">{certificate.beneficiary}</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button className="inline-flex h-9 items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium bg-background hover:bg-accent hover:text-accent-foreground">
                      <Download className="mr-2 h-4 w-4" /> Download
                    </button>
                    <button className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">
                      View Certificate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state for when no credits or retirements exist */}
      {activeTab === "credits" && credits.length === 0 && (
        <div className="rounded-lg border shadow-sm bg-card text-card-foreground p-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-muted p-3">
              <Leaf className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mt-2">
              No carbon credits found
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-4">
              You don't have any active carbon credits in your portfolio.
              Purchase some from the marketplace to get started.
            </p>
            <button className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">
              Browse Marketplace
            </button>
          </div>
        </div>
      )}

      {activeTab === "retirements" && retirements.length === 0 && (
        <div className="rounded-lg border shadow-sm bg-card text-card-foreground p-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-muted p-3">
              <Leaf className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mt-2">
              No retired credits found
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-4">
              You haven't retired any carbon credits yet. Retire credits to
              offset your carbon footprint and receive a certificate.
            </p>
            <button className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">
              Retire Credits
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPortfolio;
