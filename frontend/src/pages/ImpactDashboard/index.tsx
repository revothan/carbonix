import React, { useState, useEffect } from "react";

// Import types
import { ImpactData, TimeRange, ViewType, UserProps } from './types';

// Import components
import {
  DashboardHeader,
  TimeRangeSelector,
  ImpactSummary,
  ViewTabs,
  OverviewContent,
  ProjectsContent,
  SDGContent
} from './components';

interface ImpactDashboardProps {
  user: UserProps;
}

const ImpactDashboard: React.FC<ImpactDashboardProps> = ({ user }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [impactData, setImpactData] = useState<ImpactData>({
    totalOffset: 0,
    projectTypes: [],
    timeline: [],
    impact: {
      trees: 0,
      renewableEnergy: 0,
      carbonSequestered: 0,
    },
    sdgContributions: [],
  });
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>("all");
  const [selectedView, setSelectedView] = useState<ViewType>("overview");

  useEffect(() => {
    const fetchImpactData = async () => {
      try {
        // Mock data for impact dashboard
        const mockImpactData: ImpactData = {
          totalOffset: 25.4, // tonnes of CO2
          projectTypes: [
            {
              type: "forest_conservation",
              label: "Forest Conservation",
              amount: 15.2,
            },
            {
              type: "renewable_energy",
              label: "Renewable Energy",
              amount: 7.8,
            },
            { type: "blue_carbon", label: "Blue Carbon", amount: 2.4 },
          ],
          timeline: [
            { month: "Jan", amount: 0 },
            { month: "Feb", amount: 0 },
            { month: "Mar", amount: 5.2 },
            { month: "Apr", amount: 3.8 },
            { month: "May", amount: 6.7 },
            { month: "Jun", amount: 9.7 },
          ],
          impact: {
            trees: 254, // equivalent number of trees planted
            renewableEnergy: 7800, // kWh of renewable energy generated
            carbonSequestered: 25400, // kg of carbon sequestered
          },
          sdgContributions: [
            { sdg: 13, label: "Climate Action", contribution: "high" },
            { sdg: 15, label: "Life on Land", contribution: "high" },
            { sdg: 14, label: "Life Below Water", contribution: "medium" },
            {
              sdg: 7,
              label: "Affordable and Clean Energy",
              contribution: "medium",
            },
            {
              sdg: 11,
              label: "Sustainable Cities and Communities",
              contribution: "low",
            },
          ],
        };

        setImpactData(mockImpactData);
      } catch (error) {
        console.error("Error fetching impact data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImpactData();
  }, []);

  const handleTimeRangeChange = (range: TimeRange) => {
    setSelectedTimeRange(range);
    // In a real app, this would fetch new data based on the time range
  };

  const handleViewChange = (view: ViewType) => {
    setSelectedView(view);
  };

  const handleShareReport = () => {
    alert(
      "In a real application, this would generate a shareable report of your carbon impact."
    );
  };

  const handleDownloadCertificate = () => {
    alert(
      "In a real application, this would download a certificate summarizing your carbon impact."
    );
  };

  if (loading) {
    return <div className="loading">Loading impact data...</div>;
  }

  return (
    <div className="impact-dashboard-container">
      <DashboardHeader 
        onShareReport={handleShareReport}
        onDownloadCertificate={handleDownloadCertificate}
      />

      <TimeRangeSelector 
        selectedTimeRange={selectedTimeRange}
        onTimeRangeChange={handleTimeRangeChange}
      />

      <ImpactSummary 
        totalOffset={impactData.totalOffset}
        impact={impactData.impact}
      />

      <ViewTabs 
        selectedView={selectedView}
        onViewChange={handleViewChange}
      />

      <div className="impact-content">
        {selectedView === "overview" && (
          <OverviewContent 
            timeline={impactData.timeline}
            projectTypes={impactData.projectTypes}
          />
        )}

        {selectedView === "projects" && <ProjectsContent />}

        {selectedView === "sdg" && (
          <SDGContent sdgContributions={impactData.sdgContributions} />
        )}
      </div>
    </div>
  );
};

export default ImpactDashboard;