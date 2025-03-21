import React from 'react';
import VerificationComponent from './Verification/index';
import { VerificationProps } from './Verification/types';

/**
 * This is a wrapper component for backward compatibility with the existing JSX structure.
 * It delegates to the properly typed and structured TypeScript implementation.
 */
const Verification: React.FC<VerificationProps> = (props) => {
  return <VerificationComponent {...props} />;
};

export default Verification;
