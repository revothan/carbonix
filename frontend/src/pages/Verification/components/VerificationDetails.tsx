import React from 'react';
import { Verification, VoteValues } from '../types';

interface VerificationDetailsProps {
  selectedVerification: Verification | null;
  activeTab: string;
  voteValues: VoteValues;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleVoteSubmit: (e: React.FormEvent) => void;
}

const VerificationDetails: React.FC<VerificationDetailsProps> = ({
  selectedVerification,
  activeTab,
  voteValues,
  handleInputChange,
  handleVoteSubmit,
}) => {
  if (!selectedVerification) {
    return (
      <div className="verification-details">
        <div className="no-verification-selected">
          <p>Select a verification from the list to view details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="verification-details">
      <div className="verification-detail-content">
        <h2>{selectedVerification.projectName}</h2>
        <div className="verification-badges">
          <span className="badge project-type">
            {selectedVerification.projectType.replace('_', ' ')}
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
            <strong>Submitted by:</strong>{' '}
            {selectedVerification.submittedBy?.name}
          </p>
          <p>
            <strong>Submission date:</strong>{' '}
            {new Date(selectedVerification.submittedAt).toLocaleString()}
          </p>
          {selectedVerification.completedAt && (
            <p>
              <strong>Completion date:</strong>{' '}
              {new Date(selectedVerification.completedAt).toLocaleString()}
            </p>
          )}
          {selectedVerification.verifiedBy && (
            <p>
              <strong>Verified by:</strong> {selectedVerification.verifiedBy.name}
            </p>
          )}
        </div>

        <div className="verification-section">
          <h3>Verification Data</h3>
          <p>
            <strong>Methodology:</strong>{' '}
            {selectedVerification.verificationData.methodology}
          </p>
          <p>
            <strong>Findings:</strong>{' '}
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
              <strong>Potential duplicates found:</strong>{' '}
              {selectedVerification.algorithmicCheck.potentialDuplicatesCount}
            </p>
            <p>
              <strong>Recommendation:</strong>{' '}
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

        {activeTab === 'pending' && (
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
                      checked={voteValues.vote === 'approve'}
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
                      checked={voteValues.vote === 'reject'}
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
                      checked={voteValues.vote === 'flag'}
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
                  rows={3}
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
    </div>
  );
};

export default VerificationDetails;
