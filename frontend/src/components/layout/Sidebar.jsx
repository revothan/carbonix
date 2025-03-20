import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ user }) => {
  const location = useLocation();

  // Define sidebar menu items
  const menuItems = [
    {
      title: 'Dashboard',
      path: '/',
      icon: <i className="fas fa-chart-line"></i>,
    },
    {
      title: 'Marketplace',
      path: '/marketplace',
      icon: <i className="fas fa-shopping-cart"></i>,
    },
    {
      title: 'My Portfolio',
      path: '/portfolio',
      icon: <i className="fas fa-leaf"></i>,
    },
    {
      title: 'Create Listing',
      path: '/create-listing',
      icon: <i className="fas fa-plus-circle"></i>,
    },
    {
      title: 'Retire Credits',
      path: '/retire',
      icon: <i className="fas fa-certificate"></i>,
    },
    {
      title: 'Verification',
      path: '/verification',
      icon: <i className="fas fa-check-circle"></i>,
    },
    {
      title: 'Impact Dashboard',
      path: '/impact',
      icon: <i className="fas fa-globe-asia"></i>,
    },
    {
      title: 'Wallet',
      path: '/wallet',
      icon: <i className="fas fa-wallet"></i>,
    },
  ];

  // Get current path to highlight active menu item
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="wallet-summary">
        <div className="wallet-balance">
          <div className="balance-label">IDRX Balance</div>
          <div className="balance-amount">
            <span className="currency-symbol">Rp</span>
            <span className="amount">{user.balance || '0.00'}</span>
          </div>
        </div>
        <div className="wallet-actions">
          <button className="action-button deposit">
            <i className="fas fa-arrow-down"></i> Deposit
          </button>
          <button className="action-button withdraw">
            <i className="fas fa-arrow-up"></i> Withdraw
          </button>
        </div>
      </div>

      <div className="menu-container">
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li key={index} className={`menu-item ${isActive(item.path) ? 'active' : ''}`}>
              <Link to={item.path} className="menu-link">
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-title">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-footer">
        <div className="carbon-impact">
          <div className="impact-label">Your Carbon Impact</div>
          <div className="impact-value">
            <span className="impact-number">{user.carbonOffset || '0'}</span>
            <span className="impact-unit">tonnes CO₂</span>
          </div>
          <div className="impact-description">
            offset through Carbonix
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;