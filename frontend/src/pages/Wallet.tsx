import React from 'react';
import WalletComponent from './Wallet/index';
import { WalletProps } from './Wallet/types';

/**
 * This is a wrapper component for backward compatibility with the existing JSX structure.
 * It delegates to the properly typed and structured TypeScript implementation.
 */
const Wallet: React.FC<WalletProps> = (props) => {
  return <WalletComponent {...props} />;
};

export default Wallet;
