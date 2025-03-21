import React from 'react';
import { Verifications, User } from '../types';

interface VerificationTabsProps {
  activeTab: string;
  verifications: Verifications;
  user: User;
  onTabChange: (tab: string) => void;
}

const VerificationTabs: React.FC<VerificationTabsProps> = ({
  activeTab,
  verifications,
  user,
  onTabChange,
}) => {
  return (
    <div className="verification-tabs">
      <button
        className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
        onClick={() => onTabChange('pending')}
      >
        Pending Verification ({verifications.pending.length})
      </button>
      <button
        className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
        onClick={() => onTabChange('completed')}
      >
        Completed ({verifications.completed.length})
      </button>
      {user.role === 'verifier' && (
        <button
          className={`tab-button ${activeTab === 'submitted' ? 'active' : ''}`}
          onClick={() => onTabChange('submitted')}
        >
          My Submissions ({verifications.submitted.length})
        </button>
      )}
    </div>
  );
};

export default VerificationTabs;
