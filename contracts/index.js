/**
 * Carbonix Smart Contracts
 * 
 * This file exports all the contract implementations for the 
 * Carbonix carbon credit marketplace on the Lisk blockchain.
 * 
 * @module contracts
 */

const RegistryContract = require('./registry/RegistryContract');
const MarketplaceContract = require('./marketplace/MarketplaceContract');
const VerificationContract = require('./verification/VerificationContract');
const RetirementContract = require('./retirement/RetirementContract');

module.exports = {
  RegistryContract,
  MarketplaceContract,
  VerificationContract,
  RetirementContract
};