/**
 * Verification Contract
 * 
 * Manages the multi-tiered validation system for carbon credits,
 * combining traditional verification bodies, community validation, 
 * and algorithmic checks.
 * 
 * @module contracts/verification
 */

const { BaseAsset } = require('@liskhq/lisk-transactions');
const { getAddressFromPublicKey } = require('@liskhq/lisk-cryptography');

/**
 * Carbon Credit Verification Contract
 * 
 * Responsibilities:
 * - Managing approved verifiers
 * - Processing verification applications
 * - Handling community validation votes
 * - Maintaining verification history
 * - Preventing double counting
 */
class VerificationContract extends BaseAsset {
  constructor() {
    super();
    this.name = 'verification';
    this.schema = {
      $id: 'carbonix/verification-contract/1.0.0',
      type: 'object',
      required: ['action', 'data'],
      properties: {
        action: {
          type: 'string',
          enum: ['addVerifier', 'removeVerifier', 'submitVerification', 'approveVerification', 'rejectVerification', 'submitCommunityVote']
        },
        data: {
          type: 'object',
          properties: {
            // For addVerifier/removeVerifier
            verifierAddress: {
              type: 'string',
            },
            verifierName: {
              type: 'string',
            },
            verifierType: {
              type: 'string',
              enum: ['traditional', 'community', 'algorithmic']
            },
            credentials: {
              type: 'object',
            },
            // For submitVerification
            creditId: {
              type: 'string',
            },
            verificationData: {
              type: 'object',
              properties: {
                methodology: { type: 'string' },
                findings: { type: 'string' },
                evidenceHash: { type: 'string' },
                score: { 
                  type: 'integer',
                  minimum: 0,
                  maximum: 100
                },
                additionalData: { type: 'object' }
              }
            },
            // For approval/rejection
            verificationId: {
              type: 'string',
            },
            reason: {
              type: 'string',
            },
            // For community vote
            vote: {
              type: 'string',
              enum: ['approve', 'reject', 'flag']
            },
            comment: {
              type: 'string',
            }
          }
        }
      }
    };
  }

  /**
   * Validates if the transaction is properly formed
   * @param {Object} transaction - Transaction object
   * @returns {boolean}
   */
  validate({ asset }) {
    const { action, data } = asset;
    
    switch(action) {
      case 'addVerifier':
      case 'removeVerifier':
        // Validate verifier data
        if (!data.verifierAddress) {
          return false;
        }
        break;
      case 'submitVerification':
        // Validate verification submission
        if (!data.creditId || !data.verificationData) {
          return false;
        }
        break;
      case 'approveVerification':
      case 'rejectVerification':
        // Validate approval/rejection
        if (!data.verificationId) {
          return false;
        }
        break;
      case 'submitCommunityVote':
        // Validate community vote
        if (!data.verificationId || !data.vote) {
          return false;
        }
        break;
      default:
        return false;
    }
    
    return true;
  }

  /**
   * Applies the transaction to the blockchain state
   * @param {Object} transaction - Transaction object
   * @param {Object} store - State store
   * @returns {void}
   */
  async apply({ asset, sender }, context) {
    const { action, data } = asset;
    
    switch(action) {
      case 'addVerifier':
        await this._addVerifier(data, sender, context);
        break;
      case 'removeVerifier':
        await this._removeVerifier(data, sender, context);
        break;
      case 'submitVerification':
        await this._submitVerification(data, sender, context);
        break;
      case 'approveVerification':
        await this._approveVerification(data, sender, context);
        break;
      case 'rejectVerification':
        await this._rejectVerification(data, sender, context);
        break;
      case 'submitCommunityVote':
        await this._submitCommunityVote(data, sender, context);
        break;
    }
  }

