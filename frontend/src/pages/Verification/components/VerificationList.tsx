import React from 'react';
import { Verification } from '../types';

interface VerificationListProps {
  verifications: Verification[];
  selectedVerification: Verification | null;
  onSelectVerification: (verification: Verification) => void;
}

const VerificationList: React.FC<VerificationListProps> = ({
  verifications,
  selectedVerification,
  onSelectVerification,
}) => {
  return (
    <div className="verification-list">
      {verifications.length > 0 ? (
        verifications.map((verification) => (
          <div
            key={verification.id}
            className={`verification-item ${
              selectedVerification?.id === verification.id ? 'selected' : ''
            }`}
            onClick={() => onSelectVerification(verification)}
          >
            <div className="verification-item-header">
              <h3>{verification.projectName}</h3>
              <span className={`status-badge ${verification.status}`}>
                {verification.status}
              </span>
            </div>
            <div className="verification-item-details">
              <p>
                {verification.projectType.replace('_', ' ')} | {verification.standard}
              </p>
              <p>Vintage: {verification.vintage}</p>
              <p>
                Submitted: {new Date(verification.submittedAt).toLocaleDateString()}
              </p>
              {verification.completedAt && (
                <p>
                  Completed: {new Date(verification.completedAt).toLocaleDateString()}
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
          <p>No verifications found.</p>
        </div>
      )}
    </div>
  );
};

export default VerificationList;
