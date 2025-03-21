import React from 'react';
import RetireCreditsComponent from './RetireCredits/index';
import { RetireCreditsProps } from './RetireCredits/types';

/**
 * This is a wrapper component for backward compatibility with the existing JSX structure.
 * It delegates to the properly typed and structured TypeScript implementation.
 */
const RetireCredits: React.FC<RetireCreditsProps> = (props) => {
  return <RetireCreditsComponent {...props} />;
};

export default RetireCredits;
