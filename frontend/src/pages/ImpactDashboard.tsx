import React from 'react';
import ImpactDashboard from './ImpactDashboard/index';
import { UserProps } from './ImpactDashboard/types';

interface ImpactDashboardPageProps {
  user: UserProps;
}

// This component maintains backward compatibility with the old JSX component
const ImpactDashboardPage: React.FC<ImpactDashboardPageProps> = ({ user }) => {
  return <ImpactDashboard user={user} />;
};

export default ImpactDashboardPage;