  /**
   * Add a new authorized verifier
   * @private
   */
  async _addVerifier(data, sender, context) {
    const { verifierAddress, verifierName, verifierType, credentials } = data;
    
    // Check if sender is authorized to add verifiers (governance role)
    const governanceStore = context.store.get('governance') || {};
    const admins = governanceStore.admins || [];
    
    if (!admins.includes(sender.address)) {
      throw new Error('Not authorized to add verifiers');
    }
    
    // Create verifier entry
    const verifier = {
      address: verifierAddress,
      name: verifierName,
      type: verifierType,
      credentials,
      status: 'active',
      createdAt: Date.now(),
      addedBy: sender.address,
      verificationCount: 0
    };
    
    // Add to verifiers store
    const verifiersStore = context.store.get('verifiers') || [];
    
    // Check for duplicates
    if (verifiersStore.some(v => v.address === verifierAddress)) {
      throw new Error('Verifier already exists');
    }
    
    verifiersStore.push(verifier);
    context.store.set('verifiers', verifiersStore);
    
    // Log the action
    const activityLogStore = context.store.get('activityLog') || [];
    activityLogStore.push({
      type: 'verifier_added',
      timestamp: Date.now(),
      data: {
        verifierAddress,
        verifierName,
        verifierType,
        addedBy: sender.address
      }
    });
    
    context.store.set('activityLog', activityLogStore);
  }

  /**
   * Remove an existing verifier
   * @private
   */
  async _removeVerifier(data, sender, context) {
    const { verifierAddress } = data;
    
    // Check if sender is authorized
    const governanceStore = context.store.get('governance') || {};
    const admins = governanceStore.admins || [];
    
    if (!admins.includes(sender.address)) {
      throw new Error('Not authorized to remove verifiers');
    }
    
    // Find and update verifier
    const verifiersStore = context.store.get('verifiers') || [];
    const verifierIndex = verifiersStore.findIndex(v => v.address === verifierAddress);
    
    if (verifierIndex === -1) {
      throw new Error('Verifier not found');
    }
    
    const verifier = verifiersStore[verifierIndex];
    verifier.status = 'inactive';
    verifier.updatedAt = Date.now();
    verifier.deactivatedBy = sender.address;
    
    verifiersStore[verifierIndex] = verifier;
    context.store.set('verifiers', verifiersStore);
    
    // Log the action
    const activityLogStore = context.store.get('activityLog') || [];
    activityLogStore.push({
      type: 'verifier_removed',
      timestamp: Date.now(),
      data: {
        verifierAddress,
        verifierName: verifier.name,
        removedBy: sender.address
      }
    });
    
    context.store.set('activityLog', activityLogStore);
  }

  /**
   * Submit a verification for a carbon credit
   * @private
   */
  async _submitVerification(data, sender, context) {
    const { creditId, verificationData } = data;
    
    // Check if sender is an authorized verifier
    const verifiersStore = context.store.get('verifiers') || [];
    const verifier = verifiersStore.find(v => v.address === sender.address);
    
    if (!verifier || verifier.status !== 'active') {
      throw new Error('Not an authorized verifier');
    }
    
    // Check if the credit exists
    const carbonCreditsStore = context.store.get('carbonCredits') || [];
    const credit = carbonCreditsStore.find(c => c.id === creditId);
    
    if (!credit) {
      throw new Error('Carbon credit not found');
    }
    
    // Create verification entry
    const verificationId = `ver-${creditId}-${Date.now()}`;
    const verification = {
      id: verificationId,
      creditId,
      verifier: {
        address: sender.address,
        name: verifier.name,
        type: verifier.type
      },
      data: verificationData,
      status: 'pending',
      communityVotes: {
        approve: 0,
        reject: 0,
        flag: 0,
        voters: []
      },
      createdAt: Date.now(),
      history: [{
        action: 'submission',
        timestamp: Date.now(),
        actor: sender.address
      }]
    };
    
    // Add to verifications store
    const verificationsStore = context.store.get('verifications') || [];
    verificationsStore.push(verification);
    context.store.set('verifications', verificationsStore);
    
    // Update verifier stats
    verifier.verificationCount++;
    context.store.set('verifiers', verifiersStore);
    
    // Update credit verification status
    credit.verificationStatus = 'in_process';
    credit.currentVerificationId = verificationId;
    context.store.set('carbonCredits', carbonCreditsStore);
    
    // Check for algorithmic verification if needed
    if (verifier.type === 'traditional' || verifier.type === 'community') {
      await this._performAlgorithmicVerification(verification, context);
    }
  }

