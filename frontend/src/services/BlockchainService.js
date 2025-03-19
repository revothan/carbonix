/**
 * Blockchain Service
 * 
 * This service handles interactions with the Lisk blockchain
 * for the Carbonix carbon credit marketplace.
 * 
 * @module services/BlockchainService
 */

import { apiClient } from '@liskhq/lisk-client';
import xellarKitService from './XellarKitService';

class BlockchainService {
  constructor() {
    this.client = null;
    this.initialized = false;
    this.nodeUrl = process.env.REACT_APP_LISK_NODE_URL || 'https://testnet-service.lisk.io';
  }

  /**
   * Initialize the blockchain client
   * @returns {Promise<boolean>} Initialization success
   */
  async initialize() {
    if (this.initialized) {
      return true;
    }

    try {
      this.client = await apiClient.createWSClient(this.nodeUrl);
      this.initialized = true;
      return true;
    } catch (error) {
      console.error('Error initializing blockchain client:', error);
      return false;
    }
  }

  /**
   * Get blockchain client instance
   * @returns {Object} Blockchain client instance
   */
  getInstance() {
    if (!this.initialized) {
      throw new Error('Blockchain client not initialized. Call initialize() first.');
    }
    return this.client;
  }

  /**
   * Create a transaction for the given module and asset
   * @param {string} moduleID - Module ID
   * @param {string} assetID - Asset ID
   * @param {Object} asset - Transaction asset data
   * @param {string} senderPublicKey - Sender's public key
   * @returns {Promise<Object>} Transaction object
   */
  async createTransaction(moduleID, assetID, asset, senderPublicKey) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const tx = await this.client.transaction.create({
        moduleID,
        assetID,
        asset,
        senderPublicKey,
        fee: BigInt(1000000), // Example fee, would be calculated dynamically in production
      });
      
