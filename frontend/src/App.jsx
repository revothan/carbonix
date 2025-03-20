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

function App() {
  const [initialized, setInitialized] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const login = (user) => {
    setAuthUser(user);
    localStorage.setItem('carbonix_user', JSON.stringify(user));
  };

  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem('carbonix_user');
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-muted-foreground">Initializing Carbonix...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar user={authUser} onLogout={logout} />
        
        <div className="flex flex-1">
          {authUser && <Sidebar user={authUser} />}
          
          <main className={`flex-1 ${authUser ? 'md:ml-64' : ''}`}>
            <div className="container mx-auto p-4 md:p-6">
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
            </div>
          </main>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;