  /**
   * Perform automated algorithmic verification
   * @private
   */
  async _performAlgorithmicVerification(verification, context) {
    // In a real implementation, this would perform various checks
    // For this example we'll simulate a basic check
    
    const { creditId } = verification;
    
    // Check for double counting
    const carbonCreditsStore = context.store.get('carbonCredits') || [];
    const credit = carbonCreditsStore.find(c => c.id === creditId);
    
    if (!credit) {
      return;
    }
    
    const allCredits = carbonCreditsStore.filter(c => 
      c.id !== creditId && 
      c.metadata && 
      c.metadata.location && 
      credit.metadata && 
      credit.metadata.location
    );
    
    let potentialDuplicates = [];
    
    // Simple check for geographic overlap
    if (credit.metadata.location.coordinates) {
      const { latitude, longitude } = credit.metadata.location.coordinates;
      
      potentialDuplicates = allCredits.filter(c => {
        if (!c.metadata.location.coordinates) return false;
        
        const lat = c.metadata.location.coordinates.latitude;
        const lng = c.metadata.location.coordinates.longitude;
        
        // Check if within 1km (very rough approximation)
        const distance = Math.sqrt(
          Math.pow(lat - latitude, 2) + 
          Math.pow(lng - longitude, 2)
        );
        
        return distance < 0.01; // Approximately 1km
      });
    }
    
    // Add algorithmic verification note
    const verificationsStore = context.store.get('verifications') || [];
    const verificationIndex = verificationsStore.findIndex(v => v.id === verification.id);
    
    if (verificationIndex !== -1) {
      const verificationToUpdate = verificationsStore[verificationIndex];
      
      verificationToUpdate.algorithmicCheck = {
        timestamp: Date.now(),
        potentialDuplicatesCount: potentialDuplicates.length,
        potentialDuplicates: potentialDuplicates.map(c => c.id),
        recommendation: potentialDuplicates.length > 0 ? 'review' : 'approve'
      };
      
      verificationToUpdate.history.push({
        action: 'algorithmic_check',
        timestamp: Date.now(),
        result: potentialDuplicates.length > 0 ? 'potential_duplicates_found' : 'no_issues_found'
      });
      
      verificationsStore[verificationIndex] = verificationToUpdate;
      context.store.set('verifications', verificationsStore);
    }
  }

  /**
   * Approve a verification
   * @private
   */
  async _approveVerification(data, sender, context) {
    const { verificationId, reason } = data;
    
    // Check authorization (either admin or traditional verifier)
    const governanceStore = context.store.get('governance') || {};
    const admins = governanceStore.admins || [];
    const isAdmin = admins.includes(sender.address);
    
    const verifiersStore = context.store.get('verifiers') || [];
    const isVerifier = verifiersStore.some(v => 
      v.address === sender.address && 
      v.status === 'active' && 
      v.type === 'traditional'
    );
    
    if (!isAdmin && !isVerifier) {
      throw new Error('Not authorized to approve verifications');
    }
    
    // Find verification
    const verificationsStore = context.store.get('verifications') || [];
    const verificationIndex = verificationsStore.findIndex(v => v.id === verificationId);
    
    if (verificationIndex === -1) {
      throw new Error('Verification not found');
    }
    
    const verification = verificationsStore[verificationIndex];
    
    if (verification.status !== 'pending') {
      throw new Error('Verification is not in pending status');
    }
    
    // Update verification status
    verification.status = 'approved';
    verification.approvedAt = Date.now();
    verification.approvedBy = sender.address;
    verification.approvalReason = reason;
    
    verification.history.push({
      action: 'approval',
      timestamp: Date.now(),
      actor: sender.address,
      reason
    });
    
    verificationsStore[verificationIndex] = verification;
    context.store.set('verifications', verificationsStore);
    
    // Update credit verification status
    const carbonCreditsStore = context.store.get('carbonCredits') || [];
    const creditIndex = carbonCreditsStore.findIndex(c => c.id === verification.creditId);
    
    if (creditIndex !== -1) {
      const credit = carbonCreditsStore[creditIndex];
      credit.verificationStatus = 'verified';
      credit.lastVerified = Date.now();
      credit.verifiedBy = sender.address;
      credit.verificationHistory = credit.verificationHistory || [];
      credit.verificationHistory.push({
        verificationId,
        timestamp: Date.now(),
        status: 'approved',
        verifier: sender.address
      });
      
      carbonCreditsStore[creditIndex] = credit;
      context.store.set('carbonCredits', carbonCreditsStore);
    }
    
    // Log the action
    const activityLogStore = context.store.get('activityLog') || [];
    activityLogStore.push({
      type: 'verification_approved',
      timestamp: Date.now(),
      data: {
        verificationId,
        creditId: verification.creditId,
        approvedBy: sender.address
      }
    });
    
    context.store.set('activityLog', activityLogStore);
  }

  /**
   * Reject a verification
   * @private
   */
  async _rejectVerification(data, sender, context) {
    const { verificationId, reason } = data;
    
    // Check authorization (similar to approval)
    const governanceStore = context.store.get('governance') || {};
    const admins = governanceStore.admins || [];
    const isAdmin = admins.includes(sender.address);
    
    const verifiersStore = context.store.get('verifiers') || [];
    const isVerifier = verifiersStore.some(v => 
      v.address === sender.address && 
      v.status === 'active' && 
      v.type === 'traditional'
    );
    
    if (!isAdmin && !isVerifier) {
      throw new Error('Not authorized to reject verifications');
    }
    
    // Find verification
    const verificationsStore = context.store.get('verifications') || [];
    const verificationIndex = verificationsStore.findIndex(v => v.id === verificationId);
    
    if (verificationIndex === -1) {
      throw new Error('Verification not found');
    }
    
    const verification = verificationsStore[verificationIndex];
    
    if (verification.status !== 'pending') {
      throw new Error('Verification is not in pending status');
    }
    
    // Update verification status
    verification.status = 'rejected';
    verification.rejectedAt = Date.now();
    verification.rejectedBy = sender.address;
    verification.rejectionReason = reason;
    
    verification.history.push({
      action: 'rejection',
      timestamp: Date.now(),
      actor: sender.address,
      reason
    });
    
    verificationsStore[verificationIndex] = verification;
    context.store.set('verifications', verificationsStore);
    
    // Update credit verification status
    const carbonCreditsStore = context.store.get('carbonCredits') || [];
    const creditIndex = carbonCreditsStore.findIndex(c => c.id === verification.creditId);
    
    if (creditIndex !== -1) {
      const credit = carbonCreditsStore[creditIndex];
      credit.verificationStatus = 'rejected';
      credit.verificationHistory = credit.verificationHistory || [];
      credit.verificationHistory.push({
        verificationId,
        timestamp: Date.now(),
        status: 'rejected',
        verifier: sender.address
      });
      
      carbonCreditsStore[creditIndex] = credit;
      context.store.set('carbonCredits', carbonCreditsStore);
    }
    
    // Log the action
    const activityLogStore = context.store.get('activityLog') || [];
    activityLogStore.push({
      type: 'verification_rejected',
      timestamp: Date.now(),
      data: {
        verificationId,
        creditId: verification.creditId,
        rejectedBy: sender.address,
        reason
      }
    });
    
    context.store.set('activityLog', activityLogStore);
  }

  /**
   * Submit a community vote on a verification
   * @private
   */
  async _submitCommunityVote(data, sender, context) {
    const { verificationId, vote, comment } = data;
    
    // Find verification
    const verificationsStore = context.store.get('verifications') || [];
    const verificationIndex = verificationsStore.findIndex(v => v.id === verificationId);
    
    if (verificationIndex === -1) {
      throw new Error('Verification not found');
    }
    
    const verification = verificationsStore[verificationIndex];
    
    if (verification.status !== 'pending') {
      throw new Error('Cannot vote on a verification that is not pending');
    }
    
    // Check if already voted
    if (verification.communityVotes.voters.includes(sender.address)) {
      throw new Error('You have already voted on this verification');
    }
    
    // Add vote
    verification.communityVotes[vote]++;
    verification.communityVotes.voters.push(sender.address);
    
    // Add vote record
    verification.communityVotes.records = verification.communityVotes.records || [];
    verification.communityVotes.records.push({
      voter: sender.address,
      vote,
      comment,
      timestamp: Date.now()
    });
    
    verification.history.push({
      action: 'community_vote',
      timestamp: Date.now(),
      actor: sender.address,
      vote
    });
    
    // Check if community voting threshold reached
    const communityVoteThreshold = governanceStore.communityVoteThreshold || 10;
    const totalVotes = verification.communityVotes.approve + verification.communityVotes.reject;
    
    if (totalVotes >= communityVoteThreshold) {
      // Determine outcome
      if (verification.communityVotes.approve > verification.communityVotes.reject) {
        verification.status = 'community_approved';
        verification.approvedAt = Date.now();
        verification.approvedBy = 'community';
        
        verification.history.push({
          action: 'community_approval',
          timestamp: Date.now(),
          votes: {
            approve: verification.communityVotes.approve,
            reject: verification.communityVotes.reject,
            flag: verification.communityVotes.flag
          }
        });
        
        // Update credit verification status
        const carbonCreditsStore = context.store.get('carbonCredits') || [];
        const creditIndex = carbonCreditsStore.findIndex(c => c.id === verification.creditId);
        
        if (creditIndex !== -1) {
          const credit = carbonCreditsStore[creditIndex];
          credit.verificationStatus = 'community_verified';
          credit.lastVerified = Date.now();
          credit.verifiedBy = 'community';
          credit.verificationHistory = credit.verificationHistory || [];
          credit.verificationHistory.push({
            verificationId,
            timestamp: Date.now(),
            status: 'community_approved',
            verifier: 'community'
          });
          
          carbonCreditsStore[creditIndex] = credit;
          context.store.set('carbonCredits', carbonCreditsStore);
        }
      } else if (verification.communityVotes.reject > verification.communityVotes.approve) {
        verification.status = 'community_rejected';
        verification.rejectedAt = Date.now();
        verification.rejectedBy = 'community';
        
        verification.history.push({
          action: 'community_rejection',
          timestamp: Date.now(),
          votes: {
            approve: verification.communityVotes.approve,
            reject: verification.communityVotes.reject,
            flag: verification.communityVotes.flag
          }
        });
        
        // Update credit verification status
        const carbonCreditsStore = context.store.get('carbonCredits') || [];
        const creditIndex = carbonCreditsStore.findIndex(c => c.id === verification.creditId);
        
        if (creditIndex !== -1) {
          const credit = carbonCreditsStore[creditIndex];
          credit.verificationStatus = 'community_rejected';
          credit.verificationHistory = credit.verificationHistory || [];
          credit.verificationHistory.push({
            verificationId,
            timestamp: Date.now(),
            status: 'community_rejected',
            verifier: 'community'
          });
          
          carbonCreditsStore[creditIndex] = credit;
          context.store.set('carbonCredits', carbonCreditsStore);
        }
      }
    }
    
    // Flag for traditional verifier review if enough flags
    const flagThreshold = governanceStore.flagThreshold || 5;
    if (verification.communityVotes.flag >= flagThreshold && verification.status === 'pending') {
      verification.status = 'flagged_for_review';
      verification.flaggedAt = Date.now();
      
      verification.history.push({
        action: 'flagged_for_review',
        timestamp: Date.now(),
        flags: verification.communityVotes.flag
      });
      
      // Update credit verification status
      const carbonCreditsStore = context.store.get('carbonCredits') || [];
      const creditIndex = carbonCreditsStore.findIndex(c => c.id === verification.creditId);
      
      if (creditIndex !== -1) {
        const credit = carbonCreditsStore[creditIndex];
        credit.verificationStatus = 'flagged_for_review';
        credit.verificationHistory = credit.verificationHistory || [];
        credit.verificationHistory.push({
          verificationId,
          timestamp: Date.now(),
          status: 'flagged_for_review'
        });
        
        carbonCreditsStore[creditIndex] = credit;
        context.store.set('carbonCredits', carbonCreditsStore);
      }
    }
    
    verificationsStore[verificationIndex] = verification;
    context.store.set('verifications', verificationsStore);
  }
}

module.exports = VerificationContract;