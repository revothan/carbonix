import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

interface User {
  displayName?: string;
  walletAddress?: string;
  [key: string]: any;
}

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const profileRef = useRef<HTMLLIElement>(null);
  const navigate = useNavigate();

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = (): void => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = (): void => {
    onLogout();
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    navigate('/login');
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" fill="#2e7d32" />
              <path d="M12 6L8 8V12L12 16L16 12V8L12 6Z" fill="white" />
            </svg>
          </div>
          <span className="logo-text">Carbonix</span>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>

        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          {user ? (
            <>
              <li className="nav-item">
                <Link to="/marketplace" className="nav-links" onClick={() => setIsMenuOpen(false)}>
                  Marketplace
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/portfolio" className="nav-links" onClick={() => setIsMenuOpen(false)}>
                  My Portfolio
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/impact" className="nav-links" onClick={() => setIsMenuOpen(false)}>
                  Impact
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/wallet" className="nav-links" onClick={() => setIsMenuOpen(false)}>
                  Wallet
                </Link>
              </li>
              <li 
                className={`nav-item user-profile ${isProfileOpen ? 'active' : ''}`} 
                onClick={toggleProfile}
                ref={profileRef}
              >
                <div className="user-avatar">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className={`dropdown-content ${isProfileOpen ? 'show' : ''}`}>
                  <div className="user-info">
                    <span className="user-name">{user.displayName || 'User'}</span>
                    <span className="user-address">
                      {user.walletAddress ? `${user.walletAddress.substring(0, 8)}...` : 'No wallet'}
                    </span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/profile" className="dropdown-item" onClick={() => { setIsMenuOpen(false); setIsProfileOpen(false); }}>
                    Profile
                  </Link>
                  <Link to="/settings" className="dropdown-item" onClick={() => { setIsMenuOpen(false); setIsProfileOpen(false); }}>
                    Settings
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout-button" onClick={handleLogout}>
                    Log Out
                  </button>
                </div>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links" onClick={() => setIsMenuOpen(false)}>
                  Log In
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-links signup-button" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;