      return tx;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  }

  /**
   * Send a transaction to the blockchain
   * @param {Object} tx - Transaction object
   * @param {string} walletId - Wallet ID
   * @returns {Promise<Object>} Transaction result
   */
  async sendTransaction(tx, walletId) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // Sign the transaction using Xellar Kit
      const signedTx = await xellarKitService.signTransaction(tx, walletId);
      
      // Broadcast the transaction
      const result = await this.client.transaction.send(signedTx);
      
      return result;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  }

  /*
   * Registry Contract Methods
   */

  /**
   * Issue a new carbon credit
   * @param {Object} creditData - Carbon credit data
   * @param {string} walletId - Wallet ID
   * @returns {Promise<Object>} Transaction result
   */
  async issueCredit(creditData, walletId) {
    try {
      const wallet = await xellarKitService.getWallet(walletId);
      
      const tx = await this.createTransaction(
        '5', // Example module ID for registry module
        '0', // Example asset ID for issue credit asset
        creditData,
        wallet.publicKey
      );
      
      return await this.sendTransaction(tx, walletId);
    } catch (error) {
      console.error('Error issuing carbon credit:', error);
      throw error;
    }
  }

  /**
   * Get carbon credit by ID
   * @param {string} creditId - Credit ID
   * @returns {Promise<Object>} Carbon credit data
   */
  async getCreditById(creditId) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // Call a custom API endpoint on the blockchain node
      const credit = await this.client.invoke('registry:getCredit', { creditId });
      return credit;
    } catch (error) {
      console.error('Error getting carbon credit:', error);
      throw error;
    }
  }

  /**
   * Get all carbon credits
   * @param {Object} filters - Optional filters
   * @returns {Promise<Array>} Carbon credits
   */
  async getAllCredits(filters = {}) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // Call a custom API endpoint on the blockchain node
      const credits = await this.client.invoke('registry:getAllCredits', filters);
      return credits;
    } catch (error) {
      console.error('Error getting all carbon credits:', error);
      throw error;
    }
  }

  /*
   * Marketplace Contract Methods
   */

  /**
   * Create a listing for a carbon credit
   * @param {Object} listingData - Listing data
   * @param {string} walletId - Wallet ID
   * @returns {Promise<Object>} Transaction result
   */
  async createListing(listingData, walletId) {
    try {
      const wallet = await xellarKitService.getWallet(walletId);
      
      const tx = await this.createTransaction(
        '6', // Example module ID for marketplace module
        '0', // Example asset ID for create listing asset
        {
          action: 'createListing',
          data: listingData
        },
        wallet.publicKey
      );
      
      return await this.sendTransaction(tx, walletId);
    } catch (error) {
      console.error('Error creating listing:', error);
      throw error;
    }
  }

  /**
   * Get all active listings
   * @param {Object} filters - Optional filters
   * @returns {Promise<Array>} Active listings
   */
  async getActiveListings(filters = {}) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // Call a custom API endpoint on the blockchain node
      const listings = await this.client.invoke('marketplace:getActiveListings', filters);
      return listings;
    } catch (error) {
      console.error('Error getting active listings:', error);
      throw error;
    }
  }

  /**
   * Purchase carbon credits from a listing
   * @param {Object} purchaseData - Purchase data
   * @param {string} walletId - Wallet ID
   * @returns {Promise<Object>} Transaction result
   */
  async fulfillOrder(purchaseData, walletId) {
    try {
      const wallet = await xellarKitService.getWallet(walletId);
      
      const tx = await this.createTransaction(
        '6', // Example module ID for marketplace module
        '1', // Example asset ID for fulfill order asset
        {
          action: 'fulfillOrder',
          data: purchaseData
        },
        wallet.publicKey
      );
      
      return await this.sendTransaction(tx, walletId);
    } catch (error) {
      console.error('Error fulfilling order:', error);
      throw error;
    }
  }

  /*
   * Verification Contract Methods
   */

  /**
   * Submit a verification for a carbon credit
   * @param {Object} verificationData - Verification data
   * @param {string} walletId - Wallet ID
   * @returns {Promise<Object>} Transaction result
   */
  async submitVerification(verificationData, walletId) {
    try {
      const wallet = await xellarKitService.getWallet(walletId);
      
      const tx = await this.createTransaction(
        '7', // Example module ID for verification module
        '0', // Example asset ID for submit verification asset
        {
          action: 'submitVerification',
          data: verificationData
        },
        wallet.publicKey
      );
      
      return await this.sendTransaction(tx, walletId);
    } catch (error) {
      console.error('Error submitting verification:', error);
      throw error;
    }
  }

  /**
   * Get verification status for a credit
   * @param {string} creditId - Credit ID
   * @returns {Promise<Object>} Verification status
   */
  async getVerificationStatus(creditId) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // Call a custom API endpoint on the blockchain node
      const status = await this.client.invoke('verification:getVerificationStatus', { creditId });
      return status;
    } catch (error) {
      console.error('Error getting verification status:', error);
      throw error;
    }
  }

  /*
   * Retirement Contract Methods
   */

  /**
   * Retire carbon credits
   * @param {Object} retirementData - Retirement data
   * @param {string} walletId - Wallet ID
   * @returns {Promise<Object>} Transaction result
   */
  async retireCredits(retirementData, walletId) {
    try {
      const wallet = await xellarKitService.getWallet(walletId);
      
      const tx = await this.createTransaction(
        '8', // Example module ID for retirement module
        '0', // Example asset ID for retire credits asset
        {
          action: 'retireCredits',
          data: retirementData
        },
        wallet.publicKey
      );
      
      return await this.sendTransaction(tx, walletId);
    } catch (error) {
      console.error('Error retiring credits:', error);
      throw error;
    }
  }

  /**
   * Generate a retirement certificate
   * @param {string} retirementId - Retirement ID
   * @param {string} walletId - Wallet ID
   * @returns {Promise<Object>} Transaction result
   */
  async generateCertificate(retirementId, walletId) {
    try {
      const wallet = await xellarKitService.getWallet(walletId);
      
      const tx = await this.createTransaction(
        '8', // Example module ID for retirement module
        '1', // Example asset ID for generate certificate asset
        {
          action: 'generateCertificate',
          data: { retirementId }
        },
        wallet.publicKey
      );
      
      return await this.sendTransaction(tx, walletId);
    } catch (error) {
      console.error('Error generating certificate:', error);
      throw error;
    }
  }

  /**
   * Get retirement certificate
   * @param {string} certificateId - Certificate ID
   * @returns {Promise<Object>} Certificate data
   */
  async getCertificate(certificateId) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      // Call a custom API endpoint on the blockchain node
      const certificate = await this.client.invoke('retirement:getCertificate', { certificateId });
      return certificate;
    } catch (error) {
      console.error('Error getting certificate:', error);
      throw error;
    }
  }
}

// Create a singleton instance
const blockchainService = new BlockchainService();

export default blockchainService;