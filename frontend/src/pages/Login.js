import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import xellarKitService from '../services/XellarKitService';
import './Login.css';

const Login = ({ onLogin }) => {
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'social'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // In a real app, this would authenticate with a backend
      // For this demo, we'll simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      
      // Create or connect to a wallet using Xellar Kit
      await xellarKitService.initialize();
      const wallet = await xellarKitService.createWalletWithEmail(email);
      
      // Mock user data that would come from backend
      const user = {
        id: 'user123',
        email: email,
        displayName: email.split('@')[0],
        walletAddress: wallet?.address || 'demo-wallet-address',
        balance: '1,000,000',
        carbonOffset: '25.4',
        createdAt: new Date().toISOString()
      };
      
      // Call the parent component's login handler
      onLogin(user);
      
      // Redirect to dashboard
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError('');

    try {
      // Initialize Xellar Kit
      await xellarKitService.initialize();
      
      // Create wallet with social login
      const wallet = await xellarKitService.createWalletWithSocialLogin(provider);
      
      // Mock user data
      const user = {
        id: `user-${provider}-123`,
        email: `user@${provider}.com`,
        displayName: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        walletAddress: wallet?.address || `demo-${provider}-wallet-address`,
        balance: '1,000,000',
        carbonOffset: '25.4',
        createdAt: new Date().toISOString()
      };
      
      // Call the parent component's login handler
      onLogin(user);
      
      // Redirect to dashboard
      navigate('/');
    } catch (error) {
      console.error(`${provider} login error:`, error);
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" fill="#2e7d32" />
            <path d="M12 6L8 8V12L12 16L16 12V8L12 6Z" fill="white" />
          </svg>
          <h1>Carbonix</h1>
        </div>
        
        <h2 className="login-title">Log in to your account</h2>
        
        <div className="login-tabs">
          <button 
            className={`login-tab ${loginMethod === 'email' ? 'active' : ''}`} 
            onClick={() => setLoginMethod('email')}
          >
            Email
          </button>
          <button 
            className={`login-tab ${loginMethod === 'social' ? 'active' : ''}`} 
            onClick={() => setLoginMethod('social')}
          >
            Social Login
          </button>
        </div>
        
        {loginMethod === 'email' ? (
          <form onSubmit={handleEmailLogin} className="login-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div className="form-group form-actions">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>
            
            <button 
              type="submit" 
              className="login-button" 
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        ) : (
          <div className="social-login">
            {error && <div className="error-message">{error}</div>}
            
            <button 
              className="social-button google"
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
            >
              <i className="fab fa-google"></i>
              Continue with Google
            </button>
            
            <button 
              className="social-button facebook"
              onClick={() => handleSocialLogin('facebook')}
              disabled={loading}
            >
              <i className="fab fa-facebook-f"></i>
              Continue with Facebook
            </button>
            
            <button 
              className="social-button twitter"
              onClick={() => handleSocialLogin('twitter')}
              disabled={loading}
            >
              <i className="fab fa-twitter"></i>
              Continue with Twitter
            </button>
          </div>
        )}
        
        <div className="login-divider">
          <span>Or</span>
        </div>
        
        <div className="login-footer">
          <p>Don't have an account?</p>
          <Link to="/register" className="register-link">
            Create Account
          </Link>
        </div>
      </div>
      
      <div className="login-info">
        <h2>Indonesia's Premier Carbon Credit Marketplace</h2>
        <p>
          Carbonix connects carbon credit generators with buyers, enabling 
          transparent, efficient, and accessible carbon trading in Indonesia.
        </p>
        <div className="login-features">
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-leaf"></i>
            </div>
            <div className="feature-text">
              <h3>Tokenized Carbon Credits</h3>
              <p>Trade verifiable carbon credits on the blockchain</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <div className="feature-text">
              <h3>Multi-Level Verification</h3>
              <p>Robust validation ensures credit legitimacy</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-coins"></i>
            </div>
            <div className="feature-text">
              <h3>IDRX-Powered Marketplace</h3>
              <p>Trade with Indonesia's digital Rupiah stablecoin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;