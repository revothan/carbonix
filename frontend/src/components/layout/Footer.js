import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
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
            A blockchain-based carbon credit marketplace for Indonesia, built on Lisk.
          </p>
          <div className="social-links">
            <a href="https://twitter.com/carbonix" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com/company/carbonix" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/revothan/carbonix" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/marketplace">Marketplace</Link></li>
            <li><Link to="/portfolio">My Portfolio</Link></li>
            <li><Link to="/impact">Impact Dashboard</Link></li>
            <li><Link to="/verification">Verification</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Support</h3>
          <ul className="footer-links">
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/documentation">Documentation</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Legal</h3>
          <ul className="footer-links">
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/compliance">Compliance</Link></li>
            <li><Link to="/security">Security</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <p className="copyright">
            &copy; {currentYear} Carbonix. All rights reserved.
          </p>
          <div className="footer-partners">
            <span className="partner-label">Built with</span>
            <div className="partner-logos">
              <span className="partner-logo">Lisk</span>
              <span className="partner-logo">IDRX</span>
              <span className="partner-logo">Xellar Kit</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;