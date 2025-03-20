import React, { useState, useEffect } from "react";

const ImpactDashboard = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [impactData, setImpactData] = useState({
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
  const [selectedTimeRange, setSelectedTimeRange] = useState("all");
  const [selectedView, setSelectedView] = useState("overview");

  useEffect(() => {
    const fetchImpactData = async () => {
      try {
        // Mock data for impact dashboard
        const mockImpactData = {
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

  const handleTimeRangeChange = (range) => {
    setSelectedTimeRange(range);
    // In a real app, this would fetch new data based on the time range
  };

  const handleViewChange = (view) => {
    setSelectedView(view);
  };

  const handleShareReport = () => {
    alert(
      "In a real application, this would generate a shareable report of your carbon impact.",
    );
  };

  const handleDownloadCertificate = () => {
    alert(
      "In a real application, this would download a certificate summarizing your carbon impact.",
    );
  };

  if (loading) {
    return <div className="loading">Loading impact data...</div>;
  }

  return (
    <div className="impact-dashboard-container">
      <div className="page-header">
        <h1>Carbon Impact Dashboard</h1>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={handleShareReport}>
            <i className="fas fa-share-alt"></i> Share Report
          </button>
          <button
            className="btn btn-outline"
            onClick={handleDownloadCertificate}
          >
            <i className="fas fa-certificate"></i> Download Certificate
          </button>
        </div>
      </div>

      <div className="time-range-selector">
        <button
          className={`time-range-button ${selectedTimeRange === "month" ? "active" : ""}`}
          onClick={() => handleTimeRangeChange("month")}
        >
          This Month
        </button>
        <button
          className={`time-range-button ${selectedTimeRange === "year" ? "active" : ""}`}
          onClick={() => handleTimeRangeChange("year")}
        >
          This Year
        </button>
        <button
          className={`time-range-button ${selectedTimeRange === "all" ? "active" : ""}`}
          onClick={() => handleTimeRangeChange("all")}
        >
          All Time
        </button>
      </div>

      <div className="impact-summary">
        <div className="impact-card total-offset">
          <h3>Total Carbon Offset</h3>
          <div className="impact-value">
            <span className="value">{impactData.totalOffset}</span>
            <span className="unit">tonnes CO₂</span>
          </div>
          <p className="impact-equivalent">
            Equivalent to the average emissions of{" "}
            {Math.round(impactData.totalOffset * 0.21)} people per year
          </p>
        </div>

        <div className="impact-card trees">
          <h3>Trees Equivalent</h3>
          <div className="impact-value">
            <span className="value">{impactData.impact.trees}</span>
            <span className="unit">trees</span>
          </div>
          <p className="impact-equivalent">
            Equivalent to planting and growing {impactData.impact.trees} trees
            for 10 years
          </p>
        </div>

        <div className="impact-card renewable-energy">
          <h3>Renewable Energy</h3>
          <div className="impact-value">
            <span className="value">
              {(impactData.impact.renewableEnergy / 1000).toFixed(1)}
            </span>
            <span className="unit">MWh</span>
          </div>
          <p className="impact-equivalent">
            Equivalent to powering{" "}
            {Math.round(impactData.impact.renewableEnergy / 900)} homes for a
            month
          </p>
        </div>
      </div>

      <div className="impact-view-tabs">
        <button
          className={`view-tab ${selectedView === "overview" ? "active" : ""}`}
          onClick={() => handleViewChange("overview")}
        >
          Overview
        </button>
        <button
          className={`view-tab ${selectedView === "projects" ? "active" : ""}`}
          onClick={() => handleViewChange("projects")}
        >
          Projects
        </button>
        <button
          className={`view-tab ${selectedView === "sdg" ? "active" : ""}`}
          onClick={() => handleViewChange("sdg")}
        >
          SDG Impact
        </button>
      </div>

      <div className="impact-content">
        {selectedView === "overview" && (
          <div className="overview-content">
            <div className="impact-chart timeline-chart">
              <h3>Carbon Offset Timeline</h3>
              <div className="chart-placeholder">
                {/* In a real app, this would be a chart component */}
                <div className="mock-chart">
                  <div className="chart-bars">
                    {impactData.timeline.map((month, index) => (
                      <div key={index} className="chart-bar-container">
                        <div
                          className="chart-bar"
                          style={{
                            height: `${(month.amount / Math.max(...impactData.timeline.map((m) => m.amount))) * 100}%`,
                          }}
                        ></div>
                        <div className="chart-label">{month.month}</div>
                      </div>
                    ))}
                  </div>
                  <div className="chart-y-axis">
                    <div className="y-label">tonnes CO₂</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="impact-chart project-types-chart">
              <h3>Offset by Project Type</h3>
              <div className="chart-placeholder">
                {/* In a real app, this would be a chart component */}
                <div className="mock-pie-chart">
                  <div className="pie-segments">
                    {impactData.projectTypes.map((type, index) => (
                      <div
                        key={index}
                        className={`pie-segment ${type.type}`}
                        style={{
                          transform: `rotate(${index * 120}deg)`,
                          backgroundColor:
                            index === 0
                              ? "#4caf50"
                              : index === 1
                                ? "#2196f3"
                                : "#ff9800",
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="chart-legend">
                  {impactData.projectTypes.map((type, index) => (
                    <div key={index} className="legend-item">
                      <div
                        className="legend-color"
                        style={{
                          backgroundColor:
                            index === 0
                              ? "#4caf50"
                              : index === 1
                                ? "#2196f3"
                                : "#ff9800",
                        }}
                      ></div>
                      <div className="legend-label">{type.label}</div>
                      <div className="legend-value">{type.amount} tonnes</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === "projects" && (
          <div className="projects-content">
            <h3>Your Carbon Offset Projects</h3>
            <div className="projects-list">
              <div className="project-card">
                <div className="project-image">
                  <img
                    src="https://via.placeholder.com/300x200?text=Forest+Conservation"
                    alt="Forest Conservation"
                  />
                </div>
                <div className="project-details">
                  <h4>Sumatra Forest Conservation</h4>
                  <p className="project-type">Forest Conservation</p>
                  <p className="project-location">Sumatra, Indonesia</p>
                  <p className="project-description">
                    This project protects 15,000 hectares of rainforest in
                    Sumatra, preventing deforestation and preserving habitat for
                    endangered species such as the Sumatran tiger and orangutan.
                  </p>
                  <div className="project-impact">
                    <span className="impact-label">Your contribution:</span>
                    <span className="impact-value">15.2 tonnes CO₂</span>
                  </div>
                </div>
              </div>

              <div className="project-card">
                <div className="project-image">
                  <img
                    src="https://via.placeholder.com/300x200?text=Solar+Farm"
                    alt="Solar Farm"
                  />
                </div>
                <div className="project-details">
                  <h4>Java Solar Farm</h4>
                  <p className="project-type">Renewable Energy</p>
                  <p className="project-location">Java, Indonesia</p>
                  <p className="project-description">
                    This solar farm in Java generates clean electricity,
                    reducing dependence on fossil fuels and preventing carbon
                    emissions while providing jobs to the local community.
                  </p>
                  <div className="project-impact">
                    <span className="impact-label">Your contribution:</span>
                    <span className="impact-value">7.8 tonnes CO₂</span>
                  </div>
                </div>
              </div>

              <div className="project-card">
                <div className="project-image">
                  <img
                    src="https://via.placeholder.com/300x200?text=Mangrove+Restoration"
                    alt="Mangrove Restoration"
                  />
                </div>
                <div className="project-details">
                  <h4>Bali Mangrove Restoration</h4>
                  <p className="project-type">Blue Carbon</p>
                  <p className="project-location">Bali, Indonesia</p>
                  <p className="project-description">
                    This project restores mangrove ecosystems in Bali, enhancing
                    carbon sequestration, protecting coastlines from erosion,
                    and providing habitat for marine species.
                  </p>
                  <div className="project-impact">
                    <span className="impact-label">Your contribution:</span>
                    <span className="impact-value">2.4 tonnes CO₂</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === "sdg" && (
          <div className="sdg-content">
            <h3>Sustainable Development Goals Impact</h3>
            <p className="sdg-description">
              Your carbon offset contributions support multiple UN Sustainable
              Development Goals. Here's how your actions are making a
              difference:
            </p>

            <div className="sdg-grid">
              {impactData.sdgContributions.map((sdg, index) => (
                <div key={index} className={`sdg-card ${sdg.contribution}`}>
                  <div className="sdg-icon">
                    <img
                      src={`https://via.placeholder.com/80?text=SDG${sdg.sdg}`}
                      alt={`SDG ${sdg.sdg}`}
                    />
                  </div>
                  <div className="sdg-info">
                    <h4>
                      Goal {sdg.sdg}: {sdg.label}
                    </h4>
                    <div className={`contribution-meter ${sdg.contribution}`}>
                      <div className="meter-fill"></div>
                    </div>
                    <p className="contribution-label">
                      {sdg.contribution.charAt(0).toUpperCase() +
                        sdg.contribution.slice(1)}{" "}
                      Contribution
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="sdg-learn-more">
              <p>
                Want to learn more about how carbon offsetting supports the UN
                Sustainable Development Goals?
              </p>
              <a
                href="https://sdgs.un.org/goals"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Learn More About SDGs
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImpactDashboard;
