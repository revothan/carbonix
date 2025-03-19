/**
 * Xellar Kit Integration Service
 * 
 * This service handles integration with the Xellar Kit for wallet management
 * and blockchain interactions on the Carbonix platform.
 * 
 * @module services/XellarKitService
 */

import { XellarKit } from '@xellar/kit';

class XellarKitService {
  constructor() {
    this.xellarKit = null;
    this.initialized = false;
    this.apiKey = process.env.REACT_APP_XELLAR_API_KEY;
    this.clientId = process.env.REACT_APP_XELLAR_CLIENT_ID;
  }

  /**
   * Initialize the Xellar Kit SDK
   * @returns {Promise<boolean>} Initialization success
   */
  async initialize() {
    if (this.initialized) {
      return true;
    }

    try {
      this.xellarKit = new XellarKit({
        apiKey: this.apiKey,
        clientId: this.clientId,
        network: process.env.REACT_APP_LISK_NETWORK || 'testnet',
        walletConnect: true
      });

      await this.xellarKit.init();
      this.initialized = true;
      return true;
    } catch (error) {
      console.error('Error initializing Xellar Kit:', error);
      return false;
    }
  }

  /**
   * Get Xellar Kit instance
   * @returns {Object} Xellar Kit instance
   */
  getInstance() {
    if (!this.initialized) {
      throw new Error('Xellar Kit not initialized. Call initialize() first.');
    }
    return this.xellarKit;
  }

  /**
   * Create a new wallet with social login
   * @param {string} provider - Social login provider (e.g., 'google', 'facebook')
   * @returns {Promise<Object>} New wallet details
   */
  async createWalletWithSocialLogin(provider) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const wallet = await this.xellarKit.createWalletWithSocialLogin(provider);
      return wallet;
    } catch (error) {
      console.error(`Error creating wallet with ${provider} login:`, error);
      throw error;
    }
  }

  /**
   * Create a new wallet with email
   * @param {string} email - User's email address
   * @returns {Promise<Object>} New wallet details
   */
  async createWalletWithEmail(email) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const wallet = await this.xellarKit.createWalletWithEmail(email);
      return wallet;
    } catch (error) {
      console.error('Error creating wallet with email:', error);
      throw error;
    }
  }

  /**
   * Get wallet details
   * @param {string} walletId - Wallet ID
   * @returns {Promise<Object>} Wallet details
   */
  async getWallet(walletId) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const wallet = await this.xellarKit.getWallet(walletId);
      return wallet;
    } catch (error) {
      console.error('Error getting wallet:', error);
      throw error;
    }
  }

  /**
   * Get all user wallets
   * @returns {Promise<Array>} User wallets
   */
  async getUserWallets() {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const wallets = await this.xellarKit.getUserWallets();
      return wallets;
    } catch (error) {
      console.error('Error getting user wallets:', error);
      throw error;
    }
  }

  /**
   * Sign a transaction
   * @param {Object} transaction - Transaction object
   * @param {string} walletId - Wallet ID
   * @returns {Promise<Object>} Signed transaction
   */
  async signTransaction(transaction, walletId) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const signedTransaction = await this.xellarKit.signTransaction(transaction, walletId);
      return signedTransaction;
    } catch (error) {
      console.error('Error signing transaction:', error);
      throw error;
    }
  }

  /**
   * Broadcast a signed transaction
   * @param {Object} signedTransaction - Signed transaction
   * @returns {Promise<Object>} Transaction result
   */
  async broadcastTransaction(signedTransaction) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const result = await this.xellarKit.broadcastTransaction(signedTransaction);
      return result;
    } catch (error) {
      console.error('Error broadcasting transaction:', error);
      throw error;
    }
  }

  /**
   * Sign and broadcast a transaction in one step
   * @param {Object} transaction - Transaction object
   * @param {string} walletId - Wallet ID
   * @returns {Promise<Object>} Transaction result
   */
  async signAndBroadcastTransaction(transaction, walletId) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const signedTransaction = await this.signTransaction(transaction, walletId);
      const result = await this.broadcastTransaction(signedTransaction);
      return result;
    } catch (error) {
      console.error('Error signing and broadcasting transaction:', error);
      throw error;
    }
  }

  /**
   * Get wallet balance
   * @param {string} walletId - Wallet ID
   * @returns {Promise<Object>} Balance details
   */
  async getWalletBalance(walletId) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const balance = await this.xellarKit.getWalletBalance(walletId);
      return balance;
    } catch (error) {
      console.error('Error getting wallet balance:', error);
      throw error;
    }
  }

  /**
   * Get transaction history for a wallet
   * @param {string} walletId - Wallet ID
   * @param {number} limit - Number of transactions to return
   * @param {number} offset - Pagination offset
   * @returns {Promise<Array>} Transaction history
   */
  async getTransactionHistory(walletId, limit = 10, offset = 0) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const transactions = await this.xellarKit.getTransactions(walletId, { limit, offset });
      return transactions;
    } catch (error) {
      console.error('Error getting transaction history:', error);
      throw error;
    }
  }

  /**
   * Export wallet credentials (for backup)
   * @param {string} walletId - Wallet ID
   * @param {string} password - Encryption password
   * @returns {Promise<string>} Encrypted wallet credentials
   */
  async exportWalletCredentials(walletId, password) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const credentials = await this.xellarKit.exportWalletCredentials(walletId, password);
      return credentials;
    } catch (error) {
      console.error('Error exporting wallet credentials:', error);
      throw error;
    }
  }

  /**
   * Import wallet from credentials
   * @param {string} encryptedCredentials - Encrypted wallet credentials
   * @param {string} password - Decryption password
   * @returns {Promise<Object>} Imported wallet
   */
  async importWalletFromCredentials(encryptedCredentials, password) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const wallet = await this.xellarKit.importWalletFromCredentials(encryptedCredentials, password);
      return wallet;
    } catch (error) {
      console.error('Error importing wallet from credentials:', error);
      throw error;
    }
  }
}

// Create a singleton instance
const xellarKitService = new XellarKitService();

export default xellarKitService;