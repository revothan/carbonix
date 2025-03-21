import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

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
import xellarKitService from './services/XellarKitService.ts';
import blockchainService from './services/BlockchainService';

// Types
interface User {
  id: string;
  username: string;
  email: string;
  walletAddress?: string;
  [key: string]: any;
}

// Layout wrapper component to conditionally render navbar
const AppLayout = ({ user, onLogout, children }) => {
  const location = useLocation();
  const isDashboard = location.pathname === '/' && user;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  
  // Close sidebar on route change
  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);
  
  // Close sidebar when window is resized to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        // In desktop mode, keep sidebar visible but make sure content is properly laid out
        if (user) {
          document.body.classList.add('has-sidebar');
        }
      } else {
        document.body.classList.remove('has-sidebar');
        if (sidebarOpen) {
          document.body.classList.add('sidebar-open');
        } else {
          document.body.classList.remove('sidebar-open');
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sidebarOpen, user]);
  
  return (
    <>
      {/* Only show navbar when not on dashboard */}
      {!isDashboard && <Navbar user={user} onLogout={onLogout} />}
      
      <div className="app-container">
        {user && (
          <Sidebar 
            user={user} 
            isOpen={sidebarOpen} 
            toggleSidebar={toggleSidebar} 
            closeSidebar={closeSidebar}
          />
        )}
        
        <main 
          className={`main-content ${isDashboard ? 'dashboard-content' : ''} ${sidebarOpen ? 'sidebar-open' : ''}`}
        >
          {children}
        </main>
        
        {/* Add overlay when sidebar is open on mobile */}
        {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
      </div>
      
      <Footer />
    </>
  );
};

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
    document.body.classList.remove('has-sidebar');
    document.body.classList.remove('sidebar-open');
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
        <Routes>
          <Route path="*" element={
            <AppLayout user={authUser} onLogout={logout}>
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
            </AppLayout>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;