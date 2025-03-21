import React, { useState, useEffect } from 'react';

// Components
import {
  VerificationTabs,
  VerificationList,
  VerificationDetails,
} from './components';

// Types
import {
  Verification,
  Verifications,
  VoteValues,
  VerificationProps,
} from './types';

const VerificationPage: React.FC<VerificationProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<string>('pending');
  const [verifications, setVerifications] = useState<Verifications>({
    pending: [],
    completed: [],
    submitted: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedVerification, setSelectedVerification] = useState<Verification | null>(null);
  const [voteValues, setVoteValues] = useState<VoteValues>({
    vote: 'approve',
    comment: '',
  });

  useEffect(() => {
    const fetchVerifications = async () => {
      try {
        // Mock data for pending verifications
        const mockPending: Verification[] = [
          {
            id: 'ver-001',
            creditId: 'credit-001',
            projectName: 'Sumatra Forest Conservation',
            projectType: 'forest_conservation',
            standard: 'VCS',
            vintage: 2023,
            submittedAt: '2023-06-21T10:30:00Z',
            submittedBy: {
              name: 'Rainforest Alliance',
              id: 'verifier-001',
            },
            verificationData: {
              methodology: 'VM0015',
              findings:
                'Project meets all requirements and has properly accounted for carbon sequestration.',
              score: 92,
            },
            algorithmicCheck: {
              potentialDuplicatesCount: 0,
              recommendation: 'approve',
            },
            communityVotes: {
              approve: 8,
              reject: 2,
              flag: 1,
            },
            status: 'pending',
          },
          {
            id: 'ver-002',
            creditId: 'credit-002',
            projectName: 'Java Solar Farm',
            projectType: 'renewable_energy',
            standard: 'Gold Standard',
            vintage: 2022,
            submittedAt: '2023-06-18T14:15:00Z',
            submittedBy: {
              name: 'Clean Energy Verifiers',
              id: 'verifier-002',
            },
            verificationData: {
              methodology: 'GS-RE-AM-01',
              findings:
                'Project has properly implemented renewable energy generation and calculated avoided emissions.',
              score: 88,
            },
            algorithmicCheck: {
              potentialDuplicatesCount: 0,
              recommendation: 'approve',
            },
            communityVotes: {
              approve: 5,
              reject: 1,
              flag: 0,
            },
            status: 'pending',
          },
        ];

        // Mock data for completed verifications
        const mockCompleted: Verification[] = [
          {
            id: 'ver-003',
            creditId: 'credit-003',
            projectName: 'Bali Mangrove Restoration',
            projectType: 'blue_carbon',
            standard: 'VCS',
            vintage: 2023,
            submittedAt: '2023-06-10T09:45:00Z',
            completedAt: '2023-06-15T16:20:00Z',
            submittedBy: {
              name: 'Blue Carbon Initiative',
              id: 'verifier-003',
            },
            verifiedBy: {
              name: 'Traditional Verifier Corp',
              id: 'verifier-004',
            },
            verificationData: {
              methodology: 'VM0033',
              findings:
                'Project has successfully restored mangrove ecosystems and carbon sequestration is properly accounted for.',
              score: 95,
            },
            communityVotes: {
              approve: 12,
              reject: 0,
              flag: 0,
            },
            status: 'approved',
          },
        ];

        // Mock data for submitted verifications
        const mockSubmitted: Verification[] = [];

        // If user is a verifier, add some submitted verifications
        if (user.role === 'verifier') {
          mockSubmitted.push({
            id: 'ver-004',
            creditId: 'credit-004',
            projectName: 'Kalimantan Peatland Conservation',
            projectType: 'peatland',
            standard: 'VCS',
            vintage: 2023,
            submittedAt: '2023-06-22T11:10:00Z',
            verificationData: {
              methodology: 'VM0007',
              findings:
                'Project effectively conserves peatland and prevents significant carbon emissions.',
              score: 90,
            },
            status: 'pending',
          });
        }

        setVerifications({
          pending: mockPending,
          completed: mockCompleted,
          submitted: mockSubmitted,
        });
      } catch (error) {
        console.error('Error fetching verifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerifications();
  }, [user]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedVerification(null);
  };

  const handleSelectVerification = (verification: Verification) => {
    setSelectedVerification(verification);
    setVoteValues({
      vote: 'approve',
      comment: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVoteValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVoteSubmit = async (e: React.FormEvent) => {
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
      const verificationIndex = updatedVerifications[activeTab as keyof Verifications].findIndex(
        (v) => v.id === selectedVerification.id,
      );

      if (verificationIndex !== -1) {
        const verification = {
          ...updatedVerifications[activeTab as keyof Verifications][verificationIndex],
        };
        verification.communityVotes = verification.communityVotes || {
          approve: 0,
          reject: 0,
          flag: 0,
        };
        verification.communityVotes[voteValues.vote]++;

        // Update in the array
        updatedVerifications[activeTab as keyof Verifications][verificationIndex] = verification;
        setVerifications(updatedVerifications);

        // Update selected verification
        setSelectedVerification(verification);
      }

      // Show success message
      alert('Vote submitted successfully!');

      // Clear comment
      setVoteValues((prev) => ({
        ...prev,
        comment: '',
      }));
    } catch (error) {
      console.error('Error submitting vote:', error);
      alert('Error submitting vote. Please try again.');
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

      <VerificationTabs
        activeTab={activeTab}
        verifications={verifications}
        user={user}
        onTabChange={handleTabChange}
      />

      <div className="verification-content">
        <VerificationList
          verifications={verifications[activeTab as keyof Verifications]}
          selectedVerification={selectedVerification}
          onSelectVerification={handleSelectVerification}
        />

        <VerificationDetails
          selectedVerification={selectedVerification}
          activeTab={activeTab}
          voteValues={voteValues}
          handleInputChange={handleInputChange}
          handleVoteSubmit={handleVoteSubmit}
        />
      </div>
    </div>
  );
};

export default VerificationPage;
