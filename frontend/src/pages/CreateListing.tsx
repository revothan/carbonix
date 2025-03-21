import React from 'react';
import CreateListingComponent from './CreateListing/index';
import { CreateListingProps } from './CreateListing/types';

/**
 * This is a wrapper component for backward compatibility with the existing JSX structure.
 * It delegates to the properly typed and structured TypeScript implementation.
 */
const CreateListing: React.FC<CreateListingProps> = ({ user }) => {
  return <CreateListingComponent user={user} />;
};

export default CreateListing;
