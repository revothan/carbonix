import React from 'react';

// Import the refactored component
import CreditDetails from './CreditDetails/index';

// Create a simple pass-through component to maintain backward compatibility
const CreditDetailsPage: React.FC = () => {
  return <CreditDetails />;
};

export default CreditDetailsPage;