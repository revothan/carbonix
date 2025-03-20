import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, truncateAddress } from "@/lib/utils";

const Navbar = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" fill="hsl(var(--primary))" />
              <path d="M12 6L8 8V12L12 16L16 12V8L12 6Z" fill="white" />
            </svg>
          </div>
          <span className="font-bold text-xl">Carbonix</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md hover:bg-accent"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {user ? (
            <>
              <Link to="/marketplace" className="text-sm font-medium transition-colors hover:text-primary px-3 py-2">
                Marketplace
              </Link>
              <Link to="/portfolio" className="text-sm font-medium transition-colors hover:text-primary px-3 py-2">
                My Portfolio
              </Link>
              <Link to="/impact" className="text-sm font-medium transition-colors hover:text-primary px-3 py-2">
                Impact Dashboard
              </Link>
              <Link to="/wallet" className="text-sm font-medium transition-colors hover:text-primary px-3 py-2">
                Wallet
              </Link>

              {/* User dropdown */}
              <div className="relative ml-2">
                <button 
                  className="flex items-center space-x-1 rounded-full py-1.5 px-2 hover:bg-accent"
                  onClick={toggleDropdown}
                >
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-card border p-1">
                    <div className="px-4 py-2 border-b">
                      <p className="font-medium">{user.displayName || 'User'}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {user.walletAddress ? truncateAddress(user.walletAddress) : 'No wallet'}
                      </p>
                    </div>
                    <div className="p-1">
                      <Link 
                        to="/profile" 
                        className="flex w-full items-center rounded-sm px-3 py-2 text-sm hover:bg-accent"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link 
                        to="/settings" 
                        className="flex w-full items-center rounded-sm px-3 py-2 text-sm hover:bg-accent"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Settings
                      </Link>
                    </div>
                    <div className="p-1 border-t">
                      <button 
                        className="flex w-full items-center rounded-sm px-3 py-2 text-sm text-destructive hover:bg-accent"
                        onClick={handleLogout}
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium transition-colors hover:text-primary px-3 py-2">
                Log In
              </Link>
              <Link to="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile navigation */}
        <div className={cn(
          "fixed inset-x-0 top-16 z-50 bg-background border-b md:hidden transition-all duration-200 ease-in-out",
          isMenuOpen ? "block" : "hidden"
        )}>
          <div className="container p-4 space-y-3">
            {user ? (
              <>
                <Link to="/marketplace" className="flex w-full py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                  Marketplace
                </Link>
                <Link to="/portfolio" className="flex w-full py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                  My Portfolio
                </Link>
                <Link to="/impact" className="flex w-full py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                  Impact Dashboard
                </Link>
                <Link to="/wallet" className="flex w-full py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                  Wallet
                </Link>
                <div className="border-t pt-3 mt-3">
                  <div className="flex items-center mb-3">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.displayName || 'User'}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.walletAddress ? truncateAddress(user.walletAddress) : 'No wallet'}
                      </p>
                    </div>
                  </div>
                  <Link to="/profile" className="flex w-full py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                    Profile
                  </Link>
                  <Link to="/settings" className="flex w-full py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                    Settings
                  </Link>
                  <button 
                    className="flex w-full py-2 text-sm font-medium text-destructive mt-3"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link to="/login" className="flex w-full py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                  Log In
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;