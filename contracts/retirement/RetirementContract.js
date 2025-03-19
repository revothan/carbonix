/**
 * Retirement Contract
 * 
 * Manages the retirement process for carbon credits, generating
 * proof of offset certificates and ensuring credits can't be used again.
 * 
 * @module contracts/retirement
 */

const { BaseAsset } = require('@liskhq/lisk-transactions');
const { getAddressFromPublicKey } = require('@liskhq/lisk-cryptography');
const crypto = require('crypto');

/**
 * Carbon Credit Retirement Contract
 * 
 * Responsibilities:
 * - Processing credit retirement requests
 * - Generating immutable retirement certificates
 * - Managing retirement metadata
 * - Ensuring retired credits can't be traded again
 */
class RetirementContract extends BaseAsset {
  constructor() {
    super();
    this.name = 'retirement';
    this.schema = {
      $id: 'carbonix/retirement-contract/1.0.0',
      type: 'object',
      required: ['action', 'data'],
      properties: {
        action: {
          type: 'string',
          enum: ['retireCredits', 'generateCertificate', 'viewRetirement']
        },
        data: {
          type: 'object',
          properties: {
            // For retireCredits
            creditIds: {
              type: 'array',
              items: {
                type: 'string'
              }
            },
            quantities: {
              type: 'array',
              items: {
                type: 'integer',
                minimum: 1
              }
            },
            beneficiaryName: {
              type: 'string'
            },
            beneficiaryAddress: {
              type: 'string'
            },
            retirementMessage: {
              type: 'string'
            },
            retirementPurpose: {
              type: 'string',
              enum: [
                'carbon_neutral_product',
                'carbon_neutral_service',
                'carbon_neutral_company',
                'carbon_neutral_event',
                'carbon_neutral_individual',
                'offsetting_emissions',
                'corporate_social_responsibility',
                'other'
              ]
            },
            retirementDetails: {
              type: 'object',
              properties: {
                yearOfEmissions: {
                  type: 'integer'
                },
                productName: {
                  type: 'string'
                },
                companyName: {
                  type: 'string'
                },
                eventName: {
                  type: 'string'
                },
                eventDate: {
                  type: 'string'
                }
              }
            },
            // For generateCertificate
            retirementId: {
              type: 'string'
            },
            // For viewRetirement
            retirementId: {
              type: 'string'
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
      case 'retireCredits':
        // Validate retirement data
        if (!data.creditIds || !data.quantities || data.creditIds.length !== data.quantities.length) {
          return false;
        }
        
        if (!data.beneficiaryName || !data.retirementPurpose) {
          return false;
        }
        break;
      case 'generateCertificate':
      case 'viewRetirement':
        // Validate retirement ID
        if (!data.retirementId) {
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
      case 'retireCredits':
        await this._retireCredits(data, sender, context);
        break;
      case 'generateCertificate':
        await this._generateCertificate(data, sender, context);
        break;
      case 'viewRetirement':
        // This is a read-only action, handled in API layer
        break;
    }
  }

  /**
   * Retire carbon credits
   * @private
   */
  async _retireCredits(data, sender, context) {
    const { 
      creditIds, 
      quantities, 
      beneficiaryName, 
      beneficiaryAddress,
      retirementMessage,
      retirementPurpose,
      retirementDetails
    } = data;
    
    // Verify that all credits exist and are owned by the sender
    const carbonCreditsStore = context.store.get('carbonCredits') || [];
    
    for (let i = 0; i < creditIds.length; i++) {
      const creditId = creditIds[i];
      const quantity = quantities[i];
      
      const credit = carbonCreditsStore.find(c => c.id === creditId);
      
      if (!credit) {
        throw new Error(`Credit ${creditId} not found`);
      }
      
      if (credit.owner !== sender.address) {
        throw new Error(`You do not own credit ${creditId}`);
      }
      
      if (credit.status === 'retired') {
        throw new Error(`Credit ${creditId} is already retired`);
      }
      
      if ((credit.amount - (credit.retiredAmount || 0)) < quantity) {
        throw new Error(`Insufficient available balance for credit ${creditId}`);
      }
    }
    
    // Create retirement record
    const timestamp = Date.now();
    const retirementId = `ret-${timestamp}-${sender.address.substring(0, 8)}`;
    
    const totalCO2Tonnes = creditIds.reduce((total, creditId, index) => {
      const credit = carbonCreditsStore.find(c => c.id === creditId);
      return total + quantities[index];
    }, 0);
    
    const retirement = {
      id: retirementId,
      retiree: sender.address,
      beneficiaryName,
      beneficiaryAddress: beneficiaryAddress || sender.address,
      credits: creditIds.map((creditId, index) => {
        const credit = carbonCreditsStore.find(c => c.id === creditId);
        return {
          creditId,
          quantity: quantities[index],
          vintage: credit.vintage,
          standard: credit.standard,
          projectId: credit.projectId,
          projectType: credit.metadata?.projectType,
          country: credit.metadata?.location?.country
        };
      }),
      totalCO2Tonnes,
      retirementMessage,
      retirementPurpose,
      retirementDetails,
      timestamp,
      certificateId: null,
      status: 'completed',
      transactionIds: [context.transaction.id]
    };
    
    // Update credits
    for (let i = 0; i < creditIds.length; i++) {
      const creditId = creditIds[i];
      const quantity = quantities[i];
      
      const creditIndex = carbonCreditsStore.findIndex(c => c.id === creditId);
      const credit = carbonCreditsStore[creditIndex];
      
      // If retiring the full amount
      if (quantity === credit.amount) {
        credit.status = 'retired';
        credit.retiredAmount = credit.amount;
      } else {
        // If retiring partial amount
        credit.retiredAmount = (credit.retiredAmount || 0) + quantity;
      }
      
      credit.transactions = credit.transactions || [];
      credit.transactions.push({
        type: 'retirement',
        timestamp,
        data: {
          retirementId,
          quantity,
          retiree: sender.address,
          beneficiary: beneficiaryName
        }
      });
      
      carbonCreditsStore[creditIndex] = credit;
    }
    
    // Store updated credits
    context.store.set('carbonCredits', carbonCreditsStore);
    
    // Store retirement record
    const retirementsStore = context.store.get('retirements') || [];
    retirementsStore.push(retirement);
    context.store.set('retirements', retirementsStore);
    
    // Log activity
    const activityLogStore = context.store.get('activityLog') || [];
    activityLogStore.push({
      type: 'credit_retirement',
      timestamp,
      data: {
        retirementId,
        retiree: sender.address,
        beneficiary: beneficiaryName,
        totalCO2Tonnes,
        creditCount: creditIds.length
      }
    });
    
    context.store.set('activityLog', activityLogStore);
  }

  /**
   * Generate a certificate for a retirement
   * @private
   */
  async _generateCertificate(data, sender, context) {
    const { retirementId } = data;
    
    // Find the retirement record
    const retirementsStore = context.store.get('retirements') || [];
    const retirementIndex = retirementsStore.findIndex(r => r.id === retirementId);
    
    if (retirementIndex === -1) {
      throw new Error('Retirement record not found');
    }
    
    const retirement = retirementsStore[retirementIndex];
    
    // Check if sender is authorized (either the retiree or the beneficiary)
    if (retirement.retiree !== sender.address && retirement.beneficiaryAddress !== sender.address) {
      throw new Error('Not authorized to generate certificate for this retirement');
    }
    
    // Check if certificate already exists
    if (retirement.certificateId) {
      throw new Error('Certificate already generated for this retirement');
    }
    
    // Generate certificate
    const timestamp = Date.now();
    const certificateId = `cert-${timestamp}-${retirementId.substring(4, 12)}`;
    
    // Create certificate hash (would contain more data in production)
    const certificateData = JSON.stringify({
      retirementId,
      certificateId,
      retiree: retirement.retiree,
      beneficiary: retirement.beneficiaryName,
      beneficiaryAddress: retirement.beneficiaryAddress,
      credits: retirement.credits,
      totalCO2Tonnes: retirement.totalCO2Tonnes,
      purpose: retirement.retirementPurpose,
      details: retirement.retirementDetails,
      retirementDate: new Date(retirement.timestamp).toISOString(),
      certificateDate: new Date(timestamp).toISOString()
    });
    
    const certificateHash = crypto
      .createHash('sha256')
      .update(certificateData)
      .digest('hex');
    
    // Create certificate
    const certificate = {
      id: certificateId,
      retirementId,
      hash: certificateHash,
      data: JSON.parse(certificateData),
      createdAt: timestamp,
      createdBy: sender.address,
      transactionId: context.transaction.id
    };
    
    // Update retirement record
    retirement.certificateId = certificateId;
    retirement.certificateHash = certificateHash;
    retirement.certificateTimestamp = timestamp;
    
    retirementsStore[retirementIndex] = retirement;
    context.store.set('retirements', retirementsStore);
    
    // Store certificate
    const certificatesStore = context.store.get('certificates') || [];
    certificatesStore.push(certificate);
    context.store.set('certificates', certificatesStore);
    
    // Log activity
    const activityLogStore = context.store.get('activityLog') || [];
    activityLogStore.push({
      type: 'certificate_generated',
      timestamp,
      data: {
        certificateId,
        retirementId,
        retiree: retirement.retiree,
        beneficiary: retirement.beneficiaryName,
        totalCO2Tonnes: retirement.totalCO2Tonnes
      }
    });
    
    context.store.set('activityLog', activityLogStore);
  }
  
  /**
   * Generate a shareable verification URL for a certificate
   * @param {string} certificateId - ID of the certificate
   * @returns {string} Verification URL
   */
  generateVerificationUrl(certificateId) {
    // In a real implementation this would generate a URL to a verification page
    return `https://carbonix.app/verify/${certificateId}`;
  }
}

module.exports = RetirementContract;