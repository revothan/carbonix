import React, { useEffect, useState } from 'react';

const Dashboard = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCredits: 0,
    activeListings: 0,
    offsetCredits: 0,
    recentTransactions: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real implementation, these would be actual calls to the blockchain
        // For now we'll use mock data
        setStats({
          totalCredits: 25430,
          activeListings: 143,
          offsetCredits: 1254,
          recentTransactions: [
            { id: 'tx1', type: 'purchase', amount: 5, date: new Date().toISOString(), status: 'complete' },
            { id: 'tx2', type: 'listing', amount: 10, date: new Date().toISOString(), status: 'active' },
            { id: 'tx3', type: 'retirement', amount: 3, date: new Date().toISOString(), status: 'complete' }
          ]
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="loading">Loading dashboard data...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.displayName || 'User'}</h1>
      
      <div className="dashboard-summary">
        <div className="card">
          <h3>Total Carbon Credits</h3>
          <p className="stat">{stats.totalCredits.toLocaleString()} tonnes CO₂</p>
        </div>
        
        <div className="card">
          <h3>Active Marketplace Listings</h3>
          <p className="stat">{stats.activeListings.toLocaleString()}</p>
        </div>
        
        <div className="card">
          <h3>Carbon Offsetted</h3>
          <p className="stat">{stats.offsetCredits.toLocaleString()} tonnes CO₂</p>
        </div>
      </div>
      
      <div className="dashboard-details">
        <div className="card">
          <h3>Recent Transactions</h3>
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentTransactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{transaction.type}</td>
                  <td>{transaction.amount} tonnes</td>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
