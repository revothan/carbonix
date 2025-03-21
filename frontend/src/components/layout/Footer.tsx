import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4 className="footer-title">Carbonix</h4>
          <p className="footer-description">
            Blockchain-based carbon credit marketplace built on Lisk for Indonesia, enabling transparent verification, trading, and retirement of carbon credits.
          </p>
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
          <h4 className="footer-title">Connect</h4>
          <ul className="footer-links">
            <li><a href="https://twitter.com/carbonix" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://discord.gg/carbonix" target="_blank" rel="noopener noreferrer">Discord</a></li>
            <li><a href="https://t.me/carbonix" target="_blank" rel="noopener noreferrer">Telegram</a></li>
            <li><a href="mailto:contact@carbonix.io">Email</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Carbonix. All rights reserved.</p>
        <div className="footer-legal">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;