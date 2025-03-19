/**
 * Marketplace Contract
 * 
 * Facilitates the buying, selling, and trading of carbon credits
 * with integration to IDRX stablecoin for settlement.
 * 
 * @module contracts/marketplace
 */

const { BaseAsset } = require('@liskhq/lisk-transactions');
const { getAddressFromPublicKey } = require('@liskhq/lisk-cryptography');

/**
 * Carbon Credit Marketplace Contract
 * 
 * Responsibilities:
 * - Creating sell orders
 * - Processing buy orders
 * - Handling credit transfers
 * - Managing IDRX settlement
 * - Maintaining order book
 */
class MarketplaceContract extends BaseAsset {
  constructor() {
    super();
    this.name = 'marketplace';
    this.schema = {
      $id: 'carbonix/marketplace-contract/1.0.0',
      type: 'object',
      required: ['action', 'data'],
      properties: {
        action: {
          type: 'string',
          enum: ['createListing', 'cancelListing', 'fulfillOrder', 'createBid']
        },
        data: {
          type: 'object',
          properties: {
            // For createListing
            creditId: {
              type: 'string',
            },
            quantity: {
              type: 'integer',
              minimum: 1,
            },
            pricePerUnit: {
              type: 'integer',
              minimum: 1,
            },
            expiresAt: {
              type: 'integer',
            },
            // For cancelListing & fulfillOrder
            listingId: {
              type: 'string',
            },
            // For createBid
            bidAmount: {
              type: 'integer',
              minimum: 1,
            },
            // For fulfillOrder
            quantity: {
              type: 'integer',
              minimum: 1,
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
      case 'createListing':
        // Validate listing data
        if (!data.creditId || !data.quantity || !data.pricePerUnit) {
          return false;
        }
        break;
      case 'cancelListing':
        // Validate cancellation data
        if (!data.listingId) {
          return false;
        }
        break;
      case 'fulfillOrder':
        // Validate order fulfillment data
        if (!data.listingId || !data.quantity) {
          return false;
        }
        break;
      case 'createBid':
        // Validate bid data
        if (!data.creditId || !data.bidAmount) {
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
      case 'createListing':
        await this._createListing(data, sender, context);
        break;
      case 'cancelListing':
        await this._cancelListing(data, sender, context);
        break;
      case 'fulfillOrder':
        await this._fulfillOrder(data, sender, context);
        break;
      case 'createBid':
        await this._createBid(data, sender, context);
        break;
    }
  }

  /**
   * Create a new listing for a carbon credit
   * @private
   */
  async _createListing(data, sender, context) {
    const { creditId, quantity, pricePerUnit, expiresAt } = data;
    
    // Verify the sender owns the credit
    const carbonCreditsStore = context.store.get('carbonCredits') || [];
    const credit = carbonCreditsStore.find(c => c.id === creditId);
    
    if (!credit || credit.owner !== sender.address) {
      throw new Error('You do not own this carbon credit');
    }
    
    // Create listing
    const listingId = `${creditId}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newListing = {
      id: listingId,
      creditId,
      seller: sender.address,
      quantity,
      pricePerUnit,
      totalPrice: quantity * pricePerUnit,
      status: 'active',
      createdAt: Date.now(),
      expiresAt: expiresAt || Date.now() + (30 * 24 * 60 * 60 * 1000), // Default: 30 days
      transactions: [{
        type: 'creation',
        timestamp: Date.now(),
        data: { sender: sender.address }
      }]
    };
    
    // Add to listings store
    const listingsStore = context.store.get('listings') || [];
    listingsStore.push(newListing);
    context.store.set('listings', listingsStore);
    
    // Reserve the credits
    credit.reserved = (credit.reserved || 0) + quantity;
    context.store.set('carbonCredits', carbonCreditsStore);
  }

  /**
   * Cancel an existing listing
   * @private
   */
  async _cancelListing(data, sender, context) {
    const { listingId } = data;
    
    // Find the listing
    const listingsStore = context.store.get('listings') || [];
    const listingIndex = listingsStore.findIndex(l => l.id === listingId);
    const listing = listingsStore[listingIndex];
    
    if (!listing || listing.seller !== sender.address) {
      throw new Error('Listing not found or you are not the seller');
    }
    
    if (listing.status !== 'active') {
      throw new Error('Listing is not active');
    }
    
    // Update listing status
    listing.status = 'cancelled';
    listing.transactions.push({
      type: 'cancellation',
      timestamp: Date.now(),
      data: { sender: sender.address }
    });
    
    listingsStore[listingIndex] = listing;
    context.store.set('listings', listingsStore);
    
    // Release reserved credits
    const carbonCreditsStore = context.store.get('carbonCredits') || [];
    const credit = carbonCreditsStore.find(c => c.id === listing.creditId);
    
    if (credit) {
      credit.reserved -= listing.quantity;
      context.store.set('carbonCredits', carbonCreditsStore);
    }
  }

  /**
   * Fulfill an order (buy carbon credits)
   * @private
   */
  async _fulfillOrder(data, sender, context) {
    const { listingId, quantity } = data;
    
    // Find the listing
    const listingsStore = context.store.get('listings') || [];
    const listingIndex = listingsStore.findIndex(l => l.id === listingId);
    const listing = listingsStore[listingIndex];
    
    if (!listing || listing.status !== 'active') {
      throw new Error('Listing not found or not active');
    }
    
    if (listing.seller === sender.address) {
      throw new Error('You cannot buy your own listing');
    }
    
    if (quantity > listing.quantity) {
      throw new Error('Requested quantity exceeds available quantity');
    }
    
    // Calculate price
    const totalPrice = quantity * listing.pricePerUnit;
    
    // Check IDRX balance
    // Note: Integration with IDRX would go here
    // For now we'll simulate the balance check
    const idrxBalancesStore = context.store.get('idrxBalances') || {};
    const buyerBalance = idrxBalancesStore[sender.address] || 0;
    
    if (buyerBalance < totalPrice) {
      throw new Error('Insufficient IDRX balance');
    }
    
    // Process the transaction
    // 1. Transfer IDRX
    idrxBalancesStore[sender.address] = buyerBalance - totalPrice;
    idrxBalancesStore[listing.seller] = (idrxBalancesStore[listing.seller] || 0) + totalPrice;
    context.store.set('idrxBalances', idrxBalancesStore);
    
    // 2. Transfer carbon credits
    const carbonCreditsStore = context.store.get('carbonCredits') || [];
    const credit = carbonCreditsStore.find(c => c.id === listing.creditId);
    
    if (!credit) {
      throw new Error('Carbon credit not found');
    }
    
    // Create a new credit entry for the buyer if buying partial amount
    if (quantity < listing.quantity) {
      const newCreditId = `${credit.id}-${Date.now()}`;
      
      const newCredit = {
        ...credit,
        id: newCreditId,
        amount: quantity,
        owner: sender.address,
        parentId: credit.id,
        transactions: [{
          type: 'transfer',
          timestamp: Date.now(),
          data: { 
            sender: listing.seller,
            recipient: sender.address,
            listingId
          }
        }]
      };
      
      carbonCreditsStore.push(newCredit);
      
      // Update the listing quantity
      listing.quantity -= quantity;
      
      // Update the original credit's reserved amount
      credit.reserved -= quantity;
      
    } else {
      // Full transfer
      credit.owner = sender.address;
      credit.reserved = 0;
      credit.transactions.push({
        type: 'transfer',
        timestamp: Date.now(),
        data: { 
          sender: listing.seller,
          recipient: sender.address,
          listingId
        }
      });
      
      // Close the listing
      listing.status = 'completed';
      listing.transactions.push({
        type: 'completion',
        timestamp: Date.now(),
        data: { 
          sender: sender.address,
          quantity
        }
      });
    }
    
    // Update stores
    context.store.set('carbonCredits', carbonCreditsStore);
    context.store.set('listings', listingsStore);
    
    // Record the transaction
    const transactionsStore = context.store.get('transactions') || [];
    transactionsStore.push({
      id: `tx-${Date.now()}`,
      listingId,
      creditId: listing.creditId,
      seller: listing.seller,
      buyer: sender.address,
      quantity,
      pricePerUnit: listing.pricePerUnit,
      totalPrice,
      timestamp: Date.now()
    });
    
    context.store.set('transactions', transactionsStore);
  }

  /**
   * Create a bid for a carbon credit
   * @private
   */
  async _createBid(data, sender, context) {
    const { creditId, bidAmount } = data;
    
    // Check IDRX balance
    const idrxBalancesStore = context.store.get('idrxBalances') || {};
    const bidderBalance = idrxBalancesStore[sender.address] || 0;
    
    if (bidderBalance < bidAmount) {
      throw new Error('Insufficient IDRX balance');
    }
    
    // Create bid
    const bidId = `bid-${creditId}-${Date.now()}`;
    const newBid = {
      id: bidId,
      creditId,
      bidder: sender.address,
      amount: bidAmount,
      status: 'active',
      createdAt: Date.now(),
      expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days by default
    };
    
    // Add to bids store
    const bidsStore = context.store.get('bids') || [];
    bidsStore.push(newBid);
    context.store.set('bids', bidsStore);
    
    // Lock the bid amount
    idrxBalancesStore[sender.address] = bidderBalance - bidAmount;
    idrxBalancesStore[`escrow:${bidId}`] = bidAmount;
    context.store.set('idrxBalances', idrxBalancesStore);
  }
}

module.exports = MarketplaceContract;