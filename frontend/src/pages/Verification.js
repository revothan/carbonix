import React, { useState, useEffect } from "react";

const Verification = ({ user }) => {
  const [activeTab, setActiveTab] = useState("pending");
  const [verifications, setVerifications] = useState({
    pending: [],
    completed: [],
    submitted: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedVerification, setSelectedVerification] = useState(null);
  const [voteValues, setVoteValues] = useState({
    vote: "approve",
    comment: "",
  });

  useEffect(() => {
    const fetchVerifications = async () => {
      try {
        // Mock data for pending verifications
        const mockPending = [
          {
            id: "ver-001",
            creditId: "credit-001",
            projectName: "Sumatra Forest Conservation",
            projectType: "forest_conservation",
            standard: "VCS",
            vintage: 2023,
            submittedAt: "2023-06-21T10:30:00Z",
            submittedBy: {
              name: "Rainforest Alliance",
              id: "verifier-001",
            },
            verificationData: {
              methodology: "VM0015",
              findings:
                "Project meets all requirements and has properly accounted for carbon sequestration.",
              score: 92,
            },
            algorithmicCheck: {
              potentialDuplicatesCount: 0,
              recommendation: "approve",
            },
            communityVotes: {
              approve: 8,
              reject: 2,
              flag: 1,
            },
            status: "pending",
          },
          {
            id: "ver-002",
            creditId: "credit-002",
            projectName: "Java Solar Farm",
            projectType: "renewable_energy",
            standard: "Gold Standard",
            vintage: 2022,
            submittedAt: "2023-06-18T14:15:00Z",
            submittedBy: {
              name: "Clean Energy Verifiers",
              id: "verifier-002",
            },
            verificationData: {
              methodology: "GS-RE-AM-01",
              findings:
                "Project has properly implemented renewable energy generation and calculated avoided emissions.",
              score: 88,
            },
            algorithmicCheck: {
              potentialDuplicatesCount: 0,
              recommendation: "approve",
            },
            communityVotes: {
              approve: 5,
              reject: 1,
              flag: 0,
            },
            status: "pending",
          },
        ];

        // Mock data for completed verifications
        const mockCompleted = [
          {
            id: "ver-003",
            creditId: "credit-003",
            projectName: "Bali Mangrove Restoration",
            projectType: "blue_carbon",
            standard: "VCS",
            vintage: 2023,
            submittedAt: "2023-06-10T09:45:00Z",
            completedAt: "2023-06-15T16:20:00Z",
            submittedBy: {
              name: "Blue Carbon Initiative",
              id: "verifier-003",
            },
            verifiedBy: {
              name: "Traditional Verifier Corp",
              id: "verifier-004",
            },
            verificationData: {
              methodology: "VM0033",
              findings:
                "Project has successfully restored mangrove ecosystems and carbon sequestration is properly accounted for.",
              score: 95,
            },
            communityVotes: {
              approve: 12,
              reject: 0,
              flag: 0,
            },
            status: "approved",
          },
        ];

        // Mock data for submitted verifications
        const mockSubmitted = [];

        // If user is a verifier, add some submitted verifications
        if (user.role === "verifier") {
          mockSubmitted.push({
            id: "ver-004",
            creditId: "credit-004",
            projectName: "Kalimantan Peatland Conservation",
            projectType: "peatland",
            standard: "VCS",
            vintage: 2023,
            submittedAt: "2023-06-22T11:10:00Z",
            verificationData: {
              methodology: "VM0007",
              findings:
                "Project effectively conserves peatland and prevents significant carbon emissions.",
              score: 90,
            },
            status: "pending",
          });
        }

        setVerifications({
          pending: mockPending,
          completed: mockCompleted,
          submitted: mockSubmitted,
        });
      } catch (error) {
        console.error("Error fetching verifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerifications();
  }, [user]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedVerification(null);
  };

  const handleSelectVerification = (verification) => {
    setSelectedVerification(verification);
    setVoteValues({
      vote: "approve",
      comment: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVoteValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVoteSubmit = async (e) => {
    e.preventDefault();

    if (!selectedVerification) return;

    try {
      // In a real app, this would call the blockchain service
      console.log(
        `Submitting vote for verification ${selectedVerification.id}:`,
        voteValues,
      );

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update local state to reflect the vote
      const updatedVerifications = { ...verifications };

      // Find the verification in the correct tab and update vote count
      const verificationIndex = updatedVerifications[activeTab].findIndex(
        (v) => v.id === selectedVerification.id,
      );

      if (verificationIndex !== -1) {
        const verification = {
          ...updatedVerifications[activeTab][verificationIndex],
        };
        verification.communityVotes = verification.communityVotes || {
          approve: 0,
          reject: 0,
          flag: 0,
        };
        verification.communityVotes[voteValues.vote]++;

        // Update in the array
        updatedVerifications[activeTab][verificationIndex] = verification;
        setVerifications(updatedVerifications);

        // Update selected verification
        setSelectedVerification(verification);
      }

      // Show success message
      alert("Vote submitted successfully!");

      // Clear comment
      setVoteValues((prev) => ({
        ...prev,
        comment: "",
      }));
    } catch (error) {
      console.error("Error submitting vote:", error);
      alert("Error submitting vote. Please try again.");
    }
  };

  if (loading) {
    return <div className="loading">Loading verification data...</div>;
  }

  return (
    <div className="verification-container">
      <div className="page-header">
        <h1>Carbon Credit Verification</h1>
        <p>
          Participate in the multi-level verification system for carbon credits
        </p>
      </div>

      <div className="verification-tabs">
        <button
          className={`tab-button ${activeTab === "pending" ? "active" : ""}`}
          onClick={() => handleTabChange("pending")}
        >
          Pending Verification ({verifications.pending.length})
        </button>
        <button
          className={`tab-button ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => handleTabChange("completed")}
        >
          Completed ({verifications.completed.length})
        </button>
        {user.role === "verifier" && (
          <button
            className={`tab-button ${activeTab === "submitted" ? "active" : ""}`}
            onClick={() => handleTabChange("submitted")}
          >
            My Submissions ({verifications.submitted.length})
          </button>
        )}
      </div>

      <div className="verification-content">
        <div className="verification-list">
          {verifications[activeTab].length > 0 ? (
            verifications[activeTab].map((verification) => (
              <div
                key={verification.id}
                className={`verification-item ${selectedVerification?.id === verification.id ? "selected" : ""}`}
                onClick={() => handleSelectVerification(verification)}
              >
                <div className="verification-item-header">
                  <h3>{verification.projectName}</h3>
                  <span className={`status-badge ${verification.status}`}>
                    {verification.status}
                  </span>
                </div>
                <div className="verification-item-details">
                  <p>
                    {verification.projectType.replace("_", " ")} |{" "}
                    {verification.standard}
                  </p>
                  <p>Vintage: {verification.vintage}</p>
                  <p>
                    Submitted:{" "}
                    {new Date(verification.submittedAt).toLocaleDateString()}
                  </p>
                  {verification.completedAt && (
                    <p>
                      Completed:{" "}
                      {new Date(verification.completedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="verification-item-votes">
                  <div className="vote-count approve">
                    <i className="fas fa-thumbs-up"></i>
                    <span>{verification.communityVotes?.approve || 0}</span>
                  </div>
                  <div className="vote-count reject">
                    <i className="fas fa-thumbs-down"></i>
                    <span>{verification.communityVotes?.reject || 0}</span>
                  </div>
                  <div className="vote-count flag">
                    <i className="fas fa-flag"></i>
                    <span>{verification.communityVotes?.flag || 0}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-verifications">
              <p>No {activeTab} verifications found.</p>
            </div>
          )}
        </div>

        <div className="verification-details">
          {selectedVerification ? (
            <div className="verification-detail-content">
              <h2>{selectedVerification.projectName}</h2>
              <div className="verification-badges">
                <span className="badge project-type">
                  {selectedVerification.projectType.replace("_", " ")}
                </span>
                <span className="badge standard">
                  {selectedVerification.standard}
                </span>
                <span className="badge vintage">
                  Vintage {selectedVerification.vintage}
                </span>
                <span className={`badge status ${selectedVerification.status}`}>
                  {selectedVerification.status}
                </span>
              </div>

              <div className="verification-section">
                <h3>Verification Information</h3>
                <p>
                  <strong>Submitted by:</strong>{" "}
                  {selectedVerification.submittedBy?.name}
                </p>
                <p>
                  <strong>Submission date:</strong>{" "}
                  {new Date(selectedVerification.submittedAt).toLocaleString()}
                </p>
                {selectedVerification.completedAt && (
                  <p>
                    <strong>Completion date:</strong>{" "}
                    {new Date(
                      selectedVerification.completedAt,
                    ).toLocaleString()}
                  </p>
                )}
                {selectedVerification.verifiedBy && (
                  <p>
                    <strong>Verified by:</strong>{" "}
                    {selectedVerification.verifiedBy.name}
                  </p>
                )}
              </div>

              <div className="verification-section">
                <h3>Verification Data</h3>
                <p>
                  <strong>Methodology:</strong>{" "}
                  {selectedVerification.verificationData.methodology}
                </p>
                <p>
                  <strong>Findings:</strong>{" "}
                  {selectedVerification.verificationData.findings}
                </p>
                <div className="verification-score">
                  <span className="score-label">Verification Score:</span>
                  <div className="score-meter">
                    <div
                      className="score-fill"
                      style={{
                        width: `${selectedVerification.verificationData.score}%`,
                      }}
                    ></div>
                  </div>
                  <span className="score-value">
                    {selectedVerification.verificationData.score}/100
                  </span>
                </div>
              </div>

              {selectedVerification.algorithmicCheck && (
                <div className="verification-section">
                  <h3>Algorithmic Check</h3>
                  <p>
                    <strong>Potential duplicates found:</strong>{" "}
                    {
                      selectedVerification.algorithmicCheck
                        .potentialDuplicatesCount
                    }
                  </p>
                  <p>
                    <strong>Recommendation:</strong>{" "}
                    {selectedVerification.algorithmicCheck.recommendation}
                  </p>
                </div>
              )}

              <div className="verification-section">
                <h3>Community Verification</h3>
                <div className="community-votes">
                  <div className="vote-stat approve">
                    <i className="fas fa-thumbs-up"></i>
                    <span className="vote-count">
                      {selectedVerification.communityVotes?.approve || 0}
                    </span>
                    <span className="vote-label">Approvals</span>
                  </div>
                  <div className="vote-stat reject">
                    <i className="fas fa-thumbs-down"></i>
                    <span className="vote-count">
                      {selectedVerification.communityVotes?.reject || 0}
                    </span>
                    <span className="vote-label">Rejections</span>
                  </div>
                  <div className="vote-stat flag">
                    <i className="fas fa-flag"></i>
                    <span className="vote-count">
                      {selectedVerification.communityVotes?.flag || 0}
                    </span>
                    <span className="vote-label">Flags</span>
                  </div>
                </div>
              </div>

              {activeTab === "pending" && (
                <div className="verification-section">
                  <h3>Submit Your Vote</h3>
                  <form onSubmit={handleVoteSubmit} className="vote-form">
                    <div className="form-group">
                      <label>Your Vote:</label>
                      <div className="vote-options">
                        <label className="vote-option">
                          <input
                            type="radio"
                            name="vote"
                            value="approve"
                            checked={voteValues.vote === "approve"}
                            onChange={handleInputChange}
                          />
                          <span className="vote-option-label approve">
                            <i className="fas fa-thumbs-up"></i> Approve
                          </span>
                        </label>
                        <label className="vote-option">
                          <input
                            type="radio"
                            name="vote"
                            value="reject"
                            checked={voteValues.vote === "reject"}
                            onChange={handleInputChange}
                          />
                          <span className="vote-option-label reject">
                            <i className="fas fa-thumbs-down"></i> Reject
                          </span>
                        </label>
                        <label className="vote-option">
                          <input
                            type="radio"
                            name="vote"
                            value="flag"
                            checked={voteValues.vote === "flag"}
                            onChange={handleInputChange}
                          />
                          <span className="vote-option-label flag">
                            <i className="fas fa-flag"></i> Flag for Review
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="comment">Comment (Optional):</label>
                      <textarea
                        id="comment"
                        name="comment"
                        value={voteValues.comment}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Add a comment to support your vote..."
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Submit Vote
                    </button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <div className="no-verification-selected">
              <p>Select a verification from the list to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verification;
