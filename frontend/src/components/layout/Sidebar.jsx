import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, ShoppingCart, Leaf, PlusCircle, Award, CheckCircle, Globe, Wallet, ArrowDown, ArrowUp } from 'lucide-react';

import { cn, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Sidebar = ({ user }) => {
  const location = useLocation();

  // Define sidebar menu items with Lucide icons
  const menuItems = [
    {
      title: 'Dashboard',
      path: '/',
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      title: 'Marketplace',
      path: '/marketplace',
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: 'My Portfolio',
      path: '/portfolio',
      icon: <Leaf className="h-5 w-5" />,
    },
    {
      title: 'Create Listing',
      path: '/create-listing',
      icon: <PlusCircle className="h-5 w-5" />,
    },
    {
      title: 'Retire Credits',
      path: '/retire',
      icon: <Award className="h-5 w-5" />,
    },
    {
      title: 'Verification',
      path: '/verification',
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      title: 'Impact Dashboard',
      path: '/impact',
      icon: <Globe className="h-5 w-5" />,
    },
    {
      title: 'Wallet',
      path: '/wallet',
      icon: <Wallet className="h-5 w-5" />,
    },
  ];

  // Get current path to highlight active menu item
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="hidden w-64 flex-col md:flex fixed inset-y-0 z-30 pt-16">
      <div className="flex h-full flex-col border-r bg-background">
        {/* Wallet summary section */}
        <div className="p-4 border-b">
          <div className="mb-3">
            <p className="text-xs text-muted-foreground">IDRX Balance</p>
            <p className="text-2xl font-semibold">
              {formatCurrency(parseFloat(user.balance) || 0, 'IDR')}
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="secondary" 
              size="sm" 
              className="flex-1"
            >
              <ArrowDown className="h-4 w-4 mr-1" /> Deposit
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
            >
              <ArrowUp className="h-4 w-4 mr-1" /> Withdraw
            </Button>
          </div>
        </div>

        {/* Menu container */}
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  isActive(item.path) && "bg-accent text-accent-foreground"
                )}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Carbon impact section */}
        <div className="p-4 border-t">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Your Carbon Impact</p>
            <div className="flex items-center justify-center mb-1">
              <p className="text-2xl font-bold text-primary mr-1">{user.carbonOffset || '0'}</p>
              <p className="text-sm text-muted-foreground">tonnes CO₂</p>
            </div>
            <p className="text-xs text-muted-foreground">offset through Carbonix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;