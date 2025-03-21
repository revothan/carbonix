import React from 'react';
import MarketplaceComponent from './Marketplace/index';
import { User } from './Marketplace/types';

interface MarketplacePageProps {
  user: User;
}

// This component maintains backward compatibility with the old JSX component
const Marketplace: React.FC<MarketplacePageProps> = ({ user }) => {
  return <MarketplaceComponent user={user} />;
};

export default Marketplace;