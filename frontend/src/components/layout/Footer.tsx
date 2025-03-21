import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <div className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" fill="#2e7d32" />
                <path d="M12 6L8 8V12L12 16L16 12V8L12 6Z" fill="white" />
              </svg>
            </div>
            <span className="logo-text">Carbonix</span>
          </div>
          <p className="footer-description">
            Blockchain-based carbon credit marketplace built on Lisk for Indonesia, enabling transparent verification, trading, and retirement of carbon credits.
          </p>
          <div className="social-links">
            <a href="https://twitter.com/carbonix" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://discord.gg/carbonix" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-discord"></i>
            </a>
            <a href="https://github.com/revothan/carbonix" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://t.me/carbonix" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-telegram"></i>
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/marketplace">Marketplace</Link></li>
            <li><Link to="/impact">Impact Dashboard</Link></li>
            <li><Link to="/verification">Verification</Link></li>
            <li><Link to="/wallet">Wallet</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-title">Resources</h4>
          <ul className="footer-links">
            <li><a href="https://docs.carbonix.io" target="_blank" rel="noopener noreferrer">Documentation</a></li>
            <li><a href="https://carbonix.io/faq" target="_blank" rel="noopener noreferrer">FAQ</a></li>
            <li><a href="https://carbonix.io/blog" target="_blank" rel="noopener noreferrer">Blog</a></li>
            <li><a href="https://github.com/revothan/carbonix" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-title">Contact</h4>
          <ul className="footer-links">
            <li><a href="mailto:contact@carbonix.io">contact@carbonix.io</a></li>
            <li><a href="https://carbonix.io/support" target="_blank" rel="noopener noreferrer">Support</a></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright">&copy; {currentYear} Carbonix. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;