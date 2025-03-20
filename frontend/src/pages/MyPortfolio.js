import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MyPortfolio = ({ user }) => {
  const [credits, setCredits] = useState([]);
  const [retirements, setRetirements] = useState([]);
  const [activeTab, setActiveTab] = useState("credits");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        // Mock data
        const mockCredits = [
          {
            id: "credit-001",
            projectName: "Sumatra Forest Conservation",
            projectType: "forest_conservation",
            standard: "VCS",
            vintage: 2023,
            quantity: 25,
            purchaseDate: "2023-06-15T00:00:00Z",
            pricePerUnit: 15000,
            totalPrice: 375000,
            status: "active",
            imageUrl: "https://via.placeholder.com/100?text=Forest",
          },
          {
            id: "credit-002",
            projectName: "Java Solar Farm",
            projectType: "renewable_energy",
            standard: "Gold Standard",
            vintage: 2022,
            quantity: 10,
            purchaseDate: "2023-05-20T00:00:00Z",
            pricePerUnit: 12000,
            totalPrice: 120000,
            status: "active",
            imageUrl: "https://via.placeholder.com/100?text=Solar",
          },
        ];

        const mockRetirements = [
          {
            id: "ret-001",
            creditId: "credit-003",
            projectName: "Bali Mangrove Restoration",
            projectType: "blue_carbon",
            standard: "VCS",
            vintage: 2023,
            quantity: 5,
            retirementDate: "2023-06-10T00:00:00Z",
            beneficiary: "My Company Inc.",
            purpose: "carbon_neutral_company",
            certificateId: "cert-001",
            imageUrl: "https://via.placeholder.com/100?text=Mangrove",
          },
        ];

        setCredits(mockCredits);
        setRetirements(mockRetirements);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading) {
    return <div className="loading">Loading portfolio data...</div>;
  }

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <h1>My Carbon Portfolio</h1>
        <div className="portfolio-actions">
          <Link to="/create-listing" className="btn btn-primary">
            Create Listing
          </Link>
          <Link to="/retire" className="btn btn-accent">
            Retire Credits
          </Link>
        </div>
      </div>

      <div className="portfolio-tabs">
        <button
          className={`tab-button ${activeTab === "credits" ? "active" : ""}`}
          onClick={() => setActiveTab("credits")}
        >
          Active Credits ({credits.length})
        </button>
        <button
          className={`tab-button ${activeTab === "retirements" ? "active" : ""}`}
          onClick={() => setActiveTab("retirements")}
        >
          Retired Credits ({retirements.length})
        </button>
      </div>

      <div className="portfolio-content">
        {activeTab === "credits" ? (
          <div className="credits-table">
            <table>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Type</th>
                  <th>Standard</th>
                  <th>Vintage</th>
                  <th>Quantity</th>
                  <th>Purchase Date</th>
                  <th>Total Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {credits.length > 0 ? (
                  credits.map((credit) => (
                    <tr key={credit.id}>
                      <td className="project-cell">
                        <img
                          src={credit.imageUrl}
                          alt={credit.projectName}
                          className="project-thumbnail"
                        />
                        <span>{credit.projectName}</span>
                      </td>
                      <td>{credit.projectType.replace("_", " ")}</td>
                      <td>{credit.standard}</td>
                      <td>{credit.vintage}</td>
                      <td>{credit.quantity} tonnes</td>
                      <td>
                        {new Date(credit.purchaseDate).toLocaleDateString()}
                      </td>
                      <td>Rp {credit.totalPrice.toLocaleString()}</td>
                      <td className="actions-cell">
                        <Link
                          to={`/create-listing?creditId=${credit.id}`}
                          className="btn-small"
                        >
                          List
                        </Link>
                        <Link
                          to={`/retire?creditId=${credit.id}`}
                          className="btn-small"
                        >
                          Retire
                        </Link>
                        <Link
                          to={`/credits/${credit.id}`}
                          className="btn-small"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">
                      You don't have any active carbon credits. Purchase some
                      from the marketplace!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="retirements-table">
            <table>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Type</th>
                  <th>Standard</th>
                  <th>Vintage</th>
                  <th>Quantity</th>
                  <th>Retirement Date</th>
                  <th>Beneficiary</th>
                  <th>Certificate</th>
                </tr>
              </thead>
              <tbody>
                {retirements.length > 0 ? (
                  retirements.map((retirement) => (
                    <tr key={retirement.id}>
                      <td className="project-cell">
                        <img
                          src={retirement.imageUrl}
                          alt={retirement.projectName}
                          className="project-thumbnail"
                        />
                        <span>{retirement.projectName}</span>
                      </td>
                      <td>{retirement.projectType.replace("_", " ")}</td>
                      <td>{retirement.standard}</td>
                      <td>{retirement.vintage}</td>
                      <td>{retirement.quantity} tonnes</td>
                      <td>
                        {new Date(
                          retirement.retirementDate,
                        ).toLocaleDateString()}
                      </td>
                      <td>{retirement.beneficiary}</td>
                      <td>
                        <Link
                          to={`/certificates/${retirement.certificateId}`}
                          className="btn-small"
                        >
                          View Certificate
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">
                      You haven't retired any carbon credits yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPortfolio;
