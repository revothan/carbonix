import React from 'react';
import MyPortfolioComponent from './MyPortfolio/index';
import { MyPortfolioProps } from './MyPortfolio/types';

/**
 * This is a wrapper component for backward compatibility with the existing JSX structure.
 * It delegates to the properly typed and structured TypeScript implementation.
 */
const MyPortfolio: React.FC<MyPortfolioProps> = (props) => {
  return <MyPortfolioComponent {...props} />;
};

export default MyPortfolio;
