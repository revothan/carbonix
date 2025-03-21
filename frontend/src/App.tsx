import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import CreditDetails from './pages/CreditDetails';
import MyPortfolio from './pages/MyPortfolio';
import CreateListing from './pages/CreateListing';
import RetireCredits from './pages/RetireCredits';
import Verification from './pages/Verification';
import Wallet from './pages/Wallet';
import Login from './pages/Login';
import Register from './pages/Register';
import CertificateView from './pages/CertificateView';
import ImpactDashboard from './pages/ImpactDashboard';

// Services
import xellarKitService from './services/XellarKitService';
import blockchainService from './services/BlockchainService';

// Types
interface User {
  id: string;
  username: string;
  email: string;
  walletAddress?: string;
  [key: string]: any;
}

function App() {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeServices = async () => {
      try {
        await Promise.all([
          xellarKitService.initialize(),
          blockchainService.initialize()
        ]);
        
        setInitialized(true);
        
        // Check if user is already logged in
        const storedUser = localStorage.getItem('carbonix_user');
        if (storedUser) {
          setAuthUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error initializing services:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeServices();
  }, []);

  const login = (user: User) => {
    setAuthUser(user);
    localStorage.setItem('carbonix_user', JSON.stringify(user));
  };

  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem('carbonix_user');
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Initializing Carbonix...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Navbar user={authUser} onLogout={logout} />
        
        <div className="app-container">
          {authUser && <Sidebar user={authUser} />}
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={authUser ? <Dashboard user={authUser} /> : <Login onLogin={login} />} />
              <Route path="/login" element={<Login onLogin={login} />} />
              <Route path="/register" element={<Register onRegister={login} />} />
              
              {/* Protected routes */}
              {authUser && (
                <>
                  <Route path="/marketplace" element={<Marketplace user={authUser} />} />
                  <Route path="/credits/:id" element={<CreditDetails user={authUser} />} />
                  <Route path="/portfolio" element={<MyPortfolio user={authUser} />} />
                  <Route path="/create-listing" element={<CreateListing user={authUser} />} />
                  <Route path="/retire" element={<RetireCredits user={authUser} />} />
                  <Route path="/verification" element={<Verification user={authUser} />} />
                  <Route path="/wallet" element={<Wallet user={authUser} />} />
                  <Route path="/impact" element={<ImpactDashboard user={authUser} />} />
                </>
              )}
              
              {/* Public routes */}
              <Route path="/certificates/:id" element={<CertificateView />} />
              
              {/* Fallback route */}
              <Route path="*" element={<Login onLogin={login} />} />
            </Routes>
          </main